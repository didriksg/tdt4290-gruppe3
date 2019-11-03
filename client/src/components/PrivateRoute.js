import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoadingScreen from "./loadingScreen/LoadingScreen";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <LoadingScreen/>
            } else if (auth.isAuthenticated === true && auth.token !== null) {
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