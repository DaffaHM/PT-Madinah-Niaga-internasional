# GlobalTrade - International Trading Company Website

Website company profile modern dan profesional untuk perusahaan ekspor-impor menggunakan Next.js, React, dan Tailwind CSS.

## 🎨 Design System

### Color Palette
- **Navy**: `#0f172a` (navy-950) - Primary dark
- **Navy**: `#1e2a5e` (navy-900) - Primary
- **Gold**: `#f59e0b` (gold-500) - Accent primary
- **Orange**: `#f97316` (orange-500) - Accent secondary
- **White**: `#ffffff` - Background
- **Gray**: Various shades for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, navy-900
- **Body**: Regular, gray-600
- **Accents**: Gold/orange gradient

### Layout
- **Container**: Max-width 1320px (8xl)
- **Section Padding**: py-16 lg:py-24
- **Grid**: Responsive 2-3 column layouts
- **Spacing**: Consistent 4, 6, 8, 12, 16 scale

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── layout/
│   │   ├── TopBar.tsx       # Contact info & social media
│   │   ├── Navbar.tsx       # Navigation with logo & menu
│   │   └── Footer.tsx       # Footer with links & contact
│   └── sections/
│       ├── HeroSection.tsx      # Hero with diagonal layout
│       ├── CompanyOverview.tsx  # About company
│       ├── ServicesSection.tsx  # Services grid
│       ├── WhyChooseUs.tsx      # Advantages & certifications
│       ├── TradingCategories.tsx # Product categories
│       ├── GlobalCoverage.tsx   # Global network
│       ├── Certifications.tsx   # Legal compliance
│       └── CTASection.tsx       # Call to action
```

## 🎯 Key Features

### Hero Section
- **Split Layout**: Text kiri, gambar kanan
- **Diagonal Overlay**: Efek diagonal antara konten dan gambar
- **Responsive**: Mobile menjadi 1 kolom (teks atas, gambar bawah)
- **Animations**: Framer Motion untuk entrance effects
- **Stats**: Floating statistics cards
- **CTAs**: Primary dan secondary buttons

### Component Features
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth Framer Motion transitions
- **Icons**: Lucide React icon library
- **Cards**: Hover effects dengan shadow dan transform
- **Gradients**: Gold to orange accent gradients
- **Typography**: Consistent heading hierarchy

### Sections Overview

1. **TopBar**: Contact info, social media
2. **Navbar**: Logo, menu, CTA button
3. **Hero**: Split layout dengan diagonal effect
4. **Company Overview**: About dengan features grid
5. **Services**: 6 layanan utama dalam cards
6. **Why Choose Us**: Keunggulan dan sertifikasi
7. **Trading Categories**: 6 kategori produk dengan growth stats
8. **Global Coverage**: Peta jaringan global
9. **Certifications**: Sertifikasi dan legalitas
10. **CTA Section**: Contact methods dan final CTA
11. **Footer**: Comprehensive footer dengan newsletter

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development
```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) untuk melihat website.

## 📱 Responsive Behavior

### Desktop (1024px+)
- Hero: Split layout (text kiri, gambar kanan)
- Sections: 2-3 column grids
- Navigation: Horizontal menu
- Full diagonal effects

### Tablet (768px - 1023px)
- Hero: Tetap split tapi lebih compact
- Sections: 2 column grids
- Navigation: Horizontal dengan spacing lebih kecil

### Mobile (< 768px)
- Hero: 1 kolom (text atas, gambar bawah)
- Sections: 1 kolom stack
- Navigation: Hamburger menu
- Cards: Full width

## 🎨 Visual Design Guidelines

### Layout Principles
- **Whitespace**: Generous spacing untuk clean look
- **Hierarchy**: Clear visual hierarchy dengan typography
- **Alignment**: Consistent grid alignment
- **Balance**: Balanced composition dengan asymmetric elements

### Color Usage
- **Navy**: Headers, primary text, buttons
- **Gold/Orange**: Accents, highlights, CTAs
- **White**: Backgrounds, cards
- **Gray**: Secondary text, borders

### Animation Guidelines
- **Entrance**: Fade in dengan slight movement
- **Hover**: Scale, shadow, color transitions
- **Duration**: 300-500ms untuk smooth feel
- **Easing**: Ease-out untuk natural movement

## 🔧 Customization

### Colors
Edit `tailwind.config.js` untuk mengubah color palette:

```js
colors: {
  navy: {
    // Custom navy shades
  },
  gold: {
    // Custom gold shades
  }
}
```

### Components
Semua komponen menggunakan Tailwind classes dan dapat di-customize dengan mudah.

### Content
Edit file komponen untuk mengubah konten, gambar, dan teks.

## 📦 Dependencies

- **Next.js 14**: React framework
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **TypeScript**: Type safety

## 🌟 Next Steps

1. **Content**: Replace placeholder content dengan konten asli
2. **Images**: Ganti dengan gambar perusahaan yang sesuai
3. **SEO**: Tambahkan meta tags dan structured data
4. **Performance**: Optimize images dan lazy loading
5. **Analytics**: Integrate Google Analytics
6. **Forms**: Implement contact forms dengan backend
7. **CMS**: Consider headless CMS untuk content management

## 📄 License

This project is licensed under the MIT License.