import React       from 'react';
import { connect } from 'react-redux';

import { fetchAdmins } from '../actions';
import requireAuth     from '../components/hocs/requireAuth';

class AdminsListPage extends React.Component {
  render() {
    return (
      <div>
        Here's a protected list of admins:
        <ul>
          { this.renderAdmins() }
        </ul>
      </div>
    );
  }

  renderAdmins() {
    return this.props.admins.map((admin) => {
      return <li key={admin.id}>{admin.name}</li>
    });
  }

  componentDidMount() {
    this.props.fetchAdmins();
  }
}

const mapStateToProps = ({ admins }) => {
  return { admins };
};

const loadData = ({ dispatch }) => {
  return dispatch(fetchAdmins());
};

AdminsListPage = requireAuth(AdminsListPage);

AdminsListPage = connect(
  mapStateToProps,
  { fetchAdmins }
)(AdminsListPage);

export default {
  loadData,
  component: AdminsListPage
};