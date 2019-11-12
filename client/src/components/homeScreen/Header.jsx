import React from "react";
import {AppBar, Card, Grid, Toolbar,} from '@material-ui/core'
import LogoutButton from "../logoutButton/LogoutButton";

const style = {
    persona: {marginTop: 10, marginBottom: 10},
    personaDescription: {marginBottom: 10},
    buttons: {marginTop: 10, marginBottom: 10},
    mainCard: {marginTop: 5, marginBottom: 5}
};

export default function UserInformation() {

    return (
        <form>
            <Card style={style.mainCard} raised>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container sm alignItems="flex-start" justify="flex-end" direction="row">
                            <LogoutButton/>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Card>
        </form>
    )
}

