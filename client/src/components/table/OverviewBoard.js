import React from 'react';
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


// Sample data method
function createData(gericaid, diagnose, aldersgruppe, prioritet, terapeut, innmeldt, sakStart) {
  return { gericaid, diagnose, aldersgruppe, prioritet, terapeut, innmeldt, sakStart };
}

// Sample data method
const rows = [
    createData('010101', "Tiltak", "Voksen", 4, "Ola Nordmann", 36, 38),
    createData('111111', "Arbeidsform", "Barn", 2, "Kari Nordmann", 38, 40),
    createData('222222', "Diagnoser", "Voksen", 1, "Per", 37, 37),
    createData('333333', "Tiltak", "Voksen", 4, "Ola Nordmann", 36, 38),
    createData('000191', "Arbeidsform", "Barn", 2, "Kari Nordmann", 38, 40),
    createData('999999', "Diagnoser", "Voksen", 1, "Per", 37, 37),
  ];

const headCells = [
  { id: 'gericaid', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'diagnose', numeric: true, disablePadding: false, label: 'Diagnosegrupper' },
  { id: 'aldersgruppe', numeric: true, disablePadding: false, label: 'Aldersgruppe' },
  { id: 'prioritet', numeric: true, disablePadding: false, label: 'Prioritet' },
  { id: 'terapeut', numeric: true, disablePadding: false, label: 'Terapeut' },
  { id: 'innmeldt', numeric: true, disablePadding: false, label: 'Innmeldt uke' },
  { id: 'sakStart', numeric: true, disablePadding: false, label: 'Forventet start' },
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

export default function OverviewBoard() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('diagnose');
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.gericaid}
                    >
                      <TableCell component="th" id={labelId} scope="row" >
                        {row.gericaid}
                      </TableCell>
                      <TableCell align="right">{row.diagnose}</TableCell>
                      <TableCell align="right">{row.aldersgruppe}</TableCell>
                      <TableCell align="right">{row.prioritet}</TableCell>
                      <TableCell align="right">{row.terapeut}</TableCell>
                      <TableCell align="right">{row.innmeldt}</TableCell>
                      <TableCell align="right">{row.sakStart}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
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