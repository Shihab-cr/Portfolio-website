
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './Home'
import ProjectDetails from './ProjectDetails'

function App() {

  return (
    <HashRouter>
      {/* <div className='max-w-4xl mr-auto ml-auto'> */}
      
        
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<ProjectDetails/>} path="/projects/:id"/>
        </Routes>
      {/* </div> */}
    </HashRouter>
  )
}

export default App
