import React from "react";
import "./casescreen.css";
import RadioButtons from "./RadioButtons.jsx"



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
                        <div className="prio"> Prio:</div> 
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
                        <div className="barnvoksen">Barn/Voksen</div>
                        <div className="beskrivelse"> Beskrivelse</div>
                        <div className="beskrivelseboks"> 
                            <textarea 
                                className="inputboxer" 
                                rows="3" 
                                cols="43"
                            >
                                
                                </textarea> 
                        </div>
                
                    </div>
        
                </div>

                

            </div>
        )
    }

}

export default CaseScreen;