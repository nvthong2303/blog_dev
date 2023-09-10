import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { makeStyles } from '@mui/styles'
import { Box, Grid } from '@mui/material'

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
  const widthScreen = window.innerWidth

  return (
    <div className={classes.root}>
      <Header />
      {widthScreen > 480 ? (
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
