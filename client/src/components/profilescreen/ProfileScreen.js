import React from "react";
import {AppBar, Toolbar, Grid, Button, Divider, Typography, Card, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
    
    
      //wish to display this list-values
      function createData(name, district, group, access){
        return {name, district, group, access}
      }


      function checkPassword(p1, p2){
          while(p1 != p2){

            print("Passordene er ikke like. Prøv på nytt")
        }

      }
      
      
      const useStyles = makeStyles({
        root: {
          width: '100%',
            
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        inline: {
            display: 'inline',
          },
      });


    const style = {
        
        buttons: { marginTop: 10, marginBottom: 10 },
        
      }
      

    
    
    export default function ProfileScreen() {
      const classes = useStyles();



    //dialog functionality: "change password"
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
        
      

    
      return (
        <div>
        <AppBar position="static">
          <Toolbar>
            
            <Grid container >
              <Grid item sm={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <h1 >
                          Min Profil
                        </h1>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar> 

        <Grid container>
            <Grid item sm={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                         <List className={classes.root}>
                            <ListItem alignItems="center">
                                <ListItemText primary="Brukernavn:"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ola nordmann
                                    </Typography>
                                    </React.Fragment>
                                        }
                                        />
                            </ListItem>
                        
                            <Divider variant="inset" component="li" />

                                <ListItem alignItems="center">
                                    <ListItemText primary="Passord:"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                ********
                                            </Typography>
                                            </React.Fragment>
                                                }
                                                />
                                    </ListItem>

                                <Divider variant="inset" component="li" />

                                <ListItem alignItems="center">
                                    <ListItemText primary="Bydel:"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Midtbyen
                                            </Typography>
                                            </React.Fragment>
                                                }
                                                />
                                    </ListItem>

                                <Divider variant="inset" component="li" />

                                <ListItem alignItems="center">
                                    <ListItemText primary="Gruppe:"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Barn
                                            </Typography>
                                            </React.Fragment>
                                                }
                                                />
                                    </ListItem>

                                <Divider variant="inset" component="li" />

                                <ListItem alignItems="center">
                                        <ListItemText primary="Bruker:"
                                        secondary={
                                            <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                Admin
                                            </Typography>
                                            </React.Fragment>
                                                }
                                                />
                                    </ListItem>

                                <Divider variant="inset" component="li" />

                        </List>
                    </Grid>
                 </Grid>
            </Grid>                   
        </Grid>
    
    
        
        <Grid container>
          <Grid item sm={12}>
            <Grid container justify="center" spacing={2}>
        
              <Grid item>
              <Button variant="outlined" color="primary">Returner til Min Side</Button>
              </Grid>
              
            <Grid item>     
              <Button variant="outlined" color="primary" onClick={handleClickOpen} style={style.buttons}>Endre Passord</Button>
            </Grid>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle> Endre passord</DialogTitle>
                            <DialogContent dividers>
                                <DialogContentText>
                                    Skriv inn et nytt passord:
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    //label="Passord:"
                                    type="password"
                                    
                                />
                                <DialogContentText>
                                    Gjenta passord:
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    //label="Passord:"
                                    type="password"
                                    
                                />
                            </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Tilbake
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Endre
                                    </Button>
                                </DialogActions>
                        </Dialog>
                
              
            </Grid>
          </Grid>
        </Grid>
        
        </div>
      );
    }
