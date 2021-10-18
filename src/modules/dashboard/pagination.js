import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Utils from '../../utility';
import { AccountService } from '../../services';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
    },
    
  },
  MuiPaginationItemRoot	: {
backgroundColor:"black"
  }
}));

export default function PaginationRounded(props) {
  const classes = useStyles();

  const [getListOfAddress, setgetListOfAddress] = React.useState([])
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState()
  const [pagecount, setPagecount] = React.useState()

  const setSkips =()=>{
 setSkip(skip+10);
 return skip
  }
  

  const pagination=async()=>{
    
   setSkip(skip+10);
   setLimit(limit);
   const reqObj={
     "skip":skip,
     "limit":limit
   }
    let [error, listOfAccounts] = await Utils.parseResponse(AccountService.getListOfWhitelistedAddress(reqObj))
    if (error || !listOfAccounts)
        return
      
    setgetListOfAddress(listOfAccounts)
    setPagecount(listOfAccounts.count)
    console.log(listOfAccounts.count,"pagecount")
    // props.getListOffAddress(reqObj)
}

  return (
    <div className={classes.root} >
      <div className="paging">
        <Pagination 
        onChange={pagination} count={Math.ceil(pagecount/10)}  
        // count={20}
        shape="rounded" siblingCount={0} color="primary" size="small" />
      </div>
    </div>
  );
}
