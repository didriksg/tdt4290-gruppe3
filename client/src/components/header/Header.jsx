import LogoutButton from "../logoutButton/LogoutButton";
import React, {Component} from 'react';
import {AppBar,
    Toolbar,
    Grid,
    Button,
    Typography,
    Card
} from '@material-ui/core';
import {Link} from 'react-router-dom';

const style = {
    persona: { marginTop:10, marginBottom:10 },
    personaDescription: { marginBottom: 10 },
    buttons: { marginTop: 10, marginBottom: 10 },
    datatable: { marginTop: 10, marginBottom: 10 },
    mainCard: {marginTop: 5, marginBottom:5, align:'left'}
};

class Header extends Component {
    render() {
        return (
            <div className="header_activecases">
                <Card style={style.mainCard} raised>
                    <AppBar position="static">
                        <Toolbar>
                            <Grid container sm>
                                <Grid item sm={10}>
                                    <Typography variant="title" color="inherit">
                                        {this.props.headerTitle}
                                    </Typography>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={""}
                                    >
                                        Tilbake - min side
                                    </Button>
                                    <LogoutButton/>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Card>
            </div>
        );
    }
}

export default Header;