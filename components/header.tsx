"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

type MenuItem = { name: string; href: string }

/* ------------------ Menus ------------------ */
const templeMenu: MenuItem[] = [
  { name: "About", href: "/about" },
  { name: "History", href: "/history" },
  { name: "Trust Mandal", href: "/trust-mandal" },
  { name: "Contact", href: "/contact" },
  { name: "Events", href: "/events" },
  { name: "Festivals", href: "/festivals" },
  { name: "Panchal Samaj", href: "/about-panchal-samaj" },
]

const mediaMenu: MenuItem[] = [
  { name: "Gallery", href: "/temple-images" },
  { name: "Blog", href: "/blog" },
  { name: "Press Release", href: "/press-release" },
  { name: "Media Handlers", href: "/media-handlers" },
  { name: "FAQ’S", href: "/faq" },
]

const serviceMenu: MenuItem[] = [
  { name: "E-Store", href: "/estore" },
  { name: "Donation", href: "/donation" },
  { name: "Book Shringar", href: "/shringar" },
  { name: "Grievance Redressal", href: "/grievance" },
]

const visitorsMenu: MenuItem[] = [
  { name: "Recent Visits", href: "/vip-visitors-all" },
  { name: "About Banswara", href: "/about-banswara" },
  { name: "About Rajasthan", href: "/about-rajasthan" },
]

const dropdowns: { id: string; label: string; items: MenuItem[] }[] = [
  { id: "temple", label: "Temple", items: templeMenu },
  { id: "media", label: "Media", items: mediaMenu },
  { id: "services", label: "Services", items: serviceMenu },
  { id: "visitors", label: "Visitors", items: visitorsMenu },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close an open dropdown on outside click or Escape
  useEffect(() => {
    if (!activeDropdown) return
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDropdown(null)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [activeDropdown])

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-2 border-[#FFD700]/60 ${
        isScrolled ? "bg-[#8F0000] shadow-lg shadow-black/30" : "bg-gradient-to-r from-[#7A0000] via-[#B30000] to-[#D95500]"
      }`}
    >
      {/* Top Tagline */}
      <div className="bg-gradient-to-r from-[#E0A100] via-[#FFE27A] to-[#E0A100] text-center py-1 text-[#6B0000] text-sm font-display tracking-wide">
        ॥ जय श्री माँ त्रिपुरा सुंदरी ॥
      </div>

      <div className="site-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" onClick={closeMenus} className="flex items-center gap-2 text-white">
            <Image
              src="/images/main-logo.png"
              alt="श्री त्रिपुरा सुंदरी मंदिर"
              width={40}
              height={40}
              priority
              className="rounded-full ring-2 ring-[#FFD700]/70"
            />
            <span className="font-display text-lg sm:text-xl">श्री त्रिपुरा सुंदरी मंदिर</span>
          </Link>

          {/* Desktop Nav — every destination is a real link, so right-click / Ctrl+click / middle-click can open it in a new tab */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-10 text-white font-medium tracking-wide">
            <Link href="/" onClick={closeMenus} className="hover:text-[#FFD700] transition">
              Home
            </Link>

            {dropdowns.map((menu) => (
              <div key={menu.id} className="relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === menu.id}
                  onClick={() => setActiveDropdown(activeDropdown === menu.id ? null : menu.id)}
                  className="flex items-center gap-1 cursor-pointer hover:text-[#FFD700] transition"
                >
                  {menu.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${activeDropdown === menu.id ? "rotate-180" : ""}`}
                  />
                </button>

                {activeDropdown === menu.id && (
                  <div className="absolute mt-3 w-56 bg-white rounded-lg shadow-xl p-2 animate-fade-in">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className="block w-full text-left text-gray-700 px-3 py-2 rounded-lg hover:bg-[#FFF4E6] hover:text-[#B30000] transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)} />

            <div className="absolute left-0 top-0 h-full w-72 bg-[#B30000] text-white p-5 overflow-y-auto shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button type="button" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <Link href="/" onClick={closeMenus} className="block text-left text-white text-base">
                  Home
                </Link>

                {dropdowns.map((menu) => (
                  <div key={menu.id}>
                    <h3 className="text-[#FFD700] font-semibold mb-2">{menu.label}</h3>
                    <div className="pl-2 space-y-1">
                      {menu.items.map((item) => (
                        <Link key={item.href} href={item.href} onClick={closeMenus} className="block text-sm w-full text-left py-1">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
