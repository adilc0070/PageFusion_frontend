import { Route, Routes } from 'react-router-dom'
import AllRoutes from './Routes'

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<AllRoutes/>} />      
    </Routes>
  )
}

export default App