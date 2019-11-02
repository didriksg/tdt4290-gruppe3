import React, {Component} from 'react';
import "./CasePage.css";
import {Link} from 'react-router-dom';

class CasePage extends Component {
    render() {
        return (
            <div className="gridContainer">
                <div className="back">
                <Link className="backButton" to="/alle-saker">⇦ Tilbake</Link>
                </div>
                <div className="header">
                    <h1 className="idNummer">ID-Nummer</h1>
                </div>

                <div className="assign">
                    <button>Tildel</button>
                </div>

                <div className="leftSide">
                    <div className="category">Kategori</div>
                    <div className="priority">Prioritet</div>
                    <div className="referredFrom">Henvist fra</div>
                </div>

                <div className="rightSide">
                    <div className="district">Bydel</div>
                    <div className="registered">Innmeldt</div>
                    <div className="startupDate">Forventet start</div>
                </div>
            </div>
        );
    }
}
export default CasePage;