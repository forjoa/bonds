import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import {
  IconHome,
  IconHomeFilled,
  IconSearch,
  IconMessage,
  IconMessageFilled,
  IconBell,
  IconBellFilled,
  IconCirclePlus,
  IconCirclePlusFilled,
  IconLogout,
} from '@tabler/icons-react'
import '../styles/nav.css'
import { ReactNode } from 'react'

interface NavProps {
  children: ReactNode
}

export default function Nav({ children }: NavProps) {
  const { pathname } = useLocation()
  const navigation = useNavigate()

  const routes = [
    {
      icon: IconHome,
      iconSelected: IconHomeFilled,
      route: '/',
      name: 'Home',
    },
    {
      icon: IconSearch,
      iconSelected: IconSearch,
      route: '/search',
      name: 'Search',
    },
    {
      icon: IconMessage,
      iconSelected: IconMessageFilled,
      route: '/messages',
      name: 'Chat',
    },
    {
      icon: IconBell,
      iconSelected: IconBellFilled,
      route: '/notifications',
      name: 'Alerts',
    },
    {
      icon: IconCirclePlus,
      iconSelected: IconCirclePlusFilled,
      route: '/upload',
      name: 'Upload',
    },
  ]

  function logOut() {
    localStorage.removeItem('userbonds')
    navigation('/login')
  }

  return (
    <>
      <nav className='navigation-bar'>
        <div className='navigation-content'>
          <section className='title'>
            <img src='/icon.png' alt='Icon' />
            <h1>Bonds</h1>
          </section>
          <ul className='navigation-list'>
            {routes.map((route, index) => {
              return (
                <li key={index}>
                  <Link to={route.route}>
                    {pathname === route.route ? (
                      <>
                        <route.iconSelected size={30} />
                        <p>{route.name}</p>
                      </>
                    ) : (
                      <>
                        <route.icon size={30} />
                        <p>{route.name}</p>
                      </>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <button onClick={logOut}>
          <IconLogout size={40} />
        </button>
      </nav>
      {children}
    </>
  )
}
