"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, ExternalLink, FileText, Globe } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
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
    "अध्यक्ष - श्रीमान धूलजी भाई पंचाल",
    "महामंत्री - श्रीमान नटवरलालजी पंचाल",
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
      {/* <div className="bg-[#FFD700] text-[#B30000] text-center py-2">
        <p className="text-lg font-bold">जय श्री मां त्रिपुरा सुंदरी</p>
      </div> */}

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Temple Info */}


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
              Follow us
            </h4>
            <div className="space-y-3">
              <Link
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 text-sm group"
              >

              </Link>

              <div className="mt-6">
                <div className="flex space-x-4">

                  {/* Facebook */}
                  <Link
                    href="https://www.facebook.com/profile.php?id=61579670115975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                  >
                    <Facebook size={16} />
                  </Link>

                  {/* Instagram */}
                  <Link
                    href="https://www.instagram.com/maa_tripura_sunadari_mandir?igsh=M2VtbWt1NjlldzEz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                  >
                    <Instagram size={16} />
                  </Link>

                  {/* YouTube */}
                  <Link
                    href="https://m.youtube.com/@shreetripurasundari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                  >
                    <Youtube size={16} />
                  </Link>

                  {/* WhatsApp */}
                  <Link
                    href="https://whatsapp.com/channel/0029VaoNub9GU3BHZmvqjA00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFF4E6] hover:text-[#25D366] transition-colors duration-200 p-2 rounded-full border border-[#FFD700]/30 hover:border-[#25D366]"
                  >
                    {/* Lucide doesn't have WhatsApp → use text or custom icon */}
                    <FaWhatsapp size={16} />
                  </Link>

                </div>
              </div>
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
              <a
                href="tel:+918696851900"
                className="flex items-center space-x-3 hover:text-[#FFD700]"
              >
                <Phone className="text-[#FFD700] flex-shrink-0" size={18} />
                <span className="text-[#FFF4E6] text-sm">
                  +91 8696851900
                </span>
              </a>
              <a
                href="mailto:shreetripurasundarimandir@gmail.com"
                className="flex items-center space-x-3 hover:text-[#FFD700]"
              >
                <Mail className="text-[#FFD700] flex-shrink-0" size={18} />
                <span className="text-sm break-all">
                  shreetripurasundarimandir@gmail.com
                </span>
              </a>

              {/* Google Maps Link */}
              <div className="mt-4">
                <Link
                  href="https://www.google.com/maps/place/Maa+Tripura+Sundri+Temple/@23.5323482,74.321633,727m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3966da0646045a3d:0xe998c21391584afc!8m2!3d23.5323482!4d74.321633!16s%2Fg%2F1tfj1l4c?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"
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
