import React from "react";
import "./loginscreen.css";
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Redirect as Router } from 'react-router-dom';

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
        if(this.props.isAuthenticated) {
            console.log("Halla");
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
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
                    {/*TODO: Lag denne finere.*/}
                    <h1>Enhet for Ergoterapitjeneste</h1>
                    {this.state.msg ? <h2>{this.state.msg}</h2> : null}
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
                        <form>
                            <button type="submit" onClick={this.onLoginButtonClick}>Login</button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {login},
)(LoginScreen);