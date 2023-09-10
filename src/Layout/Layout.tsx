import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { makeStyles } from '@mui/styles'
import { Box, Grid } from '@mui/material'
import { getWindowSize } from '../Common/Size'

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    minHeight: '100%',
    overflowY: 'auto',
    position: 'relative'
  },
  body: {
    width: '100%',
    minHeight: '100%'
  }
})

const Layout = ({ children }: any) => {
  const classes = useStyles()
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

  return (
    <div className={classes.root}>
      <Header />
      {windowSize.innerWidth > 480 ? (
        <Grid container spacing={0} className={classes.body}>
          <Grid item xs={2.5}>
            <Navbar fullWidth={false} />
          </Grid>
          <Grid item xs={9.5}>
            <div>{children}</div>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <div>{children}</div>
        </Box>
      )}
      <Footer />
    </div>
  )
}

export default Layout
