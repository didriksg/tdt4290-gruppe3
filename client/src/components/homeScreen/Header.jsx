import React from "react";
import {AppBar, Grid, Toolbar,} from '@material-ui/core'
import LogoutButton from "../logoutButton/LogoutButton";

const style = {
    appBar: {
        marginRight: '-8px',
        marginLeft: '-8px',
        marginTop: '-8px',
    }


};

export default function UserInformation() {

    return (
        <div style={style.appBar}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container sm alignItems="flex-start" justify="flex-end" direction="row">
                        <LogoutButton/>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

