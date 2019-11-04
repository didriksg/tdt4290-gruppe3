import React from "react";
import {Divider,} from '@material-ui/core'
import {useSelector} from "react-redux";


const style = {
    persona: {marginTop: 10, marginBottom: 10},
    personaDescription: {marginBottom: 10},
    buttons: {marginTop: 10, marginBottom: 10},
    center: {textAlign: 'center', fontFamily: 'sans-serif'}
};

export default function UserInformation() {
    const userInfo = useSelector(state => state.auth.user);

    return (
        <div style={style.center}>
            <h2>{userInfo.name}</h2>
            <h4>Tilhører bydel: {userInfo.district}</h4>
            <Divider/>
        </div>
    )
}

