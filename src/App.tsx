import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import People from './pages/People'
import Planets from './pages/Planets'

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
    element: <h1>Person</h1>
  },
  {
    path: '/planets',
    element: <Planets />
  },
  {
    path: '/planets/:id',
    element: <h1>Planet</h1>
  },
  {
    path: '/starships',
    element: <h1>Starships</h1>
  },
  {
    path: '/starships/:id',
    element: <h1>Starship</h1>
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
