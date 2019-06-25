import React       from 'react';
import { connect } from 'react-redux';
import { Helmet }  from 'react-helmet';

import { fetchUsers } from '../actions';

class UsersListPage extends React.Component {
  render() {
    return (
      <div>
        { this.renderHead() }
        Here's a big list of users:
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    );
  }

  renderHead() {
    return (
      <Helmet>
        <title>{ `${this.props.users.length} users loaded` }</title>
        <meta property="og:title" content={ `${this.props.users.length} users loaded` } />
      </Helmet>
    );
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>
    });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

const loadData = ({ dispatch }) => {
  return dispatch(fetchUsers());
};

UsersListPage = connect(
  mapStateToProps,
  { fetchUsers }
)(UsersListPage);

export default {
  loadData,
  component: UsersListPage
};