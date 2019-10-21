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
import { mergeClasses } from "@material-ui/styles";

const style = {
    persona: { marginTop:10, marginBottom:10 },
    personaDescription: { marginBottom: 10 },
    buttons: { marginTop: 10, marginBottom: 10 },
}

export default function UserInformation(){

    return(
        <form >
            <Grid container direction="column" justify="center" >
                <Grid container justify="center">
                    <AccountCircleIcon style={style.persona}/>
                </Grid>
                
                <Grid container justify="center" style={style.personaDescription}>
                    Ola Nordmann, tilhører bydel ...
                </Grid>
            </Grid>

            <Divider />
        </form>
    )
}

