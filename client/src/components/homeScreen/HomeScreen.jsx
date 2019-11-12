import React from 'react';
import UserInformation from "./UserInformation";
import Header from "./Header"
import ButtonsRouting from "./ButtonsRouting";

class HomeScreen extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <UserInformation/>
                <ButtonsRouting/>
            </div>
        )
    }
}

export default HomeScreen;

