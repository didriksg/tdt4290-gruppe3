import React from "react";
import "./casescreen.css";
import RadioButtons from "./RadioButtons.jsx";
import BarnVoksenSelect from "./BarnVoksenSelect.jsx";
import DateFields from "./DateFields.jsx";
import BydelSelect from "./BydelSelect.jsx";


class CaseScreen extends React.Component{

    render(){
        return(
            <div className="casecontainer">

                <div className="caseelements">

                    <h1>Ny sak</h1>    

                    <div className="elementsingrid">
                        
                        
                        <div className="gericanr">Gericanr:</div> 
                        <div className="gericainput"> 
                            <input 
                                className="inputboxer" 
                                type="number"
                            >
                            </input>
                        </div>


                        <div className="prio"> Prioritet:</div> 
                        <div className="priograd">
                            <RadioButtons />
                        </div>


                        <div className="henvendtfra"> Henvendelse fra: </div> 
                        <div className="sted"> 
                            <input 
                                className="inputboxer" 
                                type="text" 
                                size="40.99999"
                            >
                                
                                </input> 
                        </div>              


                        <div className="aldersgruppe"> Aldersgruppe:</div>
                        <div className="barnvoksen">
                            <BarnVoksenSelect />
                        </div>


                        <div className="registreringsdato">Registreringsdato:</div>
                        <div className="oppstartsdato">Oppstartsdato:</div>
                        <div className="dato">
                            <DateFields />
                        </div>


                        <div className="bydel">Bydel:</div>
                        <div className="bydelbox"> 
                            <BydelSelect />
                        </div>


                        <div className="kategori"> Kategori</div>
                        <div className="kategorifelt">
                            <input
                                className="inputboxer"
                                type="text"
                                size="40.99999"
                                >
                            </input>
                        </div>


                        <div className="beskrivelse"> Beskrivelse</div>
                        <div className="beskrivelseboks"> 
                            <textarea 
                                className="inputboxer" 
                                rows="6" 
                                cols="43"
                            >                                
                            </textarea> 
                        </div>


                        <div className="avbrytknapp">
                            <form className="forma">
                                <button className="abutton" type="submit">Avbryt</button>
                            </form>
                        </div>

                        <div className="viktigknapp">
                            <form className="formb">
                                <button className="mbutton" type="submit">Marker viktig</button>
                            </form>
                        </div>

                        <div className="lagnysakknapp">
                            <form className="formc">
                                <button className="lbutton" type="submit">Lag ny sak</button>
                            </form>
                        </div>

                    </div>
        
                </div>

                

            </div>
        )
    }

}

export default CaseScreen;