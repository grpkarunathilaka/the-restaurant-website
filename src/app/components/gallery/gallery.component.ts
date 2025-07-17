import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  activeCategory = 'all';
  selectedImage: GalleryImage | null = null;
  isLightboxOpen = false;
  currentImageIndex = 0;

  categories: GalleryCategory[] = [
    {
      id: 'all',
      name: 'All Photos',
      description: 'View all our gallery images',
      icon: '🖼️'
    },
    {
      id: 'food',
      name: 'Our Dishes',
      description: 'Delicious Indian cuisine',
      icon: '🍛'
    },
    {
      id: 'restaurant',
      name: 'Restaurant',
      description: 'Our beautiful dining space',
      icon: '🏛️'
    },
    {
      id: 'events',
      name: 'Events',
      description: 'Special occasions and celebrations',
      icon: '🎉'
    },
    {
      id: 'team',
      name: 'Our Team',
      description: 'Meet our passionate staff',
      icon: '👨‍🍳'
    }
  ];

  galleryImages: GalleryImage[] = [
    // Food Images
    {
      id: 1,
      src: 'assets/images/gallery/butter-chicken-plated.jpg',
      alt: 'Butter Chicken served with basmati rice',
      title: 'Signature Butter Chicken',
      description: 'Our most popular dish - tender chicken in rich, creamy tomato sauce',
      category: 'food',
      featured: true
    },
    {
      id: 2,
      src: 'assets/images/gallery/biryani-feast.jpg',
      alt: 'Lamb Biryani with raita and pickles',
      title: 'Aromatic Lamb Biryani',
      description: 'Fragrant basmati rice layered with tender lamb and traditional spices',
      category: 'food',
      featured: true
    },
    {
      id: 3,
      src: 'assets/images/gallery/tandoor-mixed-grill.jpg',
      alt: 'Mixed tandoor grill platter',
      title: 'Tandoor Mixed Grill',
      description: 'Assorted grilled meats and vegetables from our traditional tandoor',
      category: 'food',
      featured: false
    },
    {
      id: 4,
      src: 'assets/images/gallery/vegetarian-thali.jpg',
      alt: 'Complete vegetarian thali',
      title: 'Vegetarian Thali',
      description: 'A complete meal with various curries, dal, rice, and bread',
      category: 'food',
      featured: false
    },
    {
      id: 5,
      src: 'assets/images/gallery/naan-varieties.jpg',
      alt: 'Different types of naan bread',
      title: 'Fresh Naan Selection',
      description: 'Garlic, butter, and plain naan fresh from our tandoor',
      category: 'food',
      featured: false
    },
    {
      id: 6,
      src: 'assets/images/gallery/dessert-platter.jpg',
      alt: 'Indian dessert platter',
      title: 'Traditional Desserts',
      description: 'Gulab jamun, kulfi, and kheer - perfect sweet endings',
      category: 'food',
      featured: false
    },

    // Restaurant Images
    {
      id: 7,
      src: 'assets/images/gallery/dining-room-main.jpg',
      alt: 'Main dining room with traditional decor',
      title: 'Main Dining Area',
      description: 'Elegant dining space with authentic Indian ambiance',
      category: 'restaurant',
      featured: true
    },
    {
      id: 8,
      src: 'assets/images/gallery/private-dining.jpg',
      alt: 'Private dining room for events',
      title: 'Private Dining Room',
      description: 'Perfect for intimate gatherings and special occasions',
      category: 'restaurant',
      featured: false
    },
    {
      id: 9,
      src: 'assets/images/gallery/tandoor-kitchen.jpg',
      alt: 'Traditional tandoor oven in kitchen',
      title: 'Traditional Tandoor',
      description: 'Our authentic clay oven where the magic happens',
      category: 'restaurant',
      featured: false
    },
    {
      id: 10,
      src: 'assets/images/gallery/entrance-exterior.jpg',
      alt: 'Restaurant entrance and exterior',
      title: 'Welcome to Curry Palace',
      description: 'Our inviting entrance on Collins Street',
      category: 'restaurant',
      featured: false
    },

    // Events Images
    {
      id: 11,
      src: 'assets/images/gallery/diwali-celebration.jpg',
      alt: 'Diwali celebration at restaurant',
      title: 'Diwali Festival',
      description: 'Celebrating the festival of lights with our community',
      category: 'events',
      featured: true
    },
    {
      id: 12,
      src: 'assets/images/gallery/wedding-catering.jpg',
      alt: 'Wedding catering setup',
      title: 'Wedding Catering',
      description: 'Making your special day memorable with authentic flavors',
      category: 'events',
      featured: false
    },
    {
      id: 13,
      src: 'assets/images/gallery/cooking-class.jpg',
      alt: 'Cooking class in progress',
      title: 'Cooking Classes',
      description: 'Learn to cook authentic Indian dishes with our chefs',
      category: 'events',
      featured: false
    },

    // Team Images
    {
      id: 14,
      src: 'assets/images/gallery/chef-rajesh-cooking.jpg',
      alt: 'Head Chef Rajesh preparing dishes',
      title: 'Chef Rajesh at Work',
      description: 'Our head chef creating culinary masterpieces',
      category: 'team',
      featured: false
    },
    {
      id: 15,
      src: 'assets/images/gallery/kitchen-team.jpg',
      alt: 'Kitchen team working together',
      title: 'Our Kitchen Team',
      description: 'The talented team behind every delicious meal',
      category: 'team',
      featured: false
    },
    {
      id: 16,
      src: 'assets/images/gallery/service-team.jpg',
      alt: 'Front of house service team',
      title: 'Service Excellence',
      description: 'Our friendly staff ensuring exceptional dining experience',
      category: 'team',
      featured: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }

  getFilteredImages(): GalleryImage[] {
    if (this.activeCategory === 'all') {
      return this.galleryImages;
    }
    return this.galleryImages.filter(image => image.category === this.activeCategory);
  }

  getFeaturedImages(): GalleryImage[] {
    return this.galleryImages.filter(image => image.featured);
  }

  openLightbox(image: GalleryImage): void {
    this.selectedImage = image;
    this.currentImageIndex = this.getFilteredImages().findIndex(img => img.id === image.id);
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  nextImage(): void {
    const filteredImages = this.getFilteredImages();
    this.currentImageIndex = (this.currentImageIndex + 1) % filteredImages.length;
    this.selectedImage = filteredImages[this.currentImageIndex];
  }

  previousImage(): void {
    const filteredImages = this.getFilteredImages();
    this.currentImageIndex = this.currentImageIndex === 0 
      ? filteredImages.length - 1 
      : this.currentImageIndex - 1;
    this.selectedImage = filteredImages[this.currentImageIndex];
  }

  onKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
    }
  }

  getActiveCategory(): GalleryCategory {
    return this.categories.find(cat => cat.id === this.activeCategory) || this.categories[0];
  }

  getImageCount(): number {
    return this.getFilteredImages().length;
  }

  getCategoryImageCount(categoryId: string): number {
    if (categoryId === 'all') {
      return this.galleryImages.length;
    }
    return this.galleryImages.filter(img => img.category === categoryId).length;
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }
}
