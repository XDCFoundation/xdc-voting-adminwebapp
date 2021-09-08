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

export default function PaginationRounded() {
  const classes = useStyles();

  const [getListOfAddress, setgetListOfAddress] = React.useState([])
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const setSkips =()=>{
 setSkip(skip+10);
 return skip
  }
  

  const pagination=async(skip,limit)=>{
    
   setSkip(skip+10);
    console.log(skip,"skipppppppppppppppppppppppppppppp");
   let limits = limit ? limit : 10;
    let urlPath = `?skip=${skip}&limit=${limits}`
    let [error, listOfAccounts] = await Utils.parseResponse(AccountService.getListOfWhitelistedAddress(urlPath,{}))
    if (error || !listOfAccounts)
        return
      
    setgetListOfAddress(listOfAccounts)
}

  return (
    <div className={classes.root} >
      <div className="paging">
        <Pagination onChange={pagination} count={20}  shape="rounded" siblingCount={0} color="primary" size="small" />
      </div>
    </div>
  );
}
