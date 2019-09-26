import React from "react";
import "./loginscreen.css";


class LoginScreen extends React.Component{


    render(){
        return(
            <div className="logincontainer">
                
                <div className="loginelements">
                    
                    <div className="logo">
                        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Trondheim_komm.svg" width="70" height="80"/>
                    </div>

                    <h1>Enhet for Ergoterapitjeneste</h1>
                    
                    <div className="inputfelter">
                        <form>
                            <input className="usernamebox" type="text" size="42" placeholder="Brukernavn"></input>
                            <input className="usernamebox" type="password" size="42" placeholder="Passord"></input>

                        </form>
                    </div>

                    <div className="loginbutton">
                        <form>
                        <button type="submit">Login</button>
                        </form>
                    </div>

                </div>
            </div>
        )
    }

}

export default LoginScreen;