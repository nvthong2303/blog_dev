import React from 'react';
import { makeStyles } from '@mui/styles';
import Layout from '../Layout/Layout';

const useStyles = makeStyles({

});

function Notfound() {
    const classes = useStyles();

    return (
        <Layout>
            <h1 className="notfound">The page you are looking for does not exist</h1>
        </Layout>
    )
}

export default Notfound
