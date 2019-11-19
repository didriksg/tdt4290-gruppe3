import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateCaseStatus} from '../../actions/caseActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function AssignButton(props) {
    const [open, setOpen] = React.useState(false);
    const userid = useSelector(state => state.auth.user._id);
    const dispatch = useDispatch();

    /*
    AssignButton.propTypes = {
        updateCaseStatus: PropTypes.func.isRequired,

    }*/
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAssignCase = () => {
        setOpen(false);
        dispatch(updateCaseStatus(props._id, userid, 1, props.isChildrenCase));
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Velg henvisning
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title">{"Ønsker du å tildele deg henvisningen med ID nummer: "}{props.idNumber}{"?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Prioritet: {props.priority} <br/>
                        Kategori: {props.category} <br/>
                        Aldersgruppe: {props.isChildrenCase ? 'Barn' : 'Voksen'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Avbryt
                    </Button>
                    <Button onClick={handleAssignCase} color="primary" autoFocus>
                        Tildel henvisning
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AssignButton;