import React from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, Box, Typography, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'

import avatarSrc from '../Assets/s1.PNG'
import StreetCart from '../Assets/streetcart.png'

const useStyles = makeStyles({
  root: {
    '@media screen and (min-width: 480px) and (max-width: 1199px)': {
      padding: '24px 8px'
    },
    '@media screen and (min-width: 1200px)': {
      padding: '32px'
    },
    marginTop: '60px',
    width: '100%',
    minHeight: '100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderLeft: '1.5px solid #dee2e6',
    backgroundColor: '#f0f8ff',
    textAlign: 'center'
  },
  avatar: {
    '@media screen and (max-width: 480px)': {
      marginTop: '80px !important'
    }
    // '@media screen and (max-width: 480px)': {},
    // '@media screen and (min-width: 480px) and (max-width: 1199px)': {
    //   width: 160,
    //   height: 160
    // },
    // '@media screen and (min-width: 1200px)': {
    //   width: '160px',
    //   height: '160px'
    // }
  }
})

function Navbar (props: any) {
  const { fullWidth } = props
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{ marginTop: fullWidth ? '0px' : '60px' }}
    >
      <Avatar
        className={classes.avatar}
        alt='nvthong2303 :D'
        src={avatarSrc}
        sx={{
          width: fullWidth ? 80 : '90%',
          height: fullWidth ? 80 : '90%',
          border: '1.5px solid #dee2e6',
          zIndex: 0
        }}
      />
      <Typography variant='h6' gutterBottom>
        Thong Nguyen Van
      </Typography>
      <Typography variant='caption' gutterBottom>
        Software engineer @ CMC Telecom.
      </Typography>
      <Typography variant='caption' gutterBottom>
        Geek. Hust alumni. Software Developer.
      </Typography>
      <Box>
        <a
          href='https://github.com/nvthong2303'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            sx={{ color: '#000000' }}
            aria-label='delete'
            size={fullWidth ? 'large' : 'small'}
          >
            <GitHubIcon fontSize='inherit' />
          </IconButton>
        </a>
        <a
          href='https://www.facebook.com/nvthong2303'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            sx={{ color: '#2374e1' }}
            aria-label='delete'
            size={fullWidth ? 'large' : 'small'}
          >
            <FacebookIcon fontSize='inherit' />
          </IconButton>
        </a>
        <a
          href='https://www.linkedin.com/in/nguyen-thong-768360194/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            sx={{ color: '#0a66c2' }}
            aria-label='delete'
            size={fullWidth ? 'large' : 'small'}
          >
            <LinkedInIcon fontSize='inherit' />
          </IconButton>
        </a>
        <a
          href='mailto:nvthong2303@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            sx={{ color: '#000000' }}
            aria-label='delete'
            size={fullWidth ? 'large' : 'small'}
          >
            <EmailIcon fontSize='inherit' />
          </IconButton>
        </a>
      </Box>
      {fullWidth ? <Box></Box> : null}
    </div>
  )
}

export default Navbar
