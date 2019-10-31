import React from "react";
import "./casescreen.css";
import RadioButtons from "./RadioButtons";
import BarnVoksenSelect from "./BarnVoksenSelect";
import DatePicker from "./DatePicker";
import BydelSelect from "./BydelSelect";
import KategoriSelect from "./KategoriSelect";
import HenvendtSelect from "./HenvendtSelect";


class CaseScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            priority: null,
            isChildrenCase: null,
            referal: null,
            registeredDate: new Date(),
            startDate: null,
            category: null,
            district: null,
        }
    }

    handleEventChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };

    handleDateChange = (name, date) => {
        this.setState({[name]: date});
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
                                onChange={this.handleEventChange}
                            >
                            </input>
                        </div>


                        <div className="prio"> Prioritet:</div>
                        <div className="priograd">
                            <RadioButtons handleFunction={this.handleEventChange} value={this.state.priority} name={'priority'}/>
                        </div>


                        <div className="henvendtfra"> Henvendelse fra:</div>
                        <div className="sted">
                            <HenvendtSelect handleFunction={this.handleEventChange} value={this.state.referal} name={'referal'}/>
                        </div>


                        <div className="aldersgruppe"> Aldersgruppe:</div>
                        <div className="barnvoksen">
                            <BarnVoksenSelect handleFunction={this.handleEventChange} value={this.state.isChildrenCase} name={'isChildrenCase'}/>
                        </div>


                        <div className="registreringsdato">Registreringsdato:</div>
                        <div className="RegDate">
                            <DatePicker handleFunction={this.handleDateChange} value={this.state.registeredDate} name={'registeredDate'}/>
                        </div>

                        <div className="oppstartsdato">Oppstartsdato:</div>
                        <div className="StartDate">
                            <DatePicker handleFunction={this.handleDateChange} value={this.state.startupDate} name={'startupDate'}/>
                        </div>


                        <div className="bydel">Bydel:</div>
                        <div className="bydelbox">
                            <BydelSelect handleFunction={this.handleEventChange} value={this.state.district} name={'district'}/>
                        </div>


                        <div className="kategori"> Kategori</div>
                        <div className="kategorifelt">
                            <KategoriSelect handleFunction={this.handleEventChange} value={this.state.category} name={'category'}/>
                        </div>

                        <button className="abutton" onClick={''}>Avbryt</button>
                        <button className="mbutton" onClick={''}>Legg til henvendelse</button>
                    </div>

                </div>


            </div>
        )
    }

}

export default CaseScreen;