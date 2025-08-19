# The Restaurant Website

A modern, responsive website for Restaurant built with Angular 17+ and TypeScript.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with deep red (#8B0000) and cream (#F5F5DC) color scheme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Complete Navigation**: Home, Menu, About, Gallery, Contact, Reviews, and Online Ordering
- **Interactive Gallery**: Photo gallery with category filtering and lightbox modal
- **Online Ordering**: Cart functionality with pickup/delivery options
- **Customer Reviews**: Rating system with verified customer testimonials
- **Contact Forms**: Reservation and contact forms with validation
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Facebook Integration**: Ready for Facebook feed integration

## 🛠️ Technology Stack

- **Frontend**: Angular 17+ with standalone components
- **Styling**: SCSS with CSS custom properties
- **TypeScript**: Strict configuration with comprehensive interfaces
- **Build Tool**: Angular CLI with Webpack
- **Development Server**: Angular Dev Server with hot reload

## 📁 Project Structure

```
curry-palace-website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/           # Navigation header
│   │   │   ├── footer/           # Site footer
│   │   │   ├── home/             # Homepage with hero section
│   │   │   ├── menu/             # Restaurant menu
│   │   │   ├── about/            # About us page
│   │   │   ├── gallery/          # Photo gallery
│   │   │   ├── contact/          # Contact information and forms
│   │   │   ├── order/            # Online ordering system
│   │   │   ├── reviews/          # Customer testimonials
│   │   │   └── facebook-feed/    # Facebook integration
│   │   ├── app.component.ts      # Main app component
│   │   ├── app.routes.ts         # Routing configuration
│   │   └── app.config.ts         # App configuration
│   ├── styles.scss               # Global styles
│   ├── index.html               # Main HTML file
│   └── main.ts                  # Bootstrap file
├── package.json                 # Dependencies and scripts
├── angular.json                 # Angular CLI configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd curry-palace-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Design System

### Color Palette

- **Primary Red**: #8B0000 (Deep red for headers and accents)
- **Cream**: #F5F5DC (Background and light elements)
- **Gold**: #DAA520 (Accent color for highlights)
- **Dark Gray**: #333333 (Text color)
- **Light Gray**: #666666 (Secondary text)

### Typography

- **Primary Font**: 'Playfair Display' (Headings)
- **Secondary Font**: 'Inter' (Body text)
- **Fallback**: serif, sans-serif

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📱 Components Overview

### Header Component
- Responsive navigation with mobile menu
- RouterLink integration for SPA navigation
- "Order Now" call-to-action button

### Home Component
- Hero section with restaurant introduction
- Featured dishes showcase
- Customer testimonials
- Facebook feed integration

### Menu Component
- Categorized menu items (Appetizers, Mains, Breads & Rice, Desserts, Beverages)
- Dietary indicators (vegetarian, vegan, gluten-free)
- Pricing and descriptions

### Gallery Component
- Category-based photo filtering
- Lightbox modal with navigation
- Keyboard navigation support
- Responsive grid layout

### Order Component
- Shopping cart functionality
- Pickup/delivery options
- Melbourne suburb selection
- Form validation

### Reviews Component
- Star rating system
- Verified customer badges
- Service type indicators (Dine-in, Delivery, Pickup)
- Review filtering and sorting

### Contact Component
- Contact form with validation
- Restaurant information
- Opening hours display
- Social media links

## 🔧 Configuration

### Environment Variables

Create environment files for different stages:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  facebookAppId: 'your-facebook-app-id'
};
```

### Angular Configuration

Key configuration in `angular.json`:
- Build optimization for production
- SCSS preprocessing
- Asset management
- Service worker support (optional)

## 🗄️ Database Integration Guide

### Recommended Database Schema

#### Tables Structure

```sql
-- Restaurants table
CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  opening_hours JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu categories table
CREATE TABLE menu_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Menu items table
CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT FALSE,
  is_gluten_free BOOLEAN DEFAULT FALSE,
  is_spicy BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

-- Gallery categories table
CREATE TABLE gallery_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Gallery images table
CREATE TABLE gallery_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  display_order INT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES gallery_categories(id)
);

-- Customer reviews table
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  service_type ENUM('dine-in', 'delivery', 'pickup'),
  favorite_dish VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  review_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  order_type ENUM('pickup', 'delivery') NOT NULL,
  delivery_address TEXT,
  suburb VARCHAR(100),
  special_instructions TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  menu_item_id INT,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Contact messages table
CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_reservation BOOLEAN DEFAULT FALSE,
  preferred_date DATE,
  preferred_time TIME,
  party_size INT,
  status ENUM('new', 'read', 'responded', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints Structure

#### Menu API
```typescript
// GET /api/menu/categories
// GET /api/menu/items
// GET /api/menu/items/:categoryId
// POST /api/menu/items (admin)
// PUT /api/menu/items/:id (admin)
// DELETE /api/menu/items/:id (admin)
```

#### Gallery API
```typescript
// GET /api/gallery/categories
// GET /api/gallery/images
// GET /api/gallery/images/:categoryId
// POST /api/gallery/images (admin)
// PUT /api/gallery/images/:id (admin)
// DELETE /api/gallery/images/:id (admin)
```

#### Reviews API
```typescript
// GET /api/reviews
// POST /api/reviews
// PUT /api/reviews/:id/approve (admin)
// DELETE /api/reviews/:id (admin)
```

#### Orders API
```typescript
// POST /api/orders
// GET /api/orders/:id
// PUT /api/orders/:id/status (admin)
// GET /api/orders (admin)
```

#### Contact API
```typescript
// POST /api/contact
// GET /api/contact/messages (admin)
// PUT /api/contact/messages/:id/status (admin)
```

### Backend Integration Steps

1. **Set up API Service**:
```typescript
// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Menu methods
  getMenuCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu/categories`);
  }

  getMenuItems(categoryId?: number): Observable<any> {
    const url = categoryId 
      ? `${this.apiUrl}/menu/items/${categoryId}`
      : `${this.apiUrl}/menu/items`;
    return this.http.get(url);
  }

  // Gallery methods
  getGalleryImages(categoryId?: number): Observable<any> {
    const url = categoryId 
      ? `${this.apiUrl}/gallery/images/${categoryId}`
      : `${this.apiUrl}/gallery/images`;
    return this.http.get(url);
  }

  // Reviews methods
  getReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews`);
  }

  submitReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, review);
  }

  // Orders methods
  submitOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }

  // Contact methods
  submitContact(contact: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, contact);
  }
}
```

2. **Update Components**: Replace mock data with API calls
3. **Add Loading States**: Implement loading indicators
4. **Error Handling**: Add comprehensive error handling
5. **Form Validation**: Enhance form validation with backend validation

### Facebook Integration

1. **Facebook App Setup**:
   - Create Facebook App at developers.facebook.com
   - Get App ID and configure domains
   - Set up Facebook Login if needed

2. **Facebook SDK Integration**:
```typescript
// Add to index.html
<script async defer crossorigin="anonymous" 
  src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=YOUR_APP_ID">
</script>

// Update facebook-feed.component.ts
declare var FB: any;

export class FacebookFeedComponent implements OnInit {
  ngOnInit() {
    this.loadFacebookSDK();
  }

  loadFacebookSDK() {
    FB.init({
      appId: environment.facebookAppId,
      xfbml: true,
      version: 'v18.0'
    });
    
    this.loadFacebookPosts();
  }

  loadFacebookPosts() {
    FB.api('/YOUR_PAGE_ID/posts', 'GET', {
      fields: 'message,created_time,full_picture,permalink_url',
      limit: 3
    }, (response: any) => {
      if (response && response.data) {
        this.posts = response.data;
      }
    });
  }
}
```

## 🚀 Deployment Guide

### Build for Production

```bash
# Install dependencies
npm install

# Build for production
ng build --configuration production

# The dist/ folder contains the built application
```

### Deployment Options

#### 1. Static Hosting (Netlify, Vercel, GitHub Pages)
- Upload `dist/curry-palace-website` folder
- Configure redirects for SPA routing

#### 2. Traditional Web Server (Apache, Nginx)
- Copy `dist/curry-palace-website` to web root
- Configure server for SPA routing

#### 3. Cloud Platforms (AWS S3, Google Cloud Storage)
- Upload files to cloud storage
- Configure CDN and routing

### Environment Configuration

Create production environment file:
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
  facebookAppId: 'your-production-facebook-app-id'
};
```

## 🔧 Maintenance

### Regular Updates
- Update Angular and dependencies regularly
- Monitor security vulnerabilities
- Update menu items and prices
- Add new gallery images
- Moderate customer reviews

### Performance Monitoring
- Monitor Core Web Vitals
- Check mobile performance
- Optimize images and assets
- Monitor API response times

### SEO Maintenance
- Update meta descriptions
- Add new structured data
- Monitor search rankings
- Update sitemap

## 📞 Support

For technical support or questions about this implementation:
- Review the code comments and documentation
- Check Angular official documentation
- Test thoroughly before deploying changes
- Keep backups of working versions

## 📄 License

This project is created for Curry Palace Restaurant. All rights reserved.

---

**Built with ❤️ using Angular 17+ and TypeScript**
