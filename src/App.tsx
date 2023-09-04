import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Blog0 from './Pages/Blog0';
import Notfound from './Pages/Notfound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/404",
    element: <Notfound />,
  },
  {
    path: "/blog/event-loop-in-javascript",
    element: <Blog0 />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
