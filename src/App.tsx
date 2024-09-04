import { Route, Routes } from 'react-router-dom'
import AllRoutes from './Routes'
import { Provider } from 'react-redux';
import { store } from './store/store';
const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </Provider>
  )
}

export default App