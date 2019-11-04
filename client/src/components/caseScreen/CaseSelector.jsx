import React from "react";
import "./casescreen.css";
import RadioButtons from "./RadioButtons";
import BarnVoksenSelect from "./BarnVoksenSelect";
import DatePicker from "./DatePicker";
import BydelSelect from "./BydelSelect";
import KategoriSelect from "./KategoriSelect";
import HenvendtSelect from "./HenvendtSelect";
import {Button} from '@material-ui/core';
import WeekPicker from "../WeekPicker";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import MomentUtils from "@date-io/moment"

import {addCase} from "../../actions/caseActions";
import moment from "moment";
import "moment/locale/nb";
import {connect} from "react-redux";
moment.locale("nb");

class CaseSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            priority: '',
            isChildrenCase: '',
            referral: '',
            registeredDate: new Date(),
            startDate: new Date(),
            category: '',
            district: '',

            disabled: false,
        }
    }

    handleEventChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleDateChange = (name, date) => {
        this.setState({[name]: date});
    };

    isReadyToSend = () => {
        return (this.state.id !== '')
            && this.state.priority !== ''
            && this.state.isChildrenCase !== ''
            && this.state.referral !== ''
            && this.state.registeredDate !== ''
            && this.state.startDate !== ''
            && this.state.category !== ''
            && this.state.district !== '';
    };


    handleSendCase = () => {
        if (this.isReadyToSend()) {
            const caseObj = {
                id: this.state.id,
                priority: this.state.priority,
                isChildrenCase: this.state.isChildrenCase,
                referral: this.state.referral,
                registeredDate: this.state.registeredDate,
                startDate: this.state.startDate,
                category: this.state.category,
                district: this.state.district,
            };

            this.props.addCase(caseObj);
            this.resetFields();
        }
    };

    resetFields = () => {
        this.setState({
            id: '',
            priority: '',
            isChildrenCase: '',
            referral: '',
            registeredDate: new Date(),
            startDate: new Date(),
            category: '',
            district: '',
        });
    };


    render() {
        return (
            <div className="casecontainer">

                <div className="caseelements">

                    <h1>Ny sak</h1>

                    <div className="elementsingrid">


                        <div className="gericanr">IDnr:</div>
                        <div className="gericainput">
                            <input
                                className="inputboxer"
                                type="number"
                                name='id'
                                value={this.state.id}
                                onChange={this.handleEventChange}
                            >
                            </input>
                        </div>


                        <div className="prio"> Prioritet:</div>
                        <div className="priograd">
                            <RadioButtons handleFunction={this.handleEventChange} value={this.state.priority}
                                          name={'priority'}/>
                        </div>


                        <div className="henvendtfra"> Henvendelse fra:</div>
                        <div className="sted">
                            <HenvendtSelect handleFunction={this.handleEventChange} value={this.state.referral}
                                            name={'referral'}/>
                        </div>


                        <div className="aldersgruppe"> Aldersgruppe:</div>
                        <div className="barnvoksen">
                            <BarnVoksenSelect handleFunction={this.handleEventChange} value={this.state.isChildrenCase}
                                              name={'isChildrenCase'}/>
                        </div>


                        <div className="registreringsdato">Registreringsdato:</div>
                        <div className="RegDate">
                            <DatePicker handleFunction={this.handleDateChange} value={this.state.registeredDate}
                                        name={'registeredDate'}/>
                            {/*<MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>*/}
                            {/*    <WeekPicker/>*/}
                            {/*</MuiPickersUtilsProvider>*/}
                        </div>

                        <div className="oppstartsdato">Oppstartsdato:</div>
                        <div className="StartDate">
                            <DatePicker handleFunction={this.handleDateChange} value={this.state.startDate}
                                        name={'startDate'}/>
                        </div>


                        <div className="bydel">Bydel:</div>
                        <div className="bydelbox">
                            <BydelSelect handleFunction={this.handleEventChange} value={this.state.district}
                                         name={'district'}/>
                        </div>


                        <div className="kategori"> Kategori:</div>
                        <div className="kategorifelt">
                            <KategoriSelect handleFunction={this.handleEventChange} value={this.state.category}
                                            name={'category'}/>
                        </div>


                    <Button variant="contained" onClick={this.resetFields} color="secondary">Tøm felter</Button>
                        <div/>
                        <Button variant="contained"
                                onClick={this.handleSendCase}
                                color="primary"
                                disabled={!this.isReadyToSend()}
                        >
                            Legg til henvendelse
                        </Button>

                    </div>

                </div>


            </div>
        )
    }

}

export default connect(
    null,
    {addCase},
)(CaseSelector);