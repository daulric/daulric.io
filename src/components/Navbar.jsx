'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, Menu } from "lucide-react"
import NavLinks from "./navlinks.js"

const NavItem = ({ link, text, items, image, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (items) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between text-gray-200 hover:bg-gray-700 hover:text-white">
            <span className="flex items-center">
              {image && <Image src={image} alt="" width={24} height={24} className="mr-2" />}
              {text}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4">
          {items.map((item, index) => (
            <NavItem key={index} {...item} isMobile={isMobile} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link href={link} passHref>
      <Button variant="ghost" className="w-full justify-start text-gray-200 hover:bg-gray-700 hover:text-white">
        {image && <Image src={image} alt="" width={24} height={24} className="mr-2" />}
        {text}
      </Button>
    </Link>
  )
}

const Navbar = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-gray-800 border-r border-gray-800">
        <div className="p-4 border-b border-gray-700">
          <Link href="/" className="flex items-center py-4 px-2">
            {/* Add your logo here */}
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {NavLinks.map((nav, index) => (
            <NavItem key={index} {...nav} />
          ))}
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700 hover:text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-gray-800 border-r border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <Link href="/" className="flex items-center py-4 px-2">
              {/* Add your logo here */}
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {NavLinks.map((nav, index) => (
              <NavItem key={index} {...nav} isMobile={true} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-900">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Navbar