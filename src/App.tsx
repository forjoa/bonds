import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/pages/Home'
import Search from './components/pages/Search'
import Messages from './components/pages/Messages'
import Notifications from './components/pages/Notifications'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/notifications' element={<Notifications />} />
      </Routes>
    </Router>
  )
}

export default App
