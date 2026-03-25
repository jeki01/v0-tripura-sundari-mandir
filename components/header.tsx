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

  /* ------------------ Menus ------------------ */
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

  /* ------------------ Utility Functions ------------------ */

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

      {/* Top Tagline */}
      <div className="bg-[#FFD700] text-center py-1 text-[#B30000] text-sm font-bold">
        जय श्री मां त्रिपुरा सुंदरी
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.18s ease-out;
          }
        `}
      </style>

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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-white">

            {/* Home */}
            <button
              onClick={() => handleRoute("/")}
              className="cursor-pointer hover:text-[#FFD700] transition"
            >
              Home
            </button>

            {/* ---------- DROPDOWN TEMPLATE ---------- */}
            {/* Temple */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("temple")}
                className="flex items-center gap-1 cursor-pointer hover:text-[#FFD700] transition"
              >
                Temple <ChevronDown size={16} />
              </button>

              {activeDropdown === "temple" && (
                <div className="absolute mt-3 w-56 bg-white rounded-lg shadow-xl p-4 pointer-events-auto animate-fade-in">
                  {templeMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 py-2 rounded-lg
                                 hover:bg-[#FFF4E6] hover:text-[#B30000] cursor-pointer transition"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Media */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("media")}
                className="flex items-center gap-1 cursor-pointer hover:text-[#FFD700] transition"
              >
                Media <ChevronDown size={16} />
              </button>

              {activeDropdown === "media" && (
                <div className="absolute mt-3 w-56 bg-white rounded-lg shadow-xl p-4 pointer-events-auto animate-fade-in">
                  {mediaMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 py-2 rounded-lg hover:bg-[#FFF4E6] hover:text-[#B30000] cursor-pointer transition"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("services")}
                className="flex items-center gap-1 cursor-pointer hover:text-[#FFD700] transition"
              >
                Services <ChevronDown size={16} />
              </button>

              {activeDropdown === "services" && (
                <div className="absolute mt-3 w-56 bg-white rounded-lg shadow-xl p-4 pointer-events-auto animate-fade-in">
                  {serviceMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 py-2 rounded-lg hover:bg-[#FFF4E6] hover:text-[#B30000] cursor-pointer transition"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Visitors */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("visitors")}
                className="flex items-center gap-1 cursor-pointer hover:text-[#FFD700] transition"
              >
                Visitors <ChevronDown size={16} />
              </button>

              {activeDropdown === "visitors" && (
                <div className="absolute mt-3 w-56 bg-white rounded-lg shadow-xl p-4 pointer-events-auto animate-fade-in">
                  {visitorsMenu.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleRoute(item.href)}
                      className="block w-full text-left text-gray-700 py-2 rounded-lg hover:bg-[#FFF4E6] hover:text-[#B30000] cursor-pointer transition"
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

        {/* ================= MOBILE SIDEBAR ================= */}
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

                {/* Mobile Menu Sections */}
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

                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Media</h3>
                  <div className="pl-2 space-y-1">
                    {mediaMenu.map((item, i) => (
                      <button key={i} onClick={() => handleRoute(item.href)} className="block text-sm w-full text-left py-1">
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Services</h3>
                  <div className="pl-2 space-y-1">
                    {serviceMenu.map((item, i) => (
                      <button key={i} onClick={() => handleRoute(item.href)} className="block text-sm w-full text-left py-1">
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[#FFD700] font-semibold mb-2">Visitors</h3>
                  <div className="pl-2 space-y-1">
                    {visitorsMenu.map((item, i) => (
                      <button key={i} onClick={() => handleRoute(item.href)} className="block text-sm w-full text-left py-1">
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

      {/* Non-blocking Overlay */}
      {activeDropdown && (
        <div
          className="fixed inset-0 pointer-events-none"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  )
}