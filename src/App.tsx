import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import People from './pages/People'
import Planets from './pages/Planets'
import Starships from './pages/Starships'
import Detail from './components/Detail'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/people',
    element: <People />
  },
  {
    path: '/people/:id',
    element: <Detail />
  },
  {
    path: '/planets',
    element: <Planets />
  },
  {
    path: '/planets/:id',
    element: <Detail />
  },
  {
    path: '/starships',
    element: <Starships />
  },
  {
    path: '/starships/:id',
    element: <Detail />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Layout>{route.element}</Layout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
