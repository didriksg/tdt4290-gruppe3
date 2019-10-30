import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {updateCaseStatus} from '../../actions/caseActions';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function AssignButton(props) {
    const [open, setOpen] = React.useState(false);
    const userid = useSelector( state => state.auth.user._id);
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
        console.log(userid);
        dispatch(updateCaseStatus(props._id, userid, 1));
    };




    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Tildel sak
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Ønsker du å tildele deg saken med ID nummer: "}{props.idNumber}{"?"}</DialogTitle>
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
                        Tildel sak
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AssignButton;