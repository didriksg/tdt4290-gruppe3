import React, {Component} from 'react';
import {connect} from "react-redux";
import "./WeekNavigator.css";
import {numberToMonth} from "../overviewBoard/OverviewBoard";

class WeekNavigator extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="navigator">
                <button className="navButton" onClick={() => this.props.decrementCallback()}>{"<"}</button>
                <div className="nav">
                    {(this.props.isChildrenCase ? numberToMonth(this.props.monthCounter) : `Uke ${this.props.weekCounter}`) + `, ${this.props.year}`}
                </div>
                <button className="navButton" onClick={() => this.props.incrementCallback()}>{">"}</button>
            </div>
        );
    }
}

export default WeekNavigator;