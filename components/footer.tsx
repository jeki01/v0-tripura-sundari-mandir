"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ExternalLink, FileText, Globe } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    "About Mandir",
    "Live Darshan",
    "Online Pujas",
    "Donations",
    "Services",
    "Events",
    "VIP Visitors",
    "Contact",
  ]

  const trustMandal = [
    "श्रीमान धूलजी भाई पंचाल - अध्यक्ष",
    "श्रीमान नटवरलालजी पंचाल - महामंत्री",
    "Panchal Samaj 14 Chokhra",
    "Banswara, Dungarpur, Pratapgarh, Udaipur",
  ]

  return (
    <footer className="relative bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white overflow-hidden">
      {/* Temple Silhouette Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
        <Image
          src="/images/footer-silhouette.png"
          alt="Temple Silhouette"
          fill
          className="object-cover object-bottom"
        />
      </div>

      {/* Tagline at top */}
      <div className="bg-[#FFD700] text-[#B30000] text-center py-2">
        <p className="text-lg font-bold">जय श्री मां त्रिपुरा सुंदरी</p>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Temple Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Image
                  src="/images/main-logo.png"
                  alt="Tripura Sundari Mandir Logo"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-[#FFD700]"
                />
                <div className="absolute -inset-1 border border-[#FFD700] rounded-full opacity-50 animate-spin-slow"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Shree Tripura Sundari Mandir</h3>
                <p className="text-[#FFD700] text-sm">Panchal Samaj 14 Chokhra</p>
              </div>
            </div>
            <p className="text-[#FFF4E6] mb-4 leading-relaxed">
              One of the 51 sacred Shakti Peethas, connecting devotion with technology, serving our community with
              traditional values and modern convenience.
            </p>
            <div className="text-center text-[#FFD700] font-bold text-lg">समर्पण • सेवा • संकल्प</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 text-sm flex items-center"
                  >
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-2"></div>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Mandal */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FFD700]">Trust Mandal</h4>
            <ul className="space-y-2">
              {trustMandal.map((member, index) => (
                <li key={member} className={`text-[#FFF4E6] text-sm ${index < 2 ? "font-medium" : ""}`}>
                  {member}
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Tools - NEW SECTION */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FFD700] flex items-center">
              <FileText className="mr-2" size={20} />
              SEO Tools
            </h4>
            <div className="space-y-3">
              <Link
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 text-sm group"
              >
                <Globe className="mr-2 text-[#FFD700] group-hover:scale-110 transition-transform" size={16} />
                <span>XML Sitemap</span>
                <ExternalLink className="ml-1" size={12} />
              </Link>
            </div>
          </div>

          {/* Contact Info & Location */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FFD700]">Location & Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-[#FFD700] mt-1" size={18} />
                <div>
                  <span className="text-[#FFF4E6] text-sm font-medium block">Maa Tripura Sundari Temple</span>
                  <span className="text-[#FFF4E6] text-sm">Near Umrai Village, Banswara</span>
                  <span className="text-[#FFF4E6] text-sm block">Rajasthan – 327001</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-[#FFD700]" size={18} />
                <span className="text-[#FFF4E6] text-sm">+91 79 2550 1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-[#FFD700]" size={18} />
                <span className="text-[#FFF4E6] text-sm">info@tripurasundari.org</span>
              </div>

              {/* Google Maps Link */}
              <div className="mt-4">
                <Link
                  href="https://g.co/kgs/ZEUPnyR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#FFD700] hover:text-white transition-colors duration-200 text-sm font-medium bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20"
                >
                  <MapPin className="mr-2" size={16} />
                  View on Google Maps
                  <ExternalLink className="ml-1" size={12} />
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-bold text-[#FFD700] mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                >
                  <Facebook size={16} />
                </Link>
                <Link
                  href="#"
                  className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                >
                  <Twitter size={16} />
                </Link>
                <Link
                  href="#"
                  className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                >
                  <Instagram size={16} />
                </Link>
                <Link
                  href="#"
                  className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                >
                  <Youtube size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#FFD700] mt-8 pt-8">
          <div className="text-center">
            <p className="text-[#FFF4E6] text-sm mb-4">
              &copy; {new Date().getFullYear()} Shree Tripura Sundari Mandir & Panchal Samaj. All rights reserved.
            </p>
            <p className="text-[#FFD700] text-sm">माँ त्रिपुरा सुंदरी की जय</p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#FFD700]"></div>
    </footer>
  )
}
