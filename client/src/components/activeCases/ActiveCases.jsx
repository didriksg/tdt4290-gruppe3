import React, {Component} from 'react';
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
    };

    render() {
        return (
            <div>
                <Header/>
                <OverviewBoard
                    caseState={this.props.caseState}
                    tableTitle={this.props.tableTitle}
                    isChildrenCase={this.props.isChildrenCase}
                />
            </div>
        );
    }
}

export default ActiveCases;