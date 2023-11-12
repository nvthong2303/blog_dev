import React from 'react'
import Layout from '../Layout/Layout'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import test from '../Contents/testing.MD'

const useStyles = makeStyles({
  root: {
    marginTop: '60px',
    width: '100%',
    minHeight: '100vh',
    marginBottom: '0',
    padding: '24px',
    boxSizing: 'border-box'
  }
})

const lists = [
  {
    id: 'event-loop-in-javascript',
    title: 'Event Loop trong JavaScript - Cách JavaScript xử lý bất đồng bộ',
    author: 'thong.nguyen van',
    date: 'September 04, 2023'
  },
  {
    id: 'index-sql-part1',
    title: 'Chỉ mục (Index) trong SQL - Part 1',
    author: 'thong.nguyen van',
    date: 'September 09, 2023'
  },
  {
    id: 'multithread-python',
    title: 'Đa luồng trong Python',
    author: 'thong.nguyen van',
    date: 'September 12, 2023'
  },
  {
    id: 'learn-python-part1',
    title: 'Tự học Python - Part 1 - Classes & Object',
    author: 'thong.nguyen van',
    date: 'September 17, 2023'
  },
  {
    id: 'learn-python-part2',
    title: 'Tự học Python - Part 2 - Classes & Object',
    author: 'thong.nguyen van',
    date: 'September 29, 2023'
  },
  {
    id: 'learn-python-part3',
    title: 'Tự học Python - Part 3 - Special Methods',
    author: 'thong.nguyen van',
    date: 'September 29, 2023'
  },
  {
    id: 'learn-python-part4',
    title: 'Tự học Python - Part 4 - Properties',
    author: 'thong.nguyen van',
    date: 'September 30, 2023'
  },
  {
    id: 'learn-python-part5',
    title: 'Tự học Python - Part 5 - Single Inheritance',
    author: 'thong.nguyen van',
    date: 'October 03, 2023'
  },
  {
    id: 'golang-part1',
    title: 'Chia sẻ 1 chút về Golang',
    author: 'thong.nguyen van',
    date: 'November 10, 2023'
  },
  {
    id: 'golang-part2',
    title: 'Cùng tìm Goroutine và channel trong Golang',
    author: 'thong.nguyen van',
    date: 'November 11, 2023'
  }
]

interface VideoProps {
  src?: string
}

const components = {
  video: ({ src }: VideoProps) => <video src={src} />
}

function Home () {
  const classes = useStyles()

  return (
    <Layout>
      <div className={classes.root}>
        <Typography variant='h5' gutterBottom>
          Hi.
        </Typography>
        <Typography variant='caption' display='block' gutterBottom>
          Chào mừng các bạn đến với 1 Blog phủ bụi, cỏ mọc um tùm của mình. Mình
          tạo ra trang Blog này với mục đích chính là để học tập và chia sẻ, hy
          vọng các bạn sẽ tìm kiếm được 1 điều gì đó ở đây. Mình là Thông, cựu
          sinh viên CNTT Bách Khoa Hà Nội (K63), hiện đang là một kỹ sư phần
          mềm, rất vui được các bạn ghé thăm.
        </Typography>
        <Typography
          variant='caption'
          display='block'
          gutterBottom
          sx={{ marginTop: '24px' }}
        >
          Thật ra đây toàn là những thứ mà nhiều người đã viết, nhưng mình vẫn
          muốn viết lại (để ôn tập lại hoặc trong lúc tự học một thứ mới mẻ gì
          đó) một cách dễ hiểu hơn cho các bạn mới bắt đầu lập trình có thể tham
          khảo, các chủ để của mình thường thì sẽ xoay quanh JavaScript, Golang,
          Python một chút devOps và vài chủ đề khác, dĩ nhiên là đều ở mức cơ
          bản thôi, mọi người đọc và cho mình xin góp ý để chúng ta cùng cải
          thiện, mình cảm ơn.
        </Typography>

        <hr style={{ marginTop: '40px' }} />

        {lists.length &&
          lists.map((post, i) => {
            return (
              <div key={i} className='post-card'>
                <h2>
                  <Link className='links' to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <Typography
                  variant='caption'
                  display='block'
                  gutterBottom
                  sx={{ color: '#2b003ds' }}
                >
                  Published on {post.date} by {post.author}
                </Typography>
                <hr />
                {/* <Markdown components={components}>text</Markdown> */}
                {/* <small><Link className="links" to={`/post/${post.id}`}>Read more</Link></small> */}
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

export default Home
