import React, { Component } from 'react';
import moment from 'moment';

export default class Room extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  calDuration(creatAt) {
    var now = moment(new Date().toISOString()); //todays date
    var end = moment(moment.unix(creatAt).format()); // another date
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();

    if (Math.round(days) == 0) {
      return "Today";
    } else if (Math.round(days) == 1) {
      return "Yesterday";
    } else {
      return moment.unix(creatAt).format('dddd, MMMM DD');
    }
  }

  render() {
    const { messages } = this.props;
    let date, isDisplayDate = false;
    return (
      <div className="col-xs-8 col-sm-10 col-sm-push-2 main-chat-room">
        {messages.map(((msg, key) => {
          if (date === moment.unix(msg.creatAt).format('dddd, MMMM DD, YYYY')) {
            isDisplayDate = false;
          } else {
            date = moment.unix(msg.creatAt).format('dddd, MMMM DD, YYYY');
            isDisplayDate = true;
          }
          return (
            <div className="row" key={key}>
              {isDisplayDate ? (<div className="col-md-12"><hr /><span>{this.calDuration(msg.creatAt)}</span><hr /></div>) : null}
              <div className="col-md-11" className="left-message">
                <p>
                  <strong>{msg.userName}</strong><br />
                  {msg.message.map((m, k) => {
                    return (
                      <span style={{ display: "block" }} key={k}>{m}</span>
                    )
                  })}
                </p>
              </div>
            </div>
          )
        }))}
        <div ref={el => { this.el = el; }} />
      </div>
    );
  }
}