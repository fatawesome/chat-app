import React, { Component } from 'react';
import * as userAction from '../../../actions/users';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workspace } = this.props;
    return (
      <nav className="navbar navbar-fixed-top navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">{workspace?`${workspace.displayName}`:null}    [Chat App]</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={() => { this.props.logOutUser() }}><span className="glyphicon air-icon-remove"></span>log Out</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href={window.location.origin}><span className="glyphicon air-icon-settings"></span>Choose Other WorkSpace</a></li>
          </ul>
        </div>
      </nav>
    );

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
)(Header);