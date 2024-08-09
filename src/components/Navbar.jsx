'use client'

import Link from 'next/link'
import { useState } from 'react'
import NavLinks from "./navlinks.js"
import Image from 'next/image'

function DropdownNav({ text, items, isOpen, toggleDropdown }) {
  return (
      <div>
          <button 
              onClick={toggleDropdown} 
              className="flex justify-between items-center w-full py-2 px-4 text-lg hover:bg-gray-800"
          >
              {text}
              <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
          </button>
          {isOpen && (
              <div className="pl-4">
                  {items.map((item, index) => (
                      <Link key={index} href={item.link} className="flex items-center py-2 px-4 text-lg hover:bg-gray-800">
                          {item.image && <Image src={item.image} alt="" className="mr-2" width={24} height={24} />}
                          {item.text}
                      </Link>
                  ))}
              </div>
          )}
      </div>
  )
}

function HandleNav({link, text, items, image, onClick}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (items) {
      return <DropdownNav 
          text={text} 
          items={items} 
          isOpen={dropdownOpen} 
          toggleDropdown={() => setDropdownOpen(!dropdownOpen)} 
      />
  }

  return (
      <div>
          <Link href={link} className="flex items-center py-2 px-4 text-lg hover:bg-gray-800" onClick={onClick}>
              {image && <Image src={image} alt="" className="mr-2" width={24} height={24} />}
              {text}
          </Link>
      </div>
  )
}

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex min-h-screen">
      {/* Side Navbar */}
      <nav className={`bg-gray-900 text-gray-100 w-64 fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-4">
          <Link href="/" className="flex items-center py-4 px-2">
            
          </Link>
        </div>
        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {NavLinks.map((nav, index) => (
            <HandleNav 
              key={index} 
              link={nav.link} 
              text={nav.text} 
              items={nav.items}
              image={nav.image}
              onClick={() => setIsOpen(false)} 
            />
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Toggle button for mobile */}
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Overlay for mobile */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Children content */}
        <div className="">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Navbar