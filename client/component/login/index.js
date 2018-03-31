import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory, withRouter } from 'react-router';
import * as userAction from '../../actions/users';
import { reactLocalStorage } from 'reactjs-localstorage';

// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'});
// reactLocalStorage.getObject('var');

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      error: null,
      isStore: false
    }
  }

  componentWillMount() {

    let oldState = reactLocalStorage.getObject('chatState');
    oldState.error = null;
    this.setState(oldState);
    const { currentUser, error } = this.props;

    const userInfo = reactLocalStorage.getObject('state');
    if (!error && currentUser) browserHistory.push('/chat');
    if (error)
      this.setState({ error: error });
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, error } = nextProps;
    if (!error && currentUser) browserHistory.push('/chat');
    if (error)
      this.setState({ error: error });
  }

  loginHandler() {

    event.preventDefault();
    const { email, pass, isStore } = this.state;

    if (!validateEmail(email)) {
      this.setState({ error: "Invalid Email format!" });
      return;
    }

    if (!pass) {
      this.setState({ error: "Invalid Password!" });
      return;
    }

    if (isStore) {
      reactLocalStorage.setObject('chatState', this.state);
    } else {
      reactLocalStorage.clear();
    }

    this.props.login(email, pass);
  }

  signUpHandler() {
    browserHistory.push('/signup');
  }

  _onChangeMailHander(e) {
    this.setState({
      email: e.target.value
    });
  }

  _onChangePassHander(e) {
    this.setState({
      pass: e.target.value
    });
  }

  storeUserInfoIntoLocalStorage(e) {
    this.setState({ isStore: e.target.checked })
  }

  render() {
    const { email, pass, error, isStore } = this.state;
    return (
      <div className="container main">
        <div className="col-md-offset-4 col-md-4 login-form">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Login</h3>
            </div>
            <div className="panel-body">
              {error ? (
                <div className="alert alert-danger">
                  <strong>Error!</strong> {error}
                </div>
              ) : null}
              <div className="form-group field">
                <span className="glyphicon air-icon-user"></span>
                <input type="email" name="email" placeholder="Your email" className="form-control"
                  onChange={this._onChangeMailHander.bind(this)} value={email || ''} />
              </div>
              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="pass" placeholder="Your password" className="form-control"
                  onChange={this._onChangePassHander.bind(this)} value={pass || ''} />
              </div>
              <div className="form-group field">
                <input type="checkbox" className="form-control remember-checkbox"
                  checked={isStore} value={isStore} onChange={this.storeUserInfoIntoLocalStorage.bind(this)}
                />
                <label className="remember-checkbox-label">Remember Username and Password</label>
              </div>
              <div className="row button-area">
                <div className="col-md-offset-1 col-md-5">
                  <a className="btn btn-success" onClick={this.loginHandler.bind(this)}> Login</a>
                </div>
                <div className="col-md-5">
                  <a className="btn btn-primary" onClick={this.signUpHandler.bind(this)}> Create Account</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(userAction, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser,
    error: state.users.error
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);