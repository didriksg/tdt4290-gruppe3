import LogoutButton from "../logoutButton/LogoutButton";
import React, {Component} from 'react';
import {AppBar, Button, Card, Grid, Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';

const style = {
    persona: {marginTop: 10, marginBottom: 10},
    personaDescription: {marginBottom: 10},
    buttons: {marginTop: 10, marginBottom: 10},
    datatable: {marginTop: 10, marginBottom: 10},
    mainCard: {marginTop: 5, marginBottom: 5, align: 'left'}
};

class Header extends Component {
    render() {
        return (
            <div className="header_activecases">
                <Card style={style.mainCard} raised>
                    <AppBar position="static">
                        <Toolbar>
                            <Grid container sm alignItems="flex-start" justify="flex-end" direction="row">
                                <Button
                                    className="back-button"
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={""}
                                >
                                    Tilbake til forsiden
                                </Button>
                                <LogoutButton/>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Card>
            </div>
        );
    }
}

export default Header;