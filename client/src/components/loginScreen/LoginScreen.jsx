import React from "react";
import "./loginscreen.css";
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import {Button} from '@material-ui/core';
import LoadingScreen from "../loadingScreen/LoadingScreen";


class LoginScreen extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
    };
    state = {
        email: '',
        password: '',
    };

    onLoginButtonClick = e => {
        // e.preventDefault();
        const {email, password} = this.state;

        const user = {
            email,
            password,
        };

        // Attempt to login.
        this.props.login(user);
    };

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error) {
            // Check for login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({msg: null});
            }
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            this.onLoginButtonClick()
        }
    };

    render() {
        if (this.props.isAuthenticated === true && this.props.token !== null) {
            return <Redirect to="/"/>;
        }
        return (

            <div className="logincontainer">
                {this.props.isLoading ? <LoadingScreen/> :
                    <div className="loginelements">

                        <div className="logo">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Trondheim_komm.svg"
                                width="70" height="80"
                                alt="Trondheim kommune logo"
                            />
                        </div>
                        <h1>Enhet for Ergoterapitjeneste</h1>
                        <div className="inputfelter">
                            <input
                                className="usernamebox"
                                type="text"
                                id="email"
                                name="email"
                                value={this.state.email}
                                placeholder="Brukernavn"
                                onChange={this.onChange}
                                onKeyDown={this.handleEnter}
                            >

                            </input>

                            <input
                                className="usernamebox"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Passord"
                                onChange={this.onChange}
                                onKeyDown={this.handleEnter}
                            >

                            </input>
                        </div>

                        <div className="loginbutton">
                            <Button variant="contained"
                                    color="primary"
                                    onClick={(e) => this.onLoginButtonClick(e)}>Login
                            </Button>
                        </div>

                    </div>
                }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {login},
)(LoginScreen);