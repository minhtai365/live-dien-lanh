// import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function BasicPagination() {
// const classes = useStyles();
//   return (
//     <div className=''>
//       {/* <Pagination count={10} /> */}

//       {/* <Pagination count={10} color="secondary" />
//       <Pagination count={10} disabled /> */}
//     </div>
//   );
// }
import React, { Component } from 'react';
// page={page} onChange={handleChange}
class BasicPagination extends Component {
  render() {
    return (
      <div>
        <Pagination size="large" count={10} color="primary" />
      </div>
    );
  }
}

export default BasicPagination;