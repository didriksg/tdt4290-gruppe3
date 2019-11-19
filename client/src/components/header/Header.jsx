import LogoutButton from "../logoutButton/LogoutButton";
import React, {Component} from 'react';
import {AppBar, Button, Grid, Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';

const style = {
    appBar: {
        marginRight: '-8px',
        marginLeft: '-8px',
        marginTop: '-8px',
        top: 0,
        position: 'sticky',
        zIndex: 100
    }
};

class Header extends Component {
    render() {
        return (
            <div style={style.appBar}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container sm alignItems="flex-start" justify="flex-end" direction="row">
                            <Button
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
            </div>
        );
    }
}

export default Header;