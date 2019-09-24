import React from "react";
import ReactDOM from "react-dom";


class HelloWorld extends React.Component {
    render() {
        return <div>

            <div className="container">
                <h1>Hello World{this.props.name}</h1>
            </div>
        </div>
    }
}

let App = document.getElementById("app");

ReactDOM.render(<HelloWorld/>, App);