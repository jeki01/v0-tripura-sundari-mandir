"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const templeMenu = [
    { name: "History", href: "/history" },
    { name: "Trust Mandal", href: "/trust-mandal" },
    { name: "Contact", href: "/contact" },
    { name: "Events", href: "/events" },
    { name: "Festivals", href: "/festivals" },
    { name: "Panchal Samaj", href: "/about-panchal-samaj" },
  ]

  const mediaMenu = [
    { name: "Gallery", href: "/temple-images" },
    { name: "Blog", href: "/blog" },
    { name: "Press Release", href: "/press-release" },
    { name: "Media Handlers", href: "/media-handlers" },
    { name: "FAQ’S", href: "/faq" },
  ]

  const serviceMenu = [
    { name: "E-Store", href: "/estore" },
    { name: "Donation", href: "/donation" },
    { name: "Book Shringar", href: "/shringar" },
  ]

  const visitorsMenu = [
    { name: "Recent Visits", href: "/vip-visitors-all" },
    { name: "About Banswara", href: "/about-banswara" },
    { name: "About Rajasthan", href: "/about-rajasthan" },
  ]

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const handleRoute = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition ${isScrolled ? "bg-[#B30000]" : "bg-gradient-to-r from-[#B30000]/90 to-[#FF6B00]/90"}`}>

      {/* Tagline */}
      <div className="bg-[#FFD700] text-center py-1 text-[#B30000] text-sm font-bold">
        जय श्री मां त्रिपुरा सुंदरी
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            className="flex items-center gap-2 text-white cursor-pointer"
            onClick={() => handleRoute("/")}
          >
            <Image src="/images/main-logo.png" alt="logo" width={40} height={40} />
            <span className="font-bold">श्री त्रिपुरा सुंदरी मंदिर</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-white">

            {/* Home */}
            <button onClick={() => handleRoute("/")} className="cursor-pointer">
              Home
            </button>

            {/* Temple Dropdown */}
            <div className="relative cursor-pointer">
              <button onClick={() => handleDropdownToggle("temple")} className="flex items-center gap-1">
                Temple <ChevronDown size={16} />
              </button>

              {activeDropdown === "temple" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {templeMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 hover:text-[#FF6B00] py-1 cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Media Dropdown */}
            <div className="relative cursor-pointer">
              <button onClick={() => handleDropdownToggle("media")} className="flex items-center gap-1">
                Media <ChevronDown size={16} />
              </button>

              {activeDropdown === "media" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {mediaMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 hover:text-[#FF6B00] py-1 cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative cursor-pointer">
              <button onClick={() => handleDropdownToggle("services")} className="flex items-center gap-1">
                Services <ChevronDown size={16} />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {serviceMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 hover:text-[#FF6B00] py-1 cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Visitors Dropdown */}
            <div className="relative cursor-pointer">
              <button onClick={() => handleDropdownToggle("visitors")} className="flex items-center gap-1">
                Visitors <ChevronDown size={16} />
              </button>

              {activeDropdown === "visitors" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {visitorsMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 hover:text-[#FF6B00] py-1 cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">

            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="absolute left-0 top-0 h-full w-72 bg-[#B30000] text-white p-5 overflow-y-auto shadow-xl">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <button onClick={() => handleRoute("/")} className="block text-left text-white text-base">
                  Home
                </button>

                {/* Temple - Mobile */}
                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Temple</h3>
                  <div className="pl-2 space-y-1">
                    {templeMenu.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleRoute(item.href)}
                        className="block text-sm w-full text-left py-1"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Media - Mobile */}
                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Media</h3>
                  <div className="pl-2 space-y-1">
                    {mediaMenu.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleRoute(item.href)}
                        className="block text-sm w-full text-left py-1"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services - Mobile */}
                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Services</h3>
                  <div className="pl-2 space-y-1">
                    {serviceMenu.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleRoute(item.href)}
                        className="block text-sm w-full text-left py-1"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visitors - Mobile */}
                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Visitors</h3>
                  <div className="pl-2 space-y-1">
                    {visitorsMenu.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleRoute(item.href)}
                        className="block text-sm w-full text-left py-1"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {activeDropdown && <div className="fixed inset-0" onClick={() => setActiveDropdown(null)} />}
    </header>
  )
}