import React, {Component} from 'react';
import Header from "../header/Header";
import CaseSelector from "./CaseSelector";


class CaseScreen extends Component {
    render() {
        return (
            <div>
                <Header/>
                <CaseSelector/>
            </div>
        )
    }
}

export default CaseScreen