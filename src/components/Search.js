import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
    },

    padding: {
        padding: '0 !important',
    }

}));

export default function Search(props) {
    const classes = useStyles();
    const { searchText, setSearchText } = props;
    return (
        <div className={classes.root}>
                 <TextField value={searchText} onChange={e => setSearchText(e.target.value)} id="outlined-search" label="Search" size="small" type="search" variant="outlined" style={{paddingRight: 20}}
             InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className={classes.padding}>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                )
              }}/>

        </div>
    );
}


