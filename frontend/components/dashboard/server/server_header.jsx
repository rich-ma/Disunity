import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ServerHeader extends Component {
  constructor(props){
    super(props);
    this.state = props.loading ? {} : {
      name: props.currentServer.name,
      photoFile: null,
      photoUrl: props.currentServer.photoUrl,
      toggle: false,
      id: props.currentServer.id
    }
    this.toggleServerInfo = this.toggleServerInfo.bind(this);
    this.ServerInfo = this.ServerInfo.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading) return state;
    return props.currentServer.id === state.id ? { 
      name: state.name, 
      photoFile: null, 
      photoUrl: state.photoUrl, 
      toggle: state.toggle,
      id: state.id,
    } : { 
      name: props.currentServer.name, 
      photoFile: null, 
      photoUrl: props.currentServer.photoUrl, 
      toggle: state === null ? false : state.toggle,
      id: props.currentServer.id
    };
  }

  updateState(e) {
    e.preventDefault();
    this.setState({ name: e.currentTarget.value });
  }

  toggleServerInfo(){
    const bool = this.state.toggle ? false : true;
    this.setState({ toggle: bool });
    console.log(this.state.toggle);
  }

  handleFile(e) {
    e.preventDefault()
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ photoUrl: reader.result, photoFile: file });
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ PhotoUrl: "", PhotoFile: null });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('server[name]', this.state.name);
    formData.append('id', this.props.currentServer.id);
    if (this.state.photoFile) {
      formData.append('server[photo]', this.state.photoFile);
    }
    this.props.updateServer(formData)
    .then(() => this.props.fetchServer(this.props.currentServer.id))
    .then(() => this.toggleServerInfo())
  }

  handleRemove(e){
    e.preventDefault();
    const that = this;
    if (this.props.currentServer.adminId === this.props.currentUser.id) {
      this.props.updateLoading(true);
      this.props.deleteServer(that.props.currentServer.id)
      .then(()=> { that.props.history.push(`/`)})
      .then(() => that.props.updateLoading(false));
    } else {
      this.props.updateLoading(true);
      this.props.deleteServerMembership(this.props.serverMembership)
      .then(() => {that.props.history.push(`/`)})
      .then(() => that.props.updateLoading(false));
    }
  }

  ServerInfo(){
    const { currentUser, currentServer, errors } = this.props;

    let admin = <div>
        <div onClick={e => this.toggleServerInfo(e)} className="close-server-dropdown" />
        <div className="server-dropdown">
          <h1>Server Info</h1>
          <div className="edit-server-errors">
            <ul>
              {errors.server.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <ul>
              {errors.membership.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <form action="" onSubmit={e => this.handleSubmit(e)}>
            <input type="text" autoFocus="true" className="dropdown-input" onChange={this.updateState} value={this.state.name} />
            <div className="server-dropdown-photo">
              <label className="server-photo-input-label" htmlFor="server-photo-input">
                <div>
                  <img src={this.state.photoUrl} alt={`${this.state.name}'s icon`} />
                  <input type="file" id="server-photo-input" onChange={e => this.handleFile(e)} accept="image/*" />
                </div>
              </label>
            </div>
            <div className="dropdown-buttons">
              <button className="edit-submit" onClick={e => this.handleSubmit(e)}>
                Save
              </button>
              <button className="delete-submit" onClick={e => this.handleRemove(e)}>
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>;

    let member = (
      <div>
        <div onClick={(e) => this.toggleServerInfo(e)} className='close-server-dropdown'></div>
        <div className='server-dropdown'>
          <h1>Server Info</h1>
          <h2>{currentServer.name}</h2>
        
          <div className='server-dropdown-photo'>
            <img src={currentServer.photoUrl} 
            alt={`${currentServer.name}'s icon`} />
          </div>
          <button className='delete-submit leave-server-submit' onClick={this.handleRemove}>Leave Server</button>
        </div>
      </div>
    )
    return currentServer.adminId === currentUser.id ? admin : member;
  }

  render() {
    if (this.props.loading) return null;
    const { currentUser, currentServer, openModal, deleteServer} = this.props;
    return (
      <div className='server-info'>
        <h1>{currentServer.name}</h1>
        <div className="server-edit">
          <i onClick={() => this.toggleServerInfo()} className={this.state.toggle ? "fa fa-times" : "fa fa-chevron-down"} aria-hidden="true"></i>
          {this.state.toggle ? this.ServerInfo() : null}
        </div>
      </div>
    )
  }
}

export default withRouter(ServerHeader);