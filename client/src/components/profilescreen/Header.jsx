import React from "react";
import {AppBar, Toolbar, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


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


export default function Header() { //
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
        </div>
      );
    }
