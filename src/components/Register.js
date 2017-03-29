import React, { Component } from 'react'
import { auth} from '../helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
    constructor(props) {
      super(props);    
      this.state = {
        username: "" ,
        email: "",
        password :"",
        registerError: null
      }
      this.updateUserNameState = this.updateUserNameState.bind(this);
      this.updateEmailState = this.updateEmailState.bind(this);
      this.updatePasswordState = this.updatePasswordState.bind(this);
   }

  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.state.email, this.state.password)
      .catch(e => this.setState(setErrorMsg(e)))
  }

   updateUserNameState(e) {
      this.setState({username: e.target.value});
   }

    updateEmailState(e) {
      this.setState({email: e.target.value});
   }

    updatePasswordState(e) {
      this.setState({password: e.target.value});
   }

  render () {
    // getPosts()
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
        <span>{this.props.comment}</span>

        <div className="form-group">
            <label>Username</label>
            <input type= "text" className="form-control" value={this.state.username} 
               onChange={this.updateUserNameState} 
                id="username" ref="username" placeholder="Username"/>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="form-control" value={this.state.email} 
            onChange={this.updateEmailState} ref="email" placeholder="Email"/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={this.state.password} ref="password"
            onChange={this.updatePasswordState} className="form-control pwdId" placeholder="Password" />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary signupbtn">Register</button>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  username: React.PropTypes.string.isRequired ,
  email: React.PropTypes.string.isRequired,
  password :React.PropTypes.string.isRequired     
};

Register.defaultProps = {
  username: "" ,
  email: "",
  password :"" 
}     