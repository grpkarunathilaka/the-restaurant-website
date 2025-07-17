import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  spiceLevel: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  popular: boolean;
  image?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  activeCategory = 'appetizers';
  
  menuCategories: MenuCategory[] = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your meal with our delicious traditional appetizers',
      items: [
        {
          id: 1,
          name: 'Samosas (2 pieces)',
          description: 'Crispy pastry filled with spiced potatoes and peas, served with mint chutney',
          price: 8.90,
          spiceLevel: 2,
          vegetarian: true,
          vegan: true,
          glutenFree: false,
          popular: true,
          image: 'assets/images/samosas.jpg'
        },
        {
          id: 2,
          name: 'Chicken Tikka',
          description: 'Tender chicken pieces marinated in yogurt and spices, grilled in tandoor',
          price: 14.90,
          spiceLevel: 3,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/chicken-tikka.jpg'
        },
        {
          id: 3,
          name: 'Onion Bhaji',
          description: 'Crispy onion fritters with chickpea flour and aromatic spices',
          price: 9.90,
          spiceLevel: 2,
          vegetarian: true,
          vegan: true,
          glutenFree: true,
          popular: false,
          image: 'assets/images/onion-bhaji.jpg'
        },
        {
          id: 4,
          name: 'Seekh Kebab',
          description: 'Spiced minced lamb skewers grilled to perfection in tandoor',
          price: 16.90,
          spiceLevel: 3,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          popular: false,
          image: 'assets/images/seekh-kebab.jpg'
        }
      ]
    },
    {
      id: 'mains',
      name: 'Main Courses',
      description: 'Our signature curries and traditional main dishes',
      items: [
        {
          id: 5,
          name: 'Butter Chicken',
          description: 'Tender chicken in a rich, creamy tomato-based sauce with aromatic spices',
          price: 24.90,
          spiceLevel: 2,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/butter-chicken.jpg'
        },
        {
          id: 6,
          name: 'Lamb Biryani',
          description: 'Fragrant basmati rice layered with tender lamb and traditional spices',
          price: 28.90,
          spiceLevel: 3,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/lamb-biryani.jpg'
        },
        {
          id: 7,
          name: 'Palak Paneer',
          description: 'Fresh cottage cheese in a creamy spinach curry with garlic and ginger',
          price: 22.90,
          spiceLevel: 2,
          vegetarian: true,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/palak-paneer.jpg'
        },
        {
          id: 8,
          name: 'Chicken Vindaloo',
          description: 'Spicy Goan curry with chicken, vinegar, and fiery red chilies',
          price: 25.90,
          spiceLevel: 4,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          popular: false,
          image: 'assets/images/chicken-vindaloo.jpg'
        },
        {
          id: 9,
          name: 'Dal Makhani',
          description: 'Slow-cooked black lentils in a rich, creamy tomato sauce',
          price: 19.90,
          spiceLevel: 1,
          vegetarian: true,
          vegan: false,
          glutenFree: true,
          popular: false,
          image: 'assets/images/dal-makhani.jpg'
        },
        {
          id: 10,
          name: 'Fish Curry',
          description: 'Fresh fish cooked in coconut milk with curry leaves and spices',
          price: 26.90,
          spiceLevel: 3,
          vegetarian: false,
          vegan: false,
          glutenFree: true,
          popular: false,
          image: 'assets/images/fish-curry.jpg'
        }
      ]
    },
    {
      id: 'breads',
      name: 'Breads & Rice',
      description: 'Freshly baked breads and aromatic rice dishes',
      items: [
        {
          id: 11,
          name: 'Garlic Naan',
          description: 'Soft leavened bread topped with fresh garlic and coriander',
          price: 5.90,
          spiceLevel: 1,
          vegetarian: true,
          vegan: false,
          glutenFree: false,
          popular: true,
          image: 'assets/images/garlic-naan.jpg'
        },
        {
          id: 12,
          name: 'Basmati Rice',
          description: 'Fragrant long-grain rice, perfectly steamed',
          price: 4.90,
          spiceLevel: 0,
          vegetarian: true,
          vegan: true,
          glutenFree: true,
          popular: false,
          image: 'assets/images/basmati-rice.jpg'
        },
        {
          id: 13,
          name: 'Roti',
          description: 'Traditional whole wheat flatbread, cooked on tawa',
          price: 4.50,
          spiceLevel: 0,
          vegetarian: true,
          vegan: true,
          glutenFree: false,
          popular: false,
          image: 'assets/images/roti.jpg'
        },
        {
          id: 14,
          name: 'Coconut Rice',
          description: 'Basmati rice cooked with coconut milk and curry leaves',
          price: 7.90,
          spiceLevel: 1,
          vegetarian: true,
          vegan: true,
          glutenFree: true,
          popular: false,
          image: 'assets/images/coconut-rice.jpg'
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Traditional Indian sweets to end your meal perfectly',
      items: [
        {
          id: 15,
          name: 'Gulab Jamun (2 pieces)',
          description: 'Soft milk dumplings in rose-flavored sugar syrup',
          price: 7.90,
          spiceLevel: 0,
          vegetarian: true,
          vegan: false,
          glutenFree: false,
          popular: true,
          image: 'assets/images/gulab-jamun.jpg'
        },
        {
          id: 16,
          name: 'Kulfi',
          description: 'Traditional Indian ice cream with cardamom and pistachios',
          price: 8.90,
          spiceLevel: 0,
          vegetarian: true,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/kulfi.jpg'
        },
        {
          id: 17,
          name: 'Kheer',
          description: 'Creamy rice pudding with cardamom, almonds, and raisins',
          price: 6.90,
          spiceLevel: 0,
          vegetarian: true,
          vegan: false,
          glutenFree: true,
          popular: false,
          image: 'assets/images/kheer.jpg'
        }
      ]
    },
    {
      id: 'beverages',
      name: 'Beverages',
      description: 'Refreshing drinks to complement your meal',
      items: [
        {
          id: 18,
          name: 'Mango Lassi',
          description: 'Creamy yogurt drink blended with fresh mango',
          price: 5.90,
          spiceLevel: 0,
          vegetarian: true,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/mango-lassi.jpg'
        },
        {
          id: 19,
          name: 'Masala Chai',
          description: 'Traditional spiced tea with cardamom, ginger, and cinnamon',
          price: 4.50,
          spiceLevel: 1,
          vegetarian: true,
          vegan: false,
          glutenFree: true,
          popular: true,
          image: 'assets/images/masala-chai.jpg'
        },
        {
          id: 20,
          name: 'Fresh Lime Soda',
          description: 'Refreshing lime juice with soda water and mint',
          price: 4.90,
          spiceLevel: 0,
          vegetarian: true,
          vegan: true,
          glutenFree: true,
          popular: false,
          image: 'assets/images/lime-soda.jpg'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }

  getActiveCategory(): MenuCategory {
    return this.menuCategories.find(cat => cat.id === this.activeCategory) || this.menuCategories[0];
  }

  getSpiceIcons(level: number): string[] {
    return Array(level).fill('🌶️');
  }

  getDietaryIcons(item: MenuItem): string[] {
    const icons: string[] = [];
    if (item.vegetarian) icons.push('🥬');
    if (item.vegan) icons.push('🌱');
    if (item.glutenFree) icons.push('🌾');
    return icons;
  }

  getDietaryTitle(icon: string): string {
    switch (icon) {
      case '🥬': return 'Vegetarian';
      case '🌱': return 'Vegan';
      case '🌾': return 'Gluten Free';
      default: return '';
    }
  }
}