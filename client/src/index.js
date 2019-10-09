import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HomeScreen from "./components/homescreen/homescreen";
import OverviewBord from "./components/table/OverviewBoard";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/hjemmeside" component={HomeScreen} />
            <Route path="/saker" component={OverviewBord} />
        </div>
    </Router>
)

ReactDOM.render(
    routing, 
    document.getElementById("app"),
);