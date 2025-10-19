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

      // Update active section based on scroll position
      const sections = [
        "home",
        "darshan-live",
        "about-mandir",
        "temple-timings",
        "shringar-schedule",
        "temple-history",
        "pujas",
        "panchal-samaj",
        "trust-management",
        "notice-portal",
        "services",
        "events",
        "vip-visitors",
        "contact",
      ]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mandirItems = [
    { name: "About the Mandir", href: "#about-mandir", id: "about-mandir" },
    { name: "Live Darshan", href: "#darshan-live", id: "darshan-live" },
    { name: "Temple Timings", href: "#temple-timings", id: "temple-timings" },
    { name: "Maa ke Swaroop (Daily Dress)", href: "#shringar-schedule", id: "shringar-schedule" },
    { name: "History & Architecture", href: "#temple-history", id: "temple-history" },
    { name: "Online Pujas & Donations", href: "#pujas", id: "pujas" },
    { name: "Photo Gallery & Events", href: "#events", id: "events" },
    { name: "VIP Visitors & Testimonials", href: "#vip-visitors", id: "vip-visitors" },
    { name: "Trust & Management", href: "#trust-management", id: "trust-management" },
    { name: "Location & Contact", href: "#contact", id: "contact" },
  ]

  const samajItems = [
    { name: "About Panchal Samaj", href: "#panchal-samaj", id: "panchal-samaj" },
    { name: "Community Services", href: "#services", id: "services" },
    { name: "Notice Portal & Press Release", href: "#notice-portal", id: "notice-portal" },
    { name: "Matrimonial Platform", href: "https://matrimony.shreetripurasundari.com/", external: true },
    { name: "Business Directory", href: "#services", id: "services" },
    { name: "Member Registration", href: "#services", id: "services" },
  ]

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  const handleLinkClick = (href: string, external?: boolean) => {
    setIsMobileMenuOpen(false)
    closeDropdowns()

    if (external) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }

    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80 // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false)
    closeDropdowns()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#B30000] shadow-lg" : "bg-gradient-to-r from-[#B30000]/90 to-[#FF6B00]/90 backdrop-blur-sm"
      }`}
    >
      {/* Tagline Bar */}
      <div className="bg-[#FFD700] text-[#B30000] text-center py-1">
        <p className="text-sm font-bold">जय श्री मां त्रिपुरा सुंदरी</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <Image
                src="/images/main-logo.png"
                alt="Tripura Sundari Mandir Logo"
                width={45}
                height={45}
                className="rounded-full border-2 border-[#FFD700] transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="text-white">
              <h1 className="text-lg font-bold">Shree Tripura Sundari Mandir</h1>
              <p className="text-xs text-[#FFD700]">Panchal Samaj 14 Chokhra</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Mandir Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle("mandir")}
                className={`flex items-center space-x-1 hover:text-[#FFD700] transition-colors duration-200 font-medium py-2 ${
                  mandirItems.some((item) => item.id === activeSection) ? "text-[#FFD700]" : "text-white"
                }`}
              >
                <span>Shree Tripura Sundari Mandir</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${activeDropdown === "mandir" ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mandir Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#FF6B00] transition-all duration-300 ${
                  activeDropdown === "mandir"
                    ? "opacity-100 visible transform translate-y-0"
                    : "opacity-0 invisible transform -translate-y-2"
                }`}
              >
                <div className="py-2 max-h-96 overflow-y-auto">
                  {/* Header */}
                  <div className="px-4 py-2 bg-[#FFF4E6] border-b border-[#FF6B00]/30">
                    <h3 className="font-bold text-[#B30000] text-sm">Temple Sections</h3>
                  </div>
                  {mandirItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(item.href)}
                      className={`block w-full text-left px-4 py-3 hover:bg-[#FFF4E6] hover:text-[#FF6B00] transition-colors duration-200 border-b border-[#FFF4E6] last:border-b-0 ${
                        activeSection === item.id ? "bg-[#FFF4E6] text-[#FF6B00] font-medium" : "text-[#B30000]"
                      }`}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      {activeSection === item.id && (
                        <span className="text-xs text-[#FF6B00] block">Currently viewing</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Samaj Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle("samaj")}
                className={`flex items-center space-x-1 hover:text-[#FFD700] transition-colors duration-200 font-medium py-2 ${
                  samajItems.some((item) => item.id === activeSection) ? "text-[#FFD700]" : "text-white"
                }`}
              >
                <span>Panchal Samaj 14 Chokhra</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${activeDropdown === "samaj" ? "rotate-180" : ""}`}
                />
              </button>

              {/* Samaj Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-[#FF6B00] transition-all duration-300 ${
                  activeDropdown === "samaj"
                    ? "opacity-100 visible transform translate-y-0"
                    : "opacity-0 invisible transform -translate-y-2"
                }`}
              >
                <div className="py-2">
                  {/* Header */}
                  <div className="px-4 py-2 bg-[#FFF4E6] border-b border-[#FF6B00]/30">
                    <h3 className="font-bold text-[#B30000] text-sm">Community Sections</h3>
                  </div>
                  {samajItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(item.href, item.external)}
                      className={`block w-full text-left px-4 py-3 hover:bg-[#FFF4E6] hover:text-[#FF6B00] transition-colors duration-200 border-b border-[#FFF4E6] last:border-b-0 ${
                        activeSection === item.id ? "bg-[#FFF4E6] text-[#FF6B00] font-medium" : "text-[#B30000]"
                      }`}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.external && <span className="text-xs text-gray-500 ml-1">↗</span>}
                      {activeSection === item.id && !item.external && (
                        <span className="text-xs text-[#FF6B00] block">Currently viewing</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 bg-[#B30000]/95 rounded-b-lg">
            {/* Mobile Mandir Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle("mobile-mandir")}
                className="flex items-center justify-between w-full px-4 py-3 text-white font-medium hover:bg-white/10 transition-colors duration-200 touch-manipulation"
              >
                <span>Shree Tripura Sundari Mandir</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "mobile-mandir" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeDropdown === "mobile-mandir" ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="bg-white/10 mx-4 rounded-lg">
                  {mandirItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(item.href)}
                      className={`block w-full text-left px-4 py-3 hover:text-white transition-colors duration-200 border-b border-white/10 last:border-b-0 touch-manipulation ${
                        activeSection === item.id ? "text-white font-medium" : "text-[#FFD700]"
                      }`}
                    >
                      <span className="text-sm">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Samaj Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle("mobile-samaj")}
                className="flex items-center justify-between w-full px-4 py-3 text-white font-medium hover:bg-white/10 transition-colors duration-200 touch-manipulation"
              >
                <span>Panchal Samaj 14 Chokhra</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeDropdown === "mobile-samaj" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeDropdown === "mobile-samaj" ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="bg-white/10 mx-4 rounded-lg">
                  {samajItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLinkClick(item.href, item.external)}
                      className={`block w-full text-left px-4 py-3 hover:text-white transition-colors duration-200 border-b border-white/10 last:border-b-0 touch-manipulation ${
                        activeSection === item.id ? "text-white font-medium" : "text-[#FFD700]"
                      }`}
                    >
                      <span className="text-sm">{item.name}</span>
                      {item.external && <span className="text-xs ml-1">↗</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && <div className="fixed inset-0 z-40" onClick={closeDropdowns} />}
    </header>
  )
}
