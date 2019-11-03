import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography,} from '@material-ui/core'
import {Link} from "react-router-dom"

const style = {
    buttons: {marginTop: 10, marginBottom: 10},
};

export default function RoutingButtons() {
    const [open, setOpen] = React.useState(false);
    const handleMunicipalityOpen = () => {
        setOpen(true)
    };
    const handleMunicipalityClose = () => {
        setOpen(false)
    };

    return (
        <form>
            <Grid container>
                <Grid item sm={12}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={style.buttons}
                                component={Link} to={"/arkiv"}
                            >
                                Arkiv
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={style.buttons}
                                component={Link} to={"/barn"}
                            >
                                Henvisninger barn
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={style.buttons}
                                component={Link} to={"/voksen"}
                            >
                                Henvisninger voksen
                            </Button>
                        </Grid>
                        <Grid item>

                            <Button
                                variant="outlined"
                                color="primary" style={style.buttons}
                                component={Link} to={"/ny-sak"}
                            >
                                Opprett ny sak
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog onClose={handleMunicipalityClose} open={open}>
                <DialogTitle>
                    Endre bydel
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMunicipalityClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </form>
    )
}