import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/pages/Home'
import Search from './components/pages/Search'
import Messages from './components/pages/Messages'
import Notifications from './components/pages/Notifications'
import Upload from './components/pages/Upload'
import Login from './components/pages/Login'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import { Toaster } from 'sonner'

function App() {
  return (
    <Router>
      <Toaster position='bottom-right' />
      <Nav>
        <Routes>
          {/* protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/upload' element={<Upload />} />
          </Route>

          {/* public routes */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Nav>
    </Router>
  )
}

export default App
