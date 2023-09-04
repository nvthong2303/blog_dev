import React from 'react'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        background: '#f8f9fa',
        width: '100%',
        height: '60px',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1.5px solid #dee2e6'
    },
});

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>nvthong2303@gmai.com © 2023</div>
    )
}

export default Footer
