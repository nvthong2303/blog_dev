import React from 'react'
import Layout from '../Layout/Layout';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom"
import Markdown from "react-markdown"
import test from '../Contents/testing.MD'

const useStyles = makeStyles({
    root: {
        marginTop: '60px',
        width: '100%',
        minHeight: '100vh',
        marginBottom: '0',
        padding: '24px',
        boxSizing: 'border-box',
    },
});

const lists = [
    // {
    //     id: 0,
    //     title: 'Test markdown',
    //     description: 'using template markdown',
    //     md_name: '../Contents/test.MD',
    //     author: 'thong.nguyen van',
    //     date: 'September 04, 2023',
    //     content: "\r\nHey Everyone! *My blog is better than Dave's.*\r\n\r\nYou may know me from my other blog, \"No Sleep Till Deployment\", which is all about my life as a senior developer at a large tech company.\r\n\r\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/OH35UAqHLi0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    // },
    {
        id: 'event-loop-in-javascript',
        title: 'Event Loop trong JavaScript - Cách JavaScript xử lý bất đồng bộ',
        description: 'Một trong những điều quan trọng mà các lập trình viên JavaScript cần phải nắm được, mặc dù không dễ để tiếp cận thông qua lý thuyết hay những đoạn code, nhưng dễ hiểu hơn khi mô tả hoạt động của nó thông qua hình ảnh',
        md_name: '../Contents/eventloop.MD',
        author: 'thong.nguyen van',
        date: 'September 04, 2023',
        content: "\r\nHey Everyone! *My blog is better than Dave's.*\r\n\r\nYou may know me from my other blog, \"No Sleep Till Deployment\", which is all about my life as a senior developer at a large tech company.\r\n\r\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/OH35UAqHLi0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
    }
]

interface VideoProps {
    src?: string;
}

const components = {
    video: ({ src }: VideoProps) => <video src={src} />
};

function Home() {
    const classes = useStyles();

    const excerptList = lists.map(post => {
        return post.content.split(" ").slice(0, 20).join(" ") + "..."
    })

    return (
        <Layout>
            <div className={classes.root}>
                <Typography variant="h5" gutterBottom>
                    Hi.
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    Chào mừng các bạn đến với 1 Blog phủ bụi, cỏ mọc um tùm của mình. Mình tạo ra trang Blog này với mục đích chính
                    là để học tập và chia sẻ, hy vọng các bạn sẽ tìm kiếm được 1 điều gì đó ở đây. Mình là Thông, cựu sinh viên CNTT
                    Bách Khoa Hà Nội (K63), hiện đang là một kỹ sư phần mềm, rất vui được các bạn ghé thăm.
                </Typography>
                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '24px' }}>
                    Thật ra đây toàn là những thứ mà nhiều người đã viết, nhưng mình vẫn muốn viết lại (để ôn tập lại hoặc trong lúc
                    tự học một thứ mới mẻ gì đó) một cách dễ hiểu hơn cho các bạn mới bắt đầu lập trình có thể tham khảo, các chủ để của mình thường
                    thì sẽ xoay quanh JavaScript, Golang, một chút devOps (mình đang tự học cái này 😅😅😅) và vài chủ đề khác, dĩ
                    nhiên là đều ở mức cơ bản thôi, mọi người đọc và cho mình xin góp ý để chúng ta cùng cải thiện, mình cảm ơn.
                </Typography>

                <hr style={{ marginTop: '40px' }} />

                {lists.length &&
                    lists.map((post, i) => {
                        return (
                            <div key={i} className="post-card">
                                <h2><Link className="links" to={`/blog/${post.id}`}>{post.title}</Link></h2>
                                <Typography variant="caption" display="block" gutterBottom sx={{ color: '#2b003ds' }}>Published on {post.date} by {post.author}</Typography>
                                <hr />
                                {/* <Markdown components={components}>text</Markdown> */}
                                {/* <small><Link className="links" to={`/post/${post.id}`}>Read more</Link></small> */}
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export default Home
