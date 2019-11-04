import React, {Component} from 'react';

import DistrictFilterButton from "./DistrictFilterButton";
import {Link} from 'react-router-dom';

import {AppBar, 
    Toolbar,
    Grid,
    Button,
    Typography, 
    Card   
  } from '@material-ui/core';
import LogoutButton from "../LogoutButton/LogoutButton";
import OverviewBoard from "../overviewBoard/OverviewBoard";
import Header from "../header/Header";


const style = {
    persona: {marginTop: 10, marginBottom: 10},
    personaDescription: {marginBottom: 10},
    buttons: {marginTop: 10, marginBottom: 10},
    datatable: {marginTop: 10, marginBottom: 10},
    mainCard: {marginTop: 5, marginBottom: 5}
};

class ActiveCases extends Component {
    constructor(props) {
        super(props);
        this.state = {district: ""}
    };

    callbackFunction = (district) => {
        this.setState({district: district})
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="filterButton">
                    <DistrictFilterButton parentCallback={this.callbackFunction}/>
                </div>
                <OverviewBoard
                    caseState={this.props.caseState}
                    tableTitle={this.props.tableTitle}
                    isChildrenCase={this.props.isChildrenCase}
                    districtState={this.state.district}
                />
            </div>
        );
    }
}

export default ActiveCases;