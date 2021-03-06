import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserList extends Component {
  componentWillMount() {
    this.props.actions.fetchUsers();
  }

  renderUser(user, idx) {
    return (
      <div key={idx} className="card card-block">
        <h4 className="card-title">{user.name}</h4>
        <p className="card-text">{user.company.name}</p>
        <button type="button" className="btn btn-primary btn-sm" href={user.website}>Website</button>
      </div>
    );
  }

  render() {
    return (
      <div className="user-list">
        {this.props.users.map((user, idx) => this.renderUser(user, idx))}
      </div>
    );
  }
}

UserList.propTypes = {
    users: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return { users: state.users };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);