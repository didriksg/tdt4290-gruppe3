import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './App'
import HomeScreen from "./components/homescreen/homescreen";
import Arkiv from "./components/arkiv/arkiv";
import MonthlyReport from "./components/monthlyReport/monthlyReport";
import CaseScreen from "./components/casescreen/CaseScreen";
import OverviewBoard from "./components/table/OverviewBoard";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/hjemmeside" component={HomeScreen} />
        <Route path="/arkiv" component={Arkiv} />
        <Route path="/rapport" component={MonthlyReport} />
        <Route path="/ny-sak" component={CaseScreen} />
        <Route path="/alle-saker" component={OverviewBoard} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}


export default Root;