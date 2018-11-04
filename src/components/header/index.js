import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "./Logo";
import Navigation from "./Navigation";

class Header extends Component {
  render() {
    return (
      // <!-- Main Header -->
      <header className="main-header">
        {/* Logo */}
        <Logo />

        {/* Header Navbar */}
        <Navigation user={this.props.user} dispatch={this.props.dispatch} history={this.props.history} />
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Header);
