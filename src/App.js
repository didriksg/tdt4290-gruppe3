import React, {Component} from 'react';

class App extends Component{

    render(){
        return(
            <div>
                <div className="container">
                    <h1>Hello World {this.props.name}</h1>
                </div>
            </div>
        )
    }

}

export default App;