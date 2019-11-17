import React from "react";
import "./casescreen.css";
import RadioButtons from "./RadioButtons";
import BarnVoksenSelect from "./BarnVoksenSelect";
import DatePicker from "./DatePicker";
import BydelSelect from "./BydelSelect";
import KategoriSelect from "./KategoriSelect";
import HenvendtSelect from "./HenvendtSelect";
import {Button} from '@material-ui/core';

import {addCase, getWaitingTime} from "../../actions/caseActions";
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
            startDate: null,
            category: '',
            district: '',
            suggestedWaitTime: null,
            disabled: false,
        }
    }

    handleEventChange = (e) => {
        const {target} = e;

        this.setState({[target.name]: target.value}, () => {
            if (target.name === 'priority'
                || target.name === 'district'
                || target.name === 'isChildrenCase') {
                this.suggestStartupDate();
            }
        })
    };

    handleDateChange = (name, date) => {
        this.setState({[name]: date}, () => {
            if (name === 'registeredDate') {
                this.suggestStartupDate();
            }
        });
    };

    suggestStartupDate = () => {
        if (this.state.priority !== ''
            && this.state.isChildrenCase !== ''
            && this.state.registeredDate !== null
            && this.state.district !== ''
        ) {

            this.props.getWaitingTime(this.state.priority, this.state.district, this.state.isChildrenCase, this.state.registeredDate)
                .then(() => {
                    let starting = new Date(this.state.registeredDate);
                    starting.setDate(starting.getDate() + this.props.waitingTime.waitingTime);
                    this.setState({startDate: starting})
                });
        }
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

            this.props.addCase(caseObj)
                .then(() => {
                    this.resetFields();
                });
        }
    };


    resetFields = () => {
        this.setState({
            id: '',
            priority: '',
            isChildrenCase: '',
            referral: '',
            registeredDate: new Date(),
            startDate: null,
            category: '',
            district: '',
            suggestedWaitTime: null
        });
    };

    handleNumber = (e) => {
        if (this.validateNumber(e.key)) {
            e.preventDefault();
        }
    };

    validateNumber = (number) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        return (number === '' || re.test(number) === false)
    };

    handlePaste = (e) => {
        if (this.validateNumber(e.clipboardData.getData('Text'))) {
            e.preventDefault();
        }
    };


    render() {
        return (
            <div className="casecontainer">

                <div className="caseelements">

                    <h1>Ny henvendelse</h1>

                    <div className="elementsingrid">


                        <div className="gericanr">IDnr:</div>
                        <div className="gericainput">
                            <input
                                className="inputboxer"
                                name='id'
                                value={this.state.id}
                                onChange={this.handleEventChange}
                                onKeyPress={this.handleNumber}
                                onPaste={this.handlePaste}
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
                            <HenvendtSelect handleFunction={this.handleEventChange}
                                            value={this.state.referral}
                                            isChildrenCase={this.state.isChildrenCase}
                                            name={'referral'}/>
                        </div>


                        <div className="aldersgruppe"> Aldersgruppe:</div>
                        <div className="barnvoksen">
                            <BarnVoksenSelect handleFunction={this.handleEventChange} value={this.state.isChildrenCase}
                                              name={'isChildrenCase'}/>
                        </div>

                        <div className="bydel">Bydel:</div>
                        <div className="bydelbox">
                            <BydelSelect handleFunction={this.handleEventChange} value={this.state.district}
                                         name={'district'}/>
                        </div>

                        <div className="registreringsdato">Registreringsdato:</div>
                        <div className="RegDate">
                            <DatePicker handleFunction={this.handleDateChange}
                                        value={this.state.registeredDate}
                                        name={'registeredDate'}/>
                            {/*<MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>*/}
                            {/*    <WeekPicker/>*/}
                            {/*</MuiPickersUtilsProvider>*/}
                        </div>

                        <div className="oppstartsdato">Oppstartsdato:</div>
                        <div className="StartDate">
                            <DatePicker handleFunction={this.handleDateChange}
                                        value={this.state.startDate}
                                        minDate={this.state.registeredDate}
                                        name={'startDate'}/>
                        </div>


                        <div className="kategori"> Kategori:</div>
                        <div className="kategorifelt">
                            <KategoriSelect handleFunction={this.handleEventChange}
                                            value={this.state.category}
                                            isChildrenCase={this.state.isChildrenCase}
                                            name={'category'}/>
                        </div>


                        <Button variant="contained" onClick={this.resetFields} color="secondary">Tøm felter</Button>
                        <div/>
                        <Button variant="contained"
                                color="primary"
                                onClick={this.handleSendCase}
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

const mapStateToProps = state => ({
    waitingTime: state.caseState.waitingTime,
});

export default connect(
    mapStateToProps,
    {addCase, getWaitingTime},
)(CaseSelector);