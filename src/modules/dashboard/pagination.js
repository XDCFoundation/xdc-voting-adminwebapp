import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
  }
}));

export default function PaginationRounded() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ float: "right" }}>
        <Pagination count={20} shape="rounded" siblingCount={0} color="primary" size="small" />
      </div>
    </div>
  );
}
