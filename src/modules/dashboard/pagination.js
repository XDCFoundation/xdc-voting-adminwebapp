import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      padding:"15px",
    //   marginLeft:theme.spacing(95),
    //   marginBottom:theme.spacing(45),
    marginLeft:"64vw",
      color:"#2149B9",
      fontSize:"large"
      
    },
    marginBottom:"5%",
    padding:"0px"
  },
}));

export default function PaginationRounded() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={20} shape="rounded"  siblingCount={0.5} color="primary" size="small" style={{color:"#2149B9",padding:"15px",paddingInline:"5px"}} />
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </div>
  );
}
