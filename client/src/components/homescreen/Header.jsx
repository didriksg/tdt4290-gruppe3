import React from "react";
import {AppBar, 
    Toolbar,
    Grid,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Divider,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, 
    Card,  
    
  } from '@material-ui/core'
  import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const style = {
    persona: { marginTop:10, marginBottom:10 },
    personaDescription: { marginBottom: 10 },
    buttons: { marginTop: 10, marginBottom: 10 },
    mainCard: {marginTop: 5, marginBottom:5}
}

export default function UserInformation(){

    return(
        <form>
            <Card style={style.mainCard} raised>
                <AppBar position="static">
                <Toolbar>
                    <Grid container sm>
                    <Grid item sm={10}>
                        <Typography variant="title" color="inherit">
                        Hjemmeside
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Button variant="contained" color="primary"> Logout</Button>
                    </Grid>
                    </Grid>
                </Toolbar>
                </AppBar> 
                </Card>
        </form>
    )
}

