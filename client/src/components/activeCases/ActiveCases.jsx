import React, {Component} from 'react';
import DistrictFilterButton from "./DistrictFilterButton";
import OverviewBoard from "../overviewBoard/OverviewBoard";
import Header from "../header/Header";
import WeekNavigator from "../weekNavigator/WeekNavigator";
import "./ActiveCases.css";

class ActiveCases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district: '',
            weekCounter: this.getWeek(new Date()),
            monthCounter: new Date().getMonth(),
            year: new Date().getFullYear(),
        }
    };

    callbackFunction = (district) => {
        this.setState({district: district})
    };

    handleCounterIncrement = () => {
        let maxDate = new Date();

        // This date is used as it is always in the last week of the year.
        maxDate.setDate(28);
        maxDate.setMonth(11);
        maxDate.setFullYear(this.state.year);

        const maxWeek = this.getWeek(maxDate);
        if (this.props.isChildrenCase) {
            if (this.state.monthCounter === 11) {
                this.setState({monthCounter: 0});
                this.setState({year: ++this.state.year});
            } else {
                this.setState({monthCounter: this.state.monthCounter + 1});
            }
        } else {
            if (this.state.weekCounter === maxWeek) {
                this.setState({weekCounter: 1});
                this.setState({year: ++this.state.year});
            } else {
                this.setState({weekCounter: this.state.weekCounter + 1});
            }
        }
    };

    handleCounterDecrement = () => {
        let maxDate = new Date();
        maxDate.setDate(28);
        maxDate.setMonth(11);
        maxDate.setFullYear(this.state.year - 1);

        const maxWeek = this.getWeek(maxDate);

        if (this.props.isChildrenCase) {
            if (this.state.monthCounter === 0) {
                this.setState({monthCounter: 11});
                this.setState({year: --this.state.year});
            } else {
                this.setState({monthCounter: this.state.monthCounter - 1});
            }
        } else {
            if (this.state.weekCounter === 1) {
                this.setState({weekCounter: maxWeek});
                this.setState({year: --this.state.year});
            } else {
                this.setState({weekCounter: this.state.weekCounter - 1})
            }
        }
    };

    getWeek = (dateString) => {
        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        const week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    };

    render() {
        return (
            <div className="activeCases">
                <Header/>

                <div className="navigators">
                    <div className="empty"/>

                    <div className="weekPicker">
                        <WeekNavigator
                            isChildrenCase={this.props.isChildrenCase}
                            weekCounter={this.state.weekCounter}
                            monthCounter={this.state.monthCounter}
                            year={this.state.year}
                            incrementCallback={this.handleCounterIncrement}
                            decrementCallback={this.handleCounterDecrement}/>
                    </div>
                    <div className="districtPicker">
                        <DistrictFilterButton parentCallback={this.callbackFunction}/>
                    </div>
                </div>
                <OverviewBoard
                    weekCounter={this.state.weekCounter}
                    monthCounter={this.state.monthCounter}
                    year={this.state.year}
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