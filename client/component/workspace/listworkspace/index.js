import React, { Component } from 'react';
import axios from 'axios';
export default class WorkSpaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      msg: ''
    }
    this.getWorkSpaceList();
  }
  getWorkSpaceList() {
    axios.post(`${window.location.origin}/getworkspacelist`)
      .then((response) => {
        this.setState({ workspaces: response.data.workspaces });
      })
      .catch((error) => {
      });
  }

  _onClickListItemHandler(key) {
    const { workspaces } = this.state;
    if (this.props.selectWorkSpace) this.props.selectWorkSpace(workspaces[key]);
  }

  getWorkSpaceTemplete(workspace, key) {
    return (
      <li className="list-group-item workspace-list-item"
        key={key}
        onClick={this._onClickListItemHandler.bind(this, key)}>
        <div style={{ width: '50%', display: 'inline-block', textAlign: 'center' }} >{workspace.fullName}</div>
        <div style={{ width: '50%', display: 'inline-block', textAlign: 'left' }}>
          {`${window.location.origin}/${workspace.displayName}`}
        </div>
      </li>
    )
  }

  render() {
    const { workspaces } = this.state;
    return (
      <div className="col-md-12" style={{ border: '1px #ddd solid', borderTop: '0px' }}>
        <ul className="list-group" style={{ marginTop: '30px' }}>
          {
            workspaces.map((workspace, key) => this.getWorkSpaceTemplete(workspace, key))
          }
        </ul>
      </div>
    );
  }
}