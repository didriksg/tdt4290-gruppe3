import React, {Component} from 'react';
import {logout} from "../../actions/authActions";
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const style = {
    button: {
        borderSize: '1px',
        borderColor: 'white',
        color: 'white',
        variant: 'outlined',
    }
};


class LogoutButton extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    onButtonClick = () => {
        this.props.logout();
    };

    render() {
        return (
            <Button
                onClick={() => {
                    this.onButtonClick();
                }}
                style={style.button}
                variant="contained"
                color="primary"
            >
                Logg ut
            </Button>
        );
    }
}

const mapStateToProps = state => ({
    error: state.error,
});

export default connect(
    mapStateToProps,
    {logout},
)(LogoutButton);