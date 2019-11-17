import React from "react";
import {Button, Grid,} from '@material-ui/core'
import {Link} from "react-router-dom"
import ArchiveIcon from '@material-ui/icons/Archive';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const style = {
    buttons: {
        margin: '0.1rem',
    },
    headings: {
        textAlign: 'center',
        fontFamily: 'sans-serif'
    }
};

export default function RoutingButtons() {
    return (
        <div>
            <div>
                <h1 style={style.headings}>Henvisninger</h1>
                <Grid container>
                    <Grid item sm={12}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    startIcon={<ArchiveIcon/>}
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
                                    startIcon={<ChildCareIcon/>}
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
                                    startIcon={<AccessibilityIcon/>}
                                    style={style.buttons}
                                    component={Link} to={"/voksen"}
                                >
                                    Henvisninger voksen
                                </Button>
                            </Grid>
                            <Grid item>

                                <Button
                                    variant="outlined"
                                    startIcon={<AddCircleIcon/>}
                                    color="primary"
                                    style={style.buttons}
                                    component={Link} to={"/ny"}
                                >
                                    Registrer ny henvisning
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <div>
                <h1 style={style.headings}>Profil</h1>
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
                                    Min profil
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={style.buttons}
                                    component={Link} to={"/arkiv"}
                                >
                                    Administratorpanel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

