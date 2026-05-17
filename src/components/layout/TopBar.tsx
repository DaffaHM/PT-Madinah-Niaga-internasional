'use client'

import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-navy-950 text-white py-2 text-sm hidden lg:block">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+62 21 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@globaltrade.co.id</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="flex items-center gap-1">
            <span className="mr-2 text-gray-300">Follow Us:</span>
            <a href="#" className="p-1 hover:text-gold-400 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-1 hover:text-gold-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-1 hover:text-gold-400 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-1 hover:text-gold-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}