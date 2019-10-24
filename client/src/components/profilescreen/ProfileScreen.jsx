import React from "react";
import Header from "./Header";
import Userinformation from "./Userinformation";
import ButtonsRouting from "./ButtonsRouting";
    

class ProfileScreen extends React.Component{

    render(){    
        return (
            <div>
            <body className="container">
                <Header/>
                <Userinformation/>
                <ButtonsRouting/>
            </body>
            
            </div>
          );
        }
    }
    export default ProfileScreen;