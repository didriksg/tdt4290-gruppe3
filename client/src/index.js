import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import HomeScreen from "./components/homescreen/homescreen";
import Arkiv from "./components/arkiv/arkiv";
import MonthlyReport from "./components/monthlyReport/monthlyReport";
import CaseScreen from "./components/casescreen/CaseScreen";
import OverviewBoard from "./components/table/OverviewBoard";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Root from "./Root";
import { createStore } from 'redux';
import reducers from "./reducers";

const store = createStore(reducers);

ReactDOM.render(
    <Root store={store} />, 
    document.getElementById("app"),
);