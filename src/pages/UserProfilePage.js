import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import UserProfile from "../components/user-profile";
import MainFooter from "../components/footer";
import { getLoginUser } from "../actions/userActions";

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.dispatch(getLoginUser(this.props.history));
    }
  }

  render() {
    return (
      <div id="body" className="hold-transition skin-green sidebar-mini">
        <div className="wrapper">
          <Header history={this.props.history} />
          <SideBar />
          <UserProfile
            dispatch={this.props.dispatch}
            history={this.props.history}
            match={this.props.match}
          />
          <MainFooter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
  isFetching: state.shop.isFetching
});

export default connect(mapStateToProps)(UserProfilePage);
