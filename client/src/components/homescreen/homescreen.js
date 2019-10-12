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
  
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles'


//Data-table methods
const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'gericaId', label: 'gericaID', minWidth: 100}
  ]
  
  function createData(name, gericaId){
    return {name, gericaId}
  }
  
  const rows = [
    createData('Eivind', 8901),
    createData('Dennis', 1234),
    createData('Theo', 8888)
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
  
  // Styling 

  const style = {
    persona: { marginTop:10, marginBottom:10 },
    personaDescription: { marginBottom: 10 },
    buttons: { marginTop: 10, marginBottom: 10 },
    datatable: { marginTop: 10, marginBottom: 10 }
  }


export default function HomeScreen() {

// Data-table logic
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

//Dialog "endre bydel" logic
const [open, setOpen] = React.useState(false);
const handleMunicipalityOpen = () => {
    setOpen(true)
}
const handleMunicipalityClose = () => {
    setOpen(false)
}

  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        
        <Grid container sm>
          <Grid item sm={10}>
            <Typography variant="title" color="inherit">
              My header
            </Typography>
            
          </Grid>
          <Grid item sm={2}>
            <Button variant="contained" color="primary"> Logout</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar> 

    <Grid container direction="column" justify="center" >
      <Grid container justify="center">
        <AccountCircleIcon style={style.persona}/>
      </Grid>
    
      <Grid container justify="center" style={style.personaDescription}>
        Ola Nordmann, tilhører bydel ...
      </Grid>
    </Grid>

    <Divider />
    
    <Grid container>
      <Grid item sm={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
          <Button variant="outlined" color="primary" style={style.buttons}>Arkiv</Button>
          </Grid>
          <Grid item>
          <Button 
            variant="outlined" 
            color="primary" 
            style={style.buttons}
            onClick={handleMunicipalityOpen}
        >
            Endre bydel
        </Button>
          </Grid>
          <Grid item>
          <Button 
            variant="outlined" 
            color="primary" style={style.buttons}
          
          >Måndesrapport</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Divider  />

    <Grid container sm>
      <Grid item sm>
    <Paper style={style.datatable}>
      <Typography variant="title" color="inherit">
        Active cases
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

    <Grid item sm>
      <Paper style={style.datatable}>
        Hello
      </Paper>
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
    </div>
  );
}

