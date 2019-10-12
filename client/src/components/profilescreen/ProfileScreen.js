import React from "react";
import {AppBar, Toolbar, Grid, Button, Divider, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
    
    
      
      function createData(name, district, group, access){
        return {name, district, group, access}
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
      
    
    
    export default function ProfileScreen() {
      const classes = useStyles();
        
      
    
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
              <Button variant="outlined" color="primary">Endre Passord</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        </div>
      );
    }
