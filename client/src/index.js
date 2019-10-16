import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HomeScreen from "./components/homescreen/homescreen";
import Arkiv from "./components/arkiv/arkiv";
import MonthlyReport from "./components/monthlyReport/monthlyReport";
import CaseScreen from "./components/casescreen/CaseScreen";
import OverviewBoard from "./components/table/OverviewBoard"
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/hjemmeside" component={HomeScreen} />
            <Route path="/arkiv" component={Arkiv} />
            <Route path="/rapport" component={MonthlyReport} />
            <Route path="/ny-sak" component={CaseScreen} />
            <Route path="/alle-saker" component={OverviewBoard} />
        </div>
    </Router>
)

ReactDOM.render(
    routing, 
    document.getElementById("app"),
);