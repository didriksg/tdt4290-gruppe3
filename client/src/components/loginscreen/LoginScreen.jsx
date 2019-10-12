import React from "react";
import "./loginscreen.css";
import {connect} from 'react-redux';
import {login} from '../../actions/authActions'

class LoginScreen extends React.Component{
    state = {
        email: '',
        password: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func. isRequired,
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

    render(){
        return(
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
                                placeholder="Brukernavn"
                            >

                            </input>

                            <input
                                className="usernamebox"
                                type="password"
                                size="42"
                                placeholder="Passord">

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
    {register},
)(LoginScreen);