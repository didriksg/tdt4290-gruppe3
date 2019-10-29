import React, {Component} from 'react';
import OverviewBoard from "../table/OverviewBoard";
import {Link} from 'react-router-dom';
import {AppBar, 
    Toolbar,
    Grid,
    Button,
    Typography, 
    Card   
  } from '@material-ui/core';
import LogoutButton from "../LogoutButton/LogoutButton";


const style = {
    persona: { marginTop:10, marginBottom:10 },
    personaDescription: { marginBottom: 10 },
    buttons: { marginTop: 10, marginBottom: 10 },
    datatable: { marginTop: 10, marginBottom: 10 },
    mainCard: {marginTop: 5, marginBottom:5}
};

class ActiveCases extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
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
                <div className="activeCasesTable">
                    <OverviewBoard
                        caseState={this.props.caseState}
                        tableTitle={this.props.tableTitle}
                    />
                </div>
            </div>
        );
    }
}

export default ActiveCases;