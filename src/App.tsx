import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <h1>Home</h1>
  },
  {
    path: '/people',
    element: <h1>People</h1>
  },
  {
    path: '/people/:id',
    element: <h1>Person</h1>
  },
  {
    path: '/planets',
    element: <h1>Planets</h1>
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
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
