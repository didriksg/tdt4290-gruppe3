import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AwesomeComponent from "./loadingScreen/LoadingScreen";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <AwesomeComponent/>
            } else if (auth.isAuthenticated) {
                return <Component {...props} />;
            } else {
                return <Redirect to="/login" />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);