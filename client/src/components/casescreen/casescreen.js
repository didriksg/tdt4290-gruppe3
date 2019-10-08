import React from "react";
import "./casescreen.css";

class CaseScreen extends React.Component{

    render(){
        return(
            <div className="casecontainer">

                <div className="caseelements">

                    <h1>Ny sak</h1>    

                    <div class="elementsingrid">
                        
                        <div className="gericanr">Gericanr:</div> 
                        <div className="gericainput"> <input className="inputboxer" type="text" size="35"></input></div>
                        <div className="prio"> Prio:</div> 
                        <div className="priograd">1,2,3,4</div>
                        <div className="henvendtfra"> Henvendelse fra: </div> 
                        <div className="sted"> <input className="inputboxer" type="text" size="35"></input> </div>              
                        <div className="aldersgruppe"> Aldersgruppe:</div>
                        <div className="barnvoksen">Barn/Voksen</div>
                        <div className="beskrivelse"> Beskrivelse</div>
                        <div className="beskrivelseboks"> 
                            <textarea className="inputboxer" rows="3" cols="33">
                                
                            </textarea> 
                        </div>
                
                    </div>
        
                </div>

                

            </div>
        )
    }

}

export default CaseScreen;