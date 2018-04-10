import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory, withRouter } from 'react-router';
import * as workspaceAction from '../../actions/workspace';

import WorkSpaceList from './listworkspace';
import CreateWorkSpace from './createworkspace';

class WorkSpace extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    if (this.props.workspace) {
      browserHistory.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workspace) {
      browserHistory.push('/login');
    }
  }

  render() {
    const { email, pass, error, isStore } = this.state;
    return (
      <div className="container">

        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#list-workspace">Workspace List</a></li>
          <li><a data-toggle="tab" href="#create-workspace">Create Workspace</a></li>
        </ul>

        <div className="tab-content">
          <div id="list-workspace" className="tab-pane fade in active">
            <WorkSpaceList selectWorkSpace={this.props.selectWorkSpace} />
          </div>
          <div id="create-workspace" className="tab-pane fade">
            <CreateWorkSpace createWorkSpace={this.props.createWorkSpace} />
          </div>
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(workspaceAction, dispatch);
}

function mapStateToProps(state) {
  return {
    workspace: state.workspace.workspace,
    error: state.workspace.error
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkSpace);