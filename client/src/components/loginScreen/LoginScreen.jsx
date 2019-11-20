import React from "react";
import "./loginscreen.css";
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import {Button} from '@material-ui/core';


export class LoginScreen extends React.Component {
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
        e.preventDefault();
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

    render() {
        if (this.props.isAuthenticated === true && this.props.token !== null) {
            return <Redirect to="/"/>;
        }
        return (

            <div className="logincontainer">

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
                        <form>
                            <input
                                className="usernamebox"
                                type="text"
                                size="42"
                                id="email"
                                name="email"
                                placeholder="Brukernavn"
                                onChange={this.onChange}
                            >

                            </input>

                            <input
                                className="usernamebox"
                                type="password"
                                size="42"
                                id="password"
                                name="password"
                                placeholder="Passord"
                                onChange={this.onChange}
                            >

                            </input>

                        </form>

                    </div>

                    <div className="loginbutton">
                        <Button variant="contained"
                                color="primary"
                                onClick={(e) => this.onLoginButtonClick(e)}>Login
                        </Button>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {login},
)(LoginScreen);