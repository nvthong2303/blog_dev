import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

import avatarSrc from '../Assets/s1.PNG'

const useStyles = makeStyles({
    root: {
        marginTop: '60px',
        width: '100%',
        minHeight: '100vh',
        padding: '32px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderLeft: '1.5px solid #dee2e6',
        backgroundColor: '#f0f8ff'
    },
});

function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar
                alt="nvthong2303 :D"
                src={avatarSrc}
                sx={{ width: 160, height: 160, border: '1.5px solid #dee2e6', zIndex: 0 }}
            />
            <Typography variant="h6" gutterBottom>
                Thong Nguyen Van
            </Typography>
            <Typography variant="caption" gutterBottom>
                Software engineer @ CMC Telecom.
            </Typography>
            <Typography variant="caption" gutterBottom>
                Geek. Hust alumni. Software Developer.
            </Typography>
            <Box>
                <a href="https://github.com/nvthong2303" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#000000" }} aria-label="delete" size="small">
                        <GitHubIcon fontSize="inherit" />
                    </IconButton>
                </a>
                <a href="https://www.facebook.com/nvthong2303" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#2374e1" }} aria-label="delete" size="small">
                        <FacebookIcon fontSize="inherit" />
                    </IconButton>
                </a>
                <a href="https://www.linkedin.com/in/nguyen-thong-768360194/" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#0a66c2" }} aria-label="delete" size="small">
                        <LinkedInIcon fontSize="inherit" />
                    </IconButton>
                </a>
                <a href="mailto:nvthong2303@gmail.com" target="_blank" rel="noopener noreferrer">
                    <IconButton sx={{ color: "#000000" }} aria-label="delete" size="small">
                        <EmailIcon fontSize="inherit" />
                    </IconButton>
                </a>
            </Box>
        </div>
    )
}

export default Navbar
