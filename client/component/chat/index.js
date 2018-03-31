import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import ReactNotifications from 'react-browser-notifications';
import Platform from 'react-platform-js'
import { logOutUser } from '../../actions/users';

import Header from './header';
import SideBar from './sidebar';
import Room from './room';
import Footer from './footer';
import io from "socket.io-client";

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMsg: {},
      tabFocused: true
    };

    this.socket = io(`${window.location.origin}`);

    this.socket.on('RECEIVE_MESSAGE', (data) => {
      this.addMessage(data);
    });
    this.socket.emit('GET_ALL_MESSAGES');
    this.socket.on('RECEIVE_ALL_MESSAGE', (messages) => {
      this.recevieAllMessage(messages);
    });

    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);

    window.addEventListener('focus', (e) => {
      if (this.refs.chatRef)
        document.title = "Chat App";
    });

    window.addEventListener('blur', (e) => {
      if (this.refs.chatRef)
        this.setState({ tabFocused: false });
    })
  }

  showNotifications() {
    if (this.n.supported() && !this.state.tabFocused) this.n.show();
  }

  handleClick(event) {
    this.n.close(event.target.tag);
  }

  recevieAllMessage = data => {
    if (this.refs.chatRef)
      this.setState({ messages: data });
  }

  addMessage = data => {
    if (this.refs.chatRef) {
      this.setState({ messages: [...this.state.messages, data], newMsg: data }, this.showNotifications);
      if (!this.state.tabFocused) document.title = "* Chat App";
    }
  }

  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser) {
      browserHistory.push('/login');
    }
  }

  render() {
    const { messages, newMsg } = this.state;
    return (
      <div className="main" ref="chatRef">
        <Header />
        <div className="container-fluid">
          <Room messages={messages} />
          <SideBar />
          <Footer currentUser={this.props.currentUser} />
        </div>
        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title={newMsg.userName} // Required
          body={newMsg.message}
          icon="icon.png"
          tag="abcdef"
          timeout="2000"
          onClick={event => this.handleClick(event)}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logOutUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);


