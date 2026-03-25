"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = [
        "home",
        "temple-history",
        "festivals",
        "events",
        "gallery",
        "blog",
        "press-release",
        "media-handlers",
        "dharamshala",
        "food",
        "estore",
        "contact",
      ]

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ Menus
  const templeMenu = [
    { name: "Temple History ", href: "#temple-history", id: "temple-history" },
    { name: "Festivals", href: "#festivals", id: "festivals" },
    { name: "Events", href: "#events", id: "events" },
    { name: "Temple Timings", href: "#Timings", id: "Timings" },
  ]

  const mediaMenu = [
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Blog", href: "#blog", id: "blog" },
    { name: "Press Release", href: "#press-release", id: "press-release" },
    { name: "Media Handlers", href: "#media-handlers", id: "media-handlers" },
    { name: "FAQ'S", href: "#faqs", id: "faq" },
  ]

  const serviceMenu = [
    { name: "Dharamshala", href: "#dharamshala", id: "dharamshala" },
    { name: "Food & Restaurants", href: "#food", id: "food" },
    { name: "E-Store", href: "#estore", id: "estore" },
    { name: "Contact", href: "#contact", id: "contact" },
    { name: "Donation", href: "#donation", id: "donation" },
    { name: "Maa Shringar", href: "#shringar", id: "shringar" },
  ]

  const handleDropdownToggle = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const closeDropdowns = () => setActiveDropdown(null)

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    closeDropdowns()

    const el = document.querySelector(href)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition ${isScrolled ? "bg-[#B30000]" : "bg-gradient-to-r from-[#B30000]/90 to-[#FF6B00]/90"}`}>

      {/* Top Tagline */}
      <div className="bg-[#FFD700] text-center py-1 text-[#B30000] text-sm font-bold">
        जय श्री मां त्रिपुरा सुंदरी
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => handleLinkClick("#home")}>
            <Image src="/images/main-logo.png" alt="logo" width={40} height={40} />
            <span className="font-bold">श्री त्रिपुरा सुंदरी मंदिर</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-white">

            {/* Home */}
            <button
              onClick={() => handleLinkClick("#home")}
              className={activeSection === "home" ? "text-[#FFD700]" : ""}
            >
              Home
            </button>

            {/* Temple */}
            <div className="relative">
              <button onClick={() => handleDropdownToggle("temple")} className="flex items-center gap-1">
                Temple <ChevronDown size={16} />
              </button>

              {activeDropdown === "temple" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {templeMenu.map((item, i) => (
                    <button key={i} onClick={() => handleLinkClick(item.href)} className="block w-full text-left text-sm text-gray-700 hover:text-[#FF6B00] py-1">
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Media */}
            <div className="relative">
              <button onClick={() => handleDropdownToggle("media")} className="flex items-center gap-1">
                Media <ChevronDown size={16} />
              </button>

              {activeDropdown === "media" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {mediaMenu.map((item, i) => (
                    <button key={i} onClick={() => handleLinkClick(item.href)} className="block w-full text-left text-sm text-gray-700 hover:text-[#FF6B00] py-1">
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div className="relative">
              <button onClick={() => handleDropdownToggle("services")} className="flex items-center gap-1">
                Services <ChevronDown size={16} />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute mt-4 w-56 bg-white rounded-lg shadow-lg p-4">
                  {serviceMenu.map((item, i) => (
                    <button key={i} onClick={() => handleLinkClick(item.href)} className="block w-full text-left text-sm text-gray-700 hover:text-[#FF6B00] py-1">
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* Mobile Button */}
          <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#B30000] text-white p-4 space-y-4">

            <button onClick={() => handleLinkClick("#home")}>Home</button>

            <div>
              <h3 className="text-[#FFD700] font-bold">Temple</h3>
              {templeMenu.map((item, i) => (
                <button key={i} onClick={() => handleLinkClick(item.href)} className="block text-sm py-1">
                  {item.name}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-[#FFD700] font-bold">Media</h3>
              {mediaMenu.map((item, i) => (
                <button key={i} onClick={() => handleLinkClick(item.href)} className="block text-sm py-1">
                  {item.name}
                </button>
              ))}
            </div>

            <div>
              <h3 className="text-[#FFD700] font-bold">Services</h3>
              {serviceMenu.map((item, i) => (
                <button key={i} onClick={() => handleLinkClick(item.href)} className="block text-sm py-1">
                  {item.name}
                </button>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* Overlay */}
      {activeDropdown && <div className="fixed inset-0" onClick={closeDropdowns} />}
    </header>
  )
}

