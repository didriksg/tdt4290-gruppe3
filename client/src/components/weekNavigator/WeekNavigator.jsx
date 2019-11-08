import React, {Component} from 'react';
import {connect} from "react-redux";
import "./WeekNavigator.css";

class WeekNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {monthCounter: new Date().getMonth(), weekCounter: this.getWeek(new Date())}
    }

    handleCounterIncrement = () => {
        if(this.props.isChildrenCase) {
            this.state.monthCounter === 11 ?
                this.setState({monthCounter: 0})
                :
                this.setState({monthCounter: this.state.monthCounter + 1});
        }
        else {
            this.state.weekCounter === 52 ?
                this.setState({weekCounter: 1})
                :
                this.setState({weekCounter: this.state.weekCounter + 1});

        }
    }

    handleCounterDecrement = () => {
        if(this.props.isChildrenCase) {
            this.state.monthCounter === 0 ?
                this.setState({monthCounter: 11})
                :
                this.setState({monthCounter: this.state.monthCounter - 1});
        }
        else {
            this.state.weekCounter === 1 ?
                this.setState({weekCounter: 52})
                :
                this.setState({weekCounter: this.state.weekCounter - 1})
        }
    }

    numberToMonth = (month) => {
        const monthArray = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
        return monthArray[month];
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
            <div className="navigator">
                <button className="navButton" onClick={() => this.handleCounterDecrement()}>{"<"}</button>
                <div className="nav">
                    {(this.props.isChildrenCase ?
                         "" + this.numberToMonth(this.state.monthCounter) 
                         : 
                         "Uke " + this.state.weekCounter)}
                </div>
                <button className="navButton" onClick={() => this.handleCounterIncrement()}>{">"}</button>
            </div>

        );
    }

}

const mapStateToProps = state => ({
    error: state.error,
    cases: state.caseState.cases,
    isLoading: state.caseState.isLoading,
});


export default connect(
    mapStateToProps
)(WeekNavigator);