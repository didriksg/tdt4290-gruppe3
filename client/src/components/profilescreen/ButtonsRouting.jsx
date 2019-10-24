import React from "react";
import {Grid, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
    



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
      

    
    
    export default function RoutingButtons() {
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