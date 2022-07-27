import React,{ useState } from 'react'
import { useRoutes, Routes } from 'react-router-dom'

import routes from './routes'

import 'antd/dist/antd.min.css';


function App() {
  // const [count, setCount] = useState(0)
  const element = useRoutes(routes)

  return (
    <div className="App">
      { element }
    </div>
  )
}

export default App
