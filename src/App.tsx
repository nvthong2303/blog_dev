import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Blog0 from './Pages/Blog0'
import Notfound from './Pages/Notfound'
import Blog1 from './Pages/Blog1.indexSql'
import Blog2 from './Pages/Blog2.multithreadPython'
import Blog3 from './Pages/Blog3.python1'
import Blog4 from './Pages/Blog4.python2'
import Blog5 from './Pages/Blog5.python3'
import Blog6 from './Pages/Blog6.python4'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/404',
    element: <Notfound />
  },
  {
    path: '/blog/event-loop-in-javascript',
    element: <Blog0 />
  },
  {
    path: '/blog/index-sql-part1',
    element: <Blog1 />
  },
  {
    path: '/blog/multithread-python',
    element: <Blog2 />
  },
  {
    path: '/blog/learn-python-part1',
    element: <Blog3 />
  },
  {
    path: '/blog/learn-python-part2',
    element: <Blog4 />
  },
  {
    path: '/blog/learn-python-part3',
    element: <Blog5 />
  },
  {
    path: '/blog/learn-python-part4',
    element: <Blog6 />
  }
])

function App () {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
