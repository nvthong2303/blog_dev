import React from 'react'
import { makeStyles } from '@mui/styles'
import { IconButton, Typography } from '@mui/material'
import Markdown from 'markdown-to-jsx'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    marginTop: '60px',
    width: '100%',
    maxWidth: '100% !important',
    minHeight: '100vh',
    marginBottom: '0',
    padding: '24px',
    boxSizing: 'border-box'
  }
})

function Blog1 () {
  const classes = useStyles()
  const file_name = 'indexSql.md'
  const [post, setPost] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    import(`../Contents/${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Layout>
      <div className={classes.root}>
        <IconButton onClick={handleBack}>
          <ArrowBackIosNewIcon />
          <Typography>Quay lại</Typography>
        </IconButton>
        <Markdown>{post}</Markdown>
      </div>
    </Layout>
  )
}

export default Blog1
