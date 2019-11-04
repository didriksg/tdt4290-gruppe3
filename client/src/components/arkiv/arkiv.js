import React from 'react';
import {AppBar, 
    Toolbar,
    Grid,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Divider,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, 
    Card  
    
  } from '@material-ui/core'
  import {makeStyles} from '@material-ui/core/styles'
  import {Link} from 'react-router-dom';
//Data-overviewBoard methods

// Sample data method
const columns = [
      {id: 'gericaId', label: 'gericaID', minWidth: 100},
      {id: 'diagnose', label: 'Diagnosegruppe', minWidth: 170},
      {id: 'aldersgruppe', label: 'Aldersgruppe', minWidth: 170},
      {id: 'prioritet', label: 'Prioritet', minWidth: 170},
      {id: 'terapaut', label: 'Terapaut', minWidth: 170},
      {id: 'innmeldt', label: 'Innmeldt uke', minWidth: 170},
      {id: 'arkivert', label: 'Arkivert uke', minWidth: 170},
    ]
    
// Sample data method
function createData(gericaId, diagnose, aldersgruppe, prioritet, terapaut, innmeldt, arkivert){
  return {gericaId, diagnose, aldersgruppe, prioritet, terapaut, innmeldt, arkivert}
}
  
// Sample data method
const rows = [
  createData('010101', "Demens", "Voksen", 4, "Ola Nordmann", 36, 39),
    createData('000191', "Demens", "Voksen", 2, "Ola Nordmann", 36, 39),
    createData('999999', "Demens", "Voksen", 1, "Ola Nordmann", 37, 39),
  
];
    
const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  tableWrapper: {
    maxHeight: 400,
    overflow: 'auto'
  },
});

const style = {
    persona: { marginTop:10, marginBottom:10 },
    personaDescription: { marginBottom: 10 },
    buttons: { marginTop: 10, marginBottom: 10 },
    datatable: { marginTop: 10, marginBottom: 10 },
    mainCard: {marginTop: 5, marginBottom:5}
  }


export default function Arkiv(){

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0)
    }


    return(
    <div>
        <Card style={style.mainCard} raised>
        <AppBar position="static">
            <Toolbar>
                <Grid container sm>
                    <Grid item sm={10}>
                        <Typography variant="title" color="inherit">
                            Arkiv
                        </Typography>   
                    </Grid>
                    <Grid item sm={2}>
                        <Button variant="contained" color="primary" component={Link} to={""}> Tilbake - min side</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        </Card>
    <Card style={style.mainCard} raised>
    <Grid justify="center" container sm>
    
    <Paper style={style.datatable}>
      <Typography variant="h6" color="inherit">
        Alle arkiverte saker
      </Typography>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} align={column.align} style={{ minWidt: column.minWidth}}>
                {column.label}
              </TableCell>

            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map(row =>{
            return(
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10,25]}
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

      >
      </TablePagination>
    </Paper>
    </Grid>
    </Card>
    

    </div>
    )

}