'use client'

import Link from 'next/link'
import { useState } from 'react'

function HandleNav({link, text, hidden}) {
    if (hidden === true) {
      return <Link href={link} className="block py-2 px-4 text-sm hover:bg-gray-800">{text}</Link>
    }

    return (
      <Link href={link} className="py-4 px-2 text-gray-300 hover:text-white transition duration-300">{text}</Link>
    )
}

const Navbar = (props) => {
  const NavLinks = props.items ||  [
    { text: "Home", link: "/" },
    { text: "Blog", link: "/blog" }
  ]

  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-100 text-lg">daulric</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {
                NavLinks.map((nav, index) => {
                  return (
                    <HandleNav link={nav.link} text={nav.text} key={index} />
                  )
                })
              }
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-gray-300 hover:text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        {
          NavLinks.map((nav, index) => {
            return (
              <HandleNav link={nav.link} text={nav.text} hidden key={index} />
            )
          })
        }
      </div>
    </nav>
  )
}

export default Navbar