import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box, IconButton, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const useStyles = makeStyles({
    root: {
        background: '#000000',
        width: '100%',
        maxWidth: '100%',
        height: '64px !important',
        maxHeight: '64px',
        top: 0,
        position: 'fixed',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2
    },
    leftTitle: {
        marginLeft: '32px !important'
    },
    rightIcon: {
        marginRight: '36px',
        display: 'in-flex',
        color: '#ffffff'
    }
});


function Header() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Button onClick={() => {
                window.location.href = '/'
            }} sx={{ color: '#ffffff', textTransform: 'none' }}>
                <Typography className={classes.leftTitle} variant="h4" gutterBottom >techie Guy</Typography>
            </Button>
            <Box className={classes.rightIcon}>
                <a href="https://github.com/nvthong2303" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#f8f9fa" }} aria-label="delete" size="large">
                        <GitHubIcon fontSize="inherit" />
                    </IconButton>
                </a>
                <a href="https://www.facebook.com/nvthong2303" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#2374e1" }} aria-label="delete" size="large">
                        <FacebookIcon fontSize="inherit" />
                    </IconButton>
                </a>
                <a href="https://www.linkedin.com/in/nguyen-thong-768360194/" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#0a66c2" }} aria-label="delete" size="large">
                        <LinkedInIcon fontSize="inherit" />
                    </IconButton>
                </a>
                <a href="mailto:nvthong2303@gmail.com" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#f8f9fa" }} aria-label="delete" size="large">
                        <EmailIcon fontSize="inherit" />
                    </IconButton>
                </a>
            </Box>
        </Box>
    )
}

export default Header
