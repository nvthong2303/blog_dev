import React from 'react'

import { makeStyles } from '@mui/styles'
import {
  Typography,
  Box,
  IconButton,
  Button,
  Dialog,
  Slide,
  AppBar,
  Toolbar
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

import Navbar from './Navbar'
import { getWindowSize } from '../Common/Size'

const useStyles = makeStyles({
  root: {
    '@media screen and (max-width: 480px)': {
      background: '#000000',
      display: 'flex'
    },
    '@media screen and (min-width: 480px) and (max-width: 1199px)': {},
    '@media screen and (min-width: 1200px)': {},
    background: '#000000',
    height: '64px !important',
    maxHeight: '64px',
    width: '100%',
    maxWidth: '100%',
    top: 0,
    position: 'fixed',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2
  },
  leftTitle: {
    '@media screen and (max-width: 480px)': {},
    '@media screen and (min-width: 480px) and (max-width: 1199px)': {},
    '@media screen and (min-width: 1200px)': {},
    marginLeft: '32px !important',
    marginBottom: '0 !important'
  },
  rightIcon: {
    '@media screen and (max-width: 480px)': {},
    '@media screen and (min-width: 480px) and (max-width: 1199px)': {
      marginRight: '36px',
      display: 'in-flex',
      color: '#ffffff'
    },
    '@media screen and (min-width: 1200px)': {
      marginRight: '36px',
      display: 'in-flex',
      color: '#ffffff'
    }
  },
  button: {
    // '@media screen and (max-width: 480px)': {
    //   height: '12px',
    //   marginTop: '32px !important'
    // }
  }
})

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

function Header () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [windowSize, setWindowSize] = React.useState(getWindowSize())

  React.useEffect(() => {
    function handleWindowResize () {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        onClick={() => {
          window.location.href = '/'
        }}
        sx={{ color: '#ffffff', textTransform: 'none' }}
      >
        <Typography className={classes.leftTitle} variant='h4' gutterBottom>
          techieGuy
        </Typography>
      </Button>
      {windowSize.innerWidth > 480 ? (
        <Box className={classes.rightIcon}>
          <a
            href='https://github.com/nvthong2303'
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconButton
              sx={{ color: '#f8f9fa' }}
              aria-label='delete'
              size='large'
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
              size='large'
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
              size='large'
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
              sx={{ color: '#f8f9fa' }}
              aria-label='delete'
              size='large'
            >
              <EmailIcon fontSize='inherit' />
            </IconButton>
          </a>
        </Box>
      ) : (
        <Button onClick={handleClickOpen}>
          <IconButton sx={{ color: '#f8f9fa' }} size='large'>
            <MenuIcon fontSize='inherit' />
          </IconButton>
        </Button>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#000000' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              About me
            </Typography>
          </Toolbar>
        </AppBar>
        <Navbar fullWidth={true} />
      </Dialog>
    </Box>
  )
}

export default Header
