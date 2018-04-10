import React, { Component } from 'react';

function formValidation(field, value1, value2) {
  switch (field) {
    case 'displayName':
      var displayName = value1 !== '' && value1;
      return displayName ? false : 'Display Name must not be empty';
    case 'fullName':
      var fullName = value1 !== '' && value1;
      return fullName ? false : 'Full Name must not be empty';
    case 'adminEmail':
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value1) ? false : "Invalid email format!";
    case 'pwd':
      if (!value1) return 'Password must not be empty'
      var passwordValid = value1.length >= 8;
      return passwordValid ? false : ' Password is too short!';
    case 'conPwd':
      var passwordConfirmationValid = value1 === value2;
      return passwordConfirmationValid ? false : 'Password mismatch!';
    default:
      return false;

  }
}
export default class CreateWorkSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value, error: null });
  }

  _onSubmit() {
    const { displayName, fullName, adminEmail, pwd, conPwd } = this.state;
    const workspaceInfo = { fullName, displayName, adminEmail, pwd, conPwd };
    const keys = Object.keys(workspaceInfo);
    for (var i = 0; i < keys.length; i++) {
      let error = formValidation(keys[i], workspaceInfo[keys[i]], workspaceInfo.pwd);
      if (error) {
        this.setState({ error });
        return;
      }
    }

    if (this.props.createWorkSpace) this.props.createWorkSpace(workspaceInfo);
    else this.setState({ error: "Have some errors!"})
  }

  render() {
    const { displayName, fullName, adminEmail, pwd, conPwd, error } = this.state;
    return (
      <div className="col-md-12" style={{ border: '1px #ddd solid', borderTop: '0px' }}>
        <div style={{ marginTop: '30px' }}>
          {error ? (
            <div className="alert alert-danger">
              <strong>Error!</strong> {error}
            </div>
          ) : null}
          <div className="form-group left-label">
            <label >Full Name:</label>
            <input type="text" className="form-control" name="fullName"
              onChange={this._onChangeHandler.bind(this)} value={fullName || ''} />
          </div>
          <div className="form-group left-label">
            <label>Display Name:</label>
            <input type="text" className="form-control" name="displayName"
              onChange={this._onChangeHandler.bind(this)} value={displayName || ''} />
          </div>
          <div className="form-group left-label">
            <label>Admin User Email:</label>
            <input type="email" className="form-control" name="adminEmail"
              onChange={this._onChangeHandler.bind(this)} value={adminEmail || ''} />
          </div>
          <div className="form-group left-label">
            <label>Password:</label>
            <input type="password" className="form-control" name="pwd"
              onChange={this._onChangeHandler.bind(this)} value={pwd || ''} />
          </div>
          <div className="form-group left-label">
            <label>Confirm Password:</label>
            <input type="password" className="form-control" name="conPwd"
              onChange={this._onChangeHandler.bind(this)} value={conPwd || ''} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <a onClick={this._onSubmit.bind(this)} className="btn btn-success workspace-btn">Create Workspace -></a>
          </div>
        </div>
      </div>
    );
  }
}