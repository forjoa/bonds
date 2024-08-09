import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
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

export default function Nav() {
  const { pathname } = useLocation()

  const routes = [
    {
      icon: IconHome,
      iconSelected: IconHomeFilled,
      route: '/',
    },
    {
      icon: IconSearch,
      iconSelected: IconSearch,
      route: '/search',
    },
    {
      icon: IconMessage,
      iconSelected: IconMessageFilled,
      route: '/messages',
    },
    {
      icon: IconBell,
      iconSelected: IconBellFilled,
      route: '/notifications',
    },
    {
      icon: IconCirclePlus,
      iconSelected: IconCirclePlusFilled,
      route: '/upload',
    },
  ]

  return (
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
                    <route.iconSelected size={40} />
                  ) : (
                    <route.icon size={40} />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <button>
        <IconLogout size={40} />
      </button>
    </nav>
  )
}
