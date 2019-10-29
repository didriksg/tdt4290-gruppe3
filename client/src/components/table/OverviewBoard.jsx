import React, {useEffect} from 'react';
import AssignButton from "./AssignButton";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper
} from '@material-ui/core';
import {connect} from "react-redux";
import {getCases, updateCaseStatus} from "../../actions/caseActions";


// Sample data method
function createData(idNumber, category, priority, referredFrom, district, registeredDate, startupDate) {
    return { idNumber, category, priority, referredFrom, district, registeredDate, startupDate };
}

// Sample data method
const rows = [
    createData('010101', "Tiltak", 4, "Ola Nordmann", "Midtbyen", 38, 43),
    createData('111111', "Arbeidsform", 2, "Kari Nordmann", "Østbyen", 40, 42),
    createData('222222', "Diagnoser", 1, "Per", "Lerkendal", 37, 38),
    createData('333333', "Tiltak", 4, "Ola Nordmann", "Heimdal", 38, 37),
    createData('000191', "Arbeidsform", 2, "Kari Nordmann", "Østbyen", 40, 45),
    createData('999999', "Diagnoser", 1, "Per", "Østbyen", 37, 48),
];

const headCells = [
    { id: 'idNumber', numeric: false, disablePadding: false, label: 'IDNummer' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Kategori' },
    { id: 'priority', numeric: true, disablePadding: false, label: 'Prioritet' },
    { id: 'referredFrom', numeric: true, disablePadding: false, label: 'Henvist fra' },
    { id: 'district', numeric: true, disablePadding: false, label: 'Bydel' },
    { id: 'registeredDate', numeric: true, disablePadding: false, label: 'Innmeldt' },
    { id: 'startupDate', numeric: true, disablePadding: false, label: 'Forventet start' },
    { id: 'assignCase', disablePadding: false, label: 'Tildel sak' },
];

// Sort function
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0)
            return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = props => {
    return (
        <Toolbar>
            <div>
                <Typography variant="h6" id="tableTitle">
                    Alle saker
                </Typography>
            </div>
        </Toolbar>
    );
};

// Styling
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function OverviewBoard(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('category');
    const [page, setPage] = React.useState(0);

    // Chooses how many rows to be shown
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        props.getCases(0);
    },[]);


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.cases.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        stickyHeader
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(props.cases, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.idNumber}
                                        >
                                            <TableCell component="th" id={labelId} scope="row">{row.idNumber}</TableCell>
                                            <TableCell align="right">{row.category}</TableCell>
                                            <TableCell align="right">{row.priority}</TableCell>
                                            <TableCell align="right">{row.referredFrom}</TableCell>
                                            <TableCell align="right">{row.district}</TableCell>
                                            <TableCell align="right">{row.registeredDate}</TableCell>
                                            <TableCell align="right">{row.startupDate}</TableCell>
                                            <TableCell align="right">
                                                <AssignButton
                                                    idNumber={row._id}
                                                    category={row.category}
                                                    priority={row.priority}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={props.cases.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

const mapStateToProps = state => ({
    error: state.error,
    cases: state.caseState.cases,
});

const mapDispatchToProps = {
    getCases,
    updateCaseStatus
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OverviewBoard)