import React, {Component} from 'react';
import DistrictFilterButton from "./DistrictFilterButton";
import OverviewBoard from "../overviewBoard/OverviewBoard";
import Header from "../header/Header";
import WeekNavigator from "../weekNavigator/WeekNavigator";

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
                <WeekNavigator isChildrenCase={this.props.isChildrenCase}/>
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