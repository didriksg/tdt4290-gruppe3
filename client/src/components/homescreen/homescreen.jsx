import React from 'react';
import UserInformation from "./UserInformation";
import Header from "./Header"
import ButtonsRouting from "./ButtonsRouting";
import "./homescreen.css"

class Homescreen extends React.Component {

render(){
  return (
    <div >
      <body className="container">
      <Header />
      <UserInformation />
      <ButtonsRouting />
      </body>
    </div>
  )}
}
export default Homescreen;

