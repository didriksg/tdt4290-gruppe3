import React, {useEffect} from 'react';
import AssignButton from "./AssignButton";

import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography
} from '@material-ui/core';
import {connect} from "react-redux";
import {getCases, updateCaseStatus} from "../../actions/caseActions";
import LoadingScreen from "../loadingScreen/LoadingScreen";


const headCells = [
    {id: 'idNumber', numeric: false, disablePadding: false, label: 'IDNummer'},
    {id: 'category', numeric: true, disablePadding: false, label: 'Kategori'},
    {id: 'priority', numeric: true, disablePadding: false, label: 'Prioritet'},
    {id: 'referral', numeric: true, disablePadding: false, label: 'Henvist fra'},
    {id: 'district', numeric: true, disablePadding: false, label: 'Bydel'},
    {id: 'registeredDate', numeric: true, disablePadding: false, label: 'Innmeldt'},
    {id: 'startupDate', numeric: true, disablePadding: false, label: 'Forventet start'},
    {id: 'assignCase', numeric: true, disablePadding: false, label: ''},
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
    if (array === undefined || array === null) {
        return [];
    }
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
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    let headCellToUse;

    if (props.caseState === 1) {
        headCellToUse = headCells.filter((obj) => {
            return obj.id !== 'assignCase'
        });
    } else {
        headCellToUse = headCells;
    }
    return (
        <TableHead>
            <TableRow>
                {headCellToUse.map(headCell => (
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
                    {props.tableTitle}
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
    const [orderBy, setOrderBy] = React.useState();


    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        props.getCases(props.caseState, props.isChildrenCase);
    }, []);




    // Filter props.cases based on district
    const filterDistrictList = () => {
        return props.districtState !== "" ?
            (props.cases.filter(x => x.district === props.districtState))
            :
            props.cases
    };

    // Filter props.cases based on district
    const filterDateList = (cases) => {
        let prevYearCases = cases.filter(x => x.modifiedStartupDate.year < props.year);
        let currentCases = cases.filter(x => x.modifiedStartupDate.year === props.year);
        let sortedCases;
        console.log(currentCases);
        if  (props.isChildrenCase) {
            sortedCases= currentCases
                .filter(x => x.modifiedStartupDate.date <= props.monthCounter)
        } else {
            sortedCases=currentCases
                .filter(x => x.modifiedStartupDate.date <= props.weekCounter)
        }

        console.log(sortedCases);
        return prevYearCases.concat(sortedCases);
    };

    const filterCases = () => {
        const cases = filterDistrictList();
        return filterDateList(cases);
    };
    
    return (
        <div className={classes.root}>
            {props.isLoading ? <LoadingScreen/> :
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar tableTitle={props.tableTitle}/>
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
                                caseState={props.caseState}
                            />
                            <TableBody>
                                {stableSort(filterCases(), getSorting(order, orderBy))
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
                                                <TableCell align="right">{row.referral}</TableCell>
                                                <TableCell align="right">{row.district}</TableCell>
                                                <TableCell
                                                    align="right">{props.isChildrenCase ? '' : 'Uke '} {props.isChildrenCase ? numberToMonth(row.modifiedRegisteredDate.date) : row.modifiedRegisteredDate.date}, {row.modifiedRegisteredDate.year}</TableCell>
                                                <TableCell
                                                    align="right">{props.isChildrenCase ? '' : 'Uke '} {props.isChildrenCase ? numberToMonth(row.modifiedStartupDate.date) : row.modifiedStartupDate.date}, {row.modifiedStartupDate.year}</TableCell>

                                                {props.caseState == 0 ? <TableCell align="right">
                                                    <AssignButton
                                                        _id={row._id}
                                                        idNumber={row.idNumber}
                                                        category={row.category}
                                                        priority={row.priority}
                                                        isChildrenCase={row.isChildrenCase}
                                                    />
                                                </TableCell> : null}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>{filterDistrictList}
                    </div>
                </Paper>}
        </div>
    );
}

const mapStateToProps = state => ({
    error: state.error,
    cases: state.caseState.cases,
    isLoading: state.caseState.isLoading,
});

const mapDispatchToProps = {
    getCases,
    updateCaseStatus
};

export const numberToMonth = (month) => {
    const monthArray = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
    return monthArray[month];
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OverviewBoard)