import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import AddNewShop from "../components/shop-add";
import MainFooter from "../components/footer";
import { getLoginUser } from "../actions/userActions";

class RegisterShop extends Component {
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
          <AddNewShop history={this.props.history} />
          <MainFooter />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
  isFetching: state.user.isFetching
});
export default connect(mapStateToProps)(RegisterShop);
