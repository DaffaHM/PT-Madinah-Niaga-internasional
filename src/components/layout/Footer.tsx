'use client'

import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Twitter,
  ArrowRight,
  Globe,
  Clock
} from 'lucide-react'

export default function Footer() {
  const services = [
    'Export Services',
    'Import Services', 
    'Trade Documentation',
    'Trade Finance',
    'Logistics Management',
    'Consultation'
  ]

  const quickLinks = [
    'Tentang Kami',
    'Layanan',
    'Produk',
    'Pasar Global',
    'Sertifikasi',
    'Karir',
    'Blog',
    'FAQ'
  ]

  const legalLinks = [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'Disclaimer'
  ]

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-navy-900 font-bold text-xl">GT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  GLOBAL<span className="text-gold-400">TRADE</span>
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Import • Export
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Mitra terpercaya untuk perdagangan internasional dengan 
              pengalaman 15+ tahun dan jaringan global yang luas.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Follow Us:</span>
              <div className="flex gap-2">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Layanan Kami</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hubungi Kami</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">
                    Jl. Sudirman No. 123<br />
                    Jakarta Pusat 10220<br />
                    Indonesia
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <a href="tel:+622112345678" className="text-gray-300 hover:text-gold-400 transition-colors">
                  +62 21 1234 5678
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <a href="mailto:info@globaltrade.co.id" className="text-gray-300 hover:text-gold-400 transition-colors">
                  info@globaltrade.co.id
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">24/7 Customer Support</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">
                Dapatkan update terbaru tentang perdagangan global
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email Anda"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
                />
                <button className="bg-gold-500 hover:bg-gold-600 px-4 py-2 rounded-lg transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 GlobalTrade. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link} className="flex items-center gap-6">
                  <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                    {link}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600">•</span>
                  )}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Globe className="w-4 h-4" />
              <span>Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}