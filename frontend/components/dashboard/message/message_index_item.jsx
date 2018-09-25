import React from 'react';

class MessageIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.state = props.message;
    this.state.messageToggle = false;
    this.state.editToggle = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.messageEllipses = this.messageEllipses.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.messageDropdown = this.messageDropdown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ editToggle: false, messageToggle: false });
    this.props.chats.update(this.state);
  }

  handleRemove(e){
    e.preventDefault();
    this.setState({ editToggle: false, messageToggle: false });
    this.props.chats.delete(this.state);
  }

  messageEllipses(){
    return(
      <div className="edit-message-dropdown">
        <button onClick={this.editMessage}>Edit</button>
        <button onClick={this.handleRemove}>Delete</button>
      </div>
    )
  }

  handleCancel(){
    this.setState({ editToggle: false, messageToggle: false, content: this.props.message.content });
  }

  handleUpdate(e){
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  editMessage(){
    return (
        <form className="edit-message-form" action="" onSubmit={e => this.handleSubmit(e)}>
          <input className="edit-message-input" type="text" onChange={e => this.handleUpdate(e)} value={this.state.content} />
          <span>
            click&nbsp;<p className="edit-message-link" onClick={this.handleCancel}>here to cancel
            </p> <i className="fas fa-circle" /> enter to&nbsp;<p className="edit-message-link" onClick={e => this.handleSubmit(e)}>save</p>
          </span>
        </form>
    )
  }

  toggleMessage(){
    this.setState({ messageToggle: !this.state.messageToggle});
  }

  toggleEdit(){
    this.setState({ editToggle: !this.state.editToggle, messageToggle: false });
  }

  messageDropdown(){
    return(
    <div className='message-dropdown-container'> 
        <div className="close-message-dropdown" onClick={this.toggleMessage}></div>
        <div className="message-dropdown">
          <p onClick={(e) => this.toggleEdit(e)}>Edit</p>
          <p onClick={(e) => this.handleRemove(e)}>Delete</p>
        </div>
    </div>
    )
  }

  render(){
    const isAuthor = this.props.author.id === this.props.currentUserId ? true : false;
    const { author, message } = this.props
    const date = new Date();
    const today = `${date.getDate()} ${date.getFullYear()}`
    const displayTime = today === `${message.day} ${message.year}` ? `Today at ${message.time}` : `${message.month} ${message.day} at ${message.time}`

    return <div className="message-item">
        <img className="message-user-icon" src={`${author.photoUrl}`} alt="" />
        <div className="message-info">
          <div className="message-user-info">
            <p className="message-author">{author.username}</p>
            <p className="message-time">{displayTime}</p>
          </div>
          <div className="message-content-container">
            {this.state.editToggle ? this.editMessage() : <p className="message-content">
              {message.content}
            </p>}
            <div>
              {isAuthor ? <i onClick={this.toggleMessage} className="fas fa-ellipsis-v" aria-hidden="true" /> : <span/>}
              <div className='message-dropdown-relative'>
                {this.state.messageToggle ? this.messageDropdown() : null }
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default MessageIndexItem;


