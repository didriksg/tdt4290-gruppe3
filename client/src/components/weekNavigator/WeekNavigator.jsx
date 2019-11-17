import React, {Component} from 'react';
import "./WeekNavigator.css";
import {numberToMonth} from "../overviewBoard/OverviewBoard";
import {Button} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class WeekNavigator extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="navigator">
                <Button className="navButton" onClick={() => this.props.decrementCallback()}>
                    <ArrowBackIosIcon/>
                </Button>
                <div className="nav">
                    {(this.props.isChildrenCase ? numberToMonth(this.props.monthCounter) : `Uke ${this.props.weekCounter}`) + `, ${this.props.year}`}
                </div>
                <Button className="navButton" onClick={() => this.props.incrementCallback()}>
                    <ArrowForwardIosIcon/>
                </Button>
            </div>
        );
    }
}

export default WeekNavigator;