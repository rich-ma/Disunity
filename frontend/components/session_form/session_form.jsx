import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const welcome = this.props.formType === 'login' ? (
      <div className="session-form-title">
        <h2>Welcome back!</h2>
        <p>We're so excited to see you again!</p>
      </div>
    ) : (
      <div className="session-form-title">
        <h2>Create an account</h2>
      </div>
    ); //end welcome
    
    const usernameField = this.props.formType === 'login' ? null : (
      <label>USERNAME
        <input type="text" value={this.state.username}
          onChange={this.update('username')}
          className="session-input"/>
      </label>
    ); //end username

    return (
      <div className="session-main">
        <i className="fab fa-discord" alt="disunity logo">Dis/Unity</i>
        <div className="session-form-container">
          <form onSubmit={this.handleSubmit} className="session-form-box">
            {welcome}

            {this.renderErrors()}
              <label>EMAIL
                <input type="text" value={this.state.email}
                  onChange={this.update('email')}
                  className="session-input" />
              </label>
  
              {usernameField}
              
              <label>PASSWORD
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="session-input"
                />
              </label>

              <label>
              <input className="session-submit" type="submit" value={this.props.formType === 'login' ? 'login' : 'continue'} />
              </label>
          </form>
          {(this.props.formType === 'login' ? "Need an account? " : null)}{this.props.navLink}
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);