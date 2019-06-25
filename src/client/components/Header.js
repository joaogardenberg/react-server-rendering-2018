import React       from 'react';
import { Link }    from 'react-router-dom';
import { connect } from 'react-redux';

let Header = ({ auth }) => {
  const adminsButton = auth
    ? <li><Link to="/admins">Admins</Link></li>
    : null;

  const authButton = auth
    ? <a href="/api/logout">Logout</a>
    : <a href="/api/auth/google">Login</a>;

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">React SSR</Link>
        <ul className="right">
          <li><Link to="/users">Users</Link></li>
          { adminsButton }
          <li>{ authButton }</li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

Header = connect(
  mapStateToProps
)(Header);

export default Header;