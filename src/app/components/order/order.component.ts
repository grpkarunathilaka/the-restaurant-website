import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  spiceLevel: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  popular: boolean;
  image?: string;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

interface DeliveryArea {
  suburb: string;
  postcode: string;
  deliveryFee: number;
  estimatedTime: string;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  activeCategory = 'appetizers';
  orderType: 'pickup' | 'delivery' = 'pickup';
  cart: CartItem[] = [];
  isSubmitting = false;
  orderSuccess = false;
  showCart = false;

  // Reusing menu data from menu component
  menuCategories = [
    { id: 'appetizers', name: 'Appetizers', icon: '🥟' },
    { id: 'mains', name: 'Main Courses', icon: '🍛' },
    { id: 'breads', name: 'Breads & Rice', icon: '🍞' },
    { id: 'desserts', name: 'Desserts', icon: '🍮' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  menuItems: MenuItem[] = [
    // Appetizers
    {
      id: 1, name: 'Samosas (2 pieces)', description: 'Crispy pastry filled with spiced potatoes and peas',
      price: 8.90, category: 'appetizers', spiceLevel: 2, vegetarian: true, vegan: true, glutenFree: false, popular: true
    },
    {
      id: 2, name: 'Chicken Tikka', description: 'Tender chicken pieces marinated in yogurt and spices',
      price: 14.90, category: 'appetizers', spiceLevel: 3, vegetarian: false, vegan: false, glutenFree: true, popular: true
    },
    {
      id: 3, name: 'Onion Bhaji', description: 'Crispy onion fritters with chickpea flour and spices',
      price: 9.90, category: 'appetizers', spiceLevel: 2, vegetarian: true, vegan: true, glutenFree: true, popular: false
    },

    // Main Courses
    {
      id: 4, name: 'Butter Chicken', description: 'Tender chicken in rich, creamy tomato-based sauce',
      price: 24.90, category: 'mains', spiceLevel: 2, vegetarian: false, vegan: false, glutenFree: true, popular: true
    },
    {
      id: 5, name: 'Lamb Biryani', description: 'Fragrant basmati rice layered with tender lamb',
      price: 28.90, category: 'mains', spiceLevel: 3, vegetarian: false, vegan: false, glutenFree: true, popular: true
    },
    {
      id: 6, name: 'Palak Paneer', description: 'Fresh cottage cheese in creamy spinach curry',
      price: 22.90, category: 'mains', spiceLevel: 2, vegetarian: true, vegan: false, glutenFree: true, popular: true
    },
    {
      id: 7, name: 'Dal Makhani', description: 'Slow-cooked black lentils in rich, creamy sauce',
      price: 19.90, category: 'mains', spiceLevel: 1, vegetarian: true, vegan: false, glutenFree: true, popular: false
    },

    // Breads & Rice
    {
      id: 8, name: 'Garlic Naan', description: 'Soft leavened bread topped with fresh garlic',
      price: 5.90, category: 'breads', spiceLevel: 1, vegetarian: true, vegan: false, glutenFree: false, popular: true
    },
    {
      id: 9, name: 'Basmati Rice', description: 'Fragrant long-grain rice, perfectly steamed',
      price: 4.90, category: 'breads', spiceLevel: 0, vegetarian: true, vegan: true, glutenFree: true, popular: false
    },

    // Desserts
    {
      id: 10, name: 'Gulab Jamun (2 pieces)', description: 'Soft milk dumplings in rose-flavored syrup',
      price: 7.90, category: 'desserts', spiceLevel: 0, vegetarian: true, vegan: false, glutenFree: false, popular: true
    },
    {
      id: 11, name: 'Kulfi', description: 'Traditional Indian ice cream with cardamom',
      price: 8.90, category: 'desserts', spiceLevel: 0, vegetarian: true, vegan: false, glutenFree: true, popular: true
    },

    // Beverages
    {
      id: 12, name: 'Mango Lassi', description: 'Creamy yogurt drink blended with fresh mango',
      price: 5.90, category: 'beverages', spiceLevel: 0, vegetarian: true, vegan: false, glutenFree: true, popular: true
    },
    {
      id: 13, name: 'Masala Chai', description: 'Traditional spiced tea with cardamom and ginger',
      price: 4.50, category: 'beverages', spiceLevel: 1, vegetarian: true, vegan: false, glutenFree: true, popular: true
    }
  ];

  deliveryAreas: DeliveryArea[] = [
    { suburb: 'Melbourne CBD', postcode: '3000', deliveryFee: 5.00, estimatedTime: '30-45 mins' },
    { suburb: 'South Yarra', postcode: '3141', deliveryFee: 6.50, estimatedTime: '35-50 mins' },
    { suburb: 'Richmond', postcode: '3121', deliveryFee: 7.00, estimatedTime: '40-55 mins' },
    { suburb: 'Carlton', postcode: '3053', deliveryFee: 6.00, estimatedTime: '35-50 mins' },
    { suburb: 'Fitzroy', postcode: '3065', deliveryFee: 7.50, estimatedTime: '40-55 mins' },
    { suburb: 'St Kilda', postcode: '3182', deliveryFee: 8.00, estimatedTime: '45-60 mins' }
  ];

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      // Customer Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]{10,}$/)]],
      
      // Delivery Information
      address: [''],
      suburb: [''],
      postcode: [''],
      deliveryInstructions: [''],
      
      // Order Information
      orderType: ['pickup', Validators.required],
      preferredTime: ['asap'],
      customTime: [''],
      specialRequests: [''],
      
      // Payment
      paymentMethod: ['cash', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateValidators();
  }

  setOrderType(type: 'pickup' | 'delivery'): void {
    this.orderType = type;
    this.orderForm.patchValue({ orderType: type });
    this.updateValidators();
  }

  private updateValidators(): void {
    const addressControl = this.orderForm.get('address');
    const suburbControl = this.orderForm.get('suburb');
    const postcodeControl = this.orderForm.get('postcode');

    if (this.orderType === 'delivery') {
      addressControl?.setValidators([Validators.required]);
      suburbControl?.setValidators([Validators.required]);
      postcodeControl?.setValidators([Validators.required, Validators.pattern(/^\d{4}$/)]);
    } else {
      addressControl?.clearValidators();
      suburbControl?.clearValidators();
      postcodeControl?.clearValidators();
    }

    addressControl?.updateValueAndValidity();
    suburbControl?.updateValueAndValidity();
    postcodeControl?.updateValueAndValidity();
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }

  getFilteredItems(): MenuItem[] {
    return this.menuItems.filter(item => item.category === this.activeCategory);
  }

  addToCart(item: MenuItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.menuItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        menuItem: item,
        quantity: 1
      });
    }
    
    this.showCart = true;
    setTimeout(() => this.showCart = false, 2000);
  }

  removeFromCart(itemId: number): void {
    this.cart = this.cart.filter(item => item.menuItem.id !== itemId);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const item = this.cart.find(cartItem => cartItem.menuItem.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  getCartTotal(): number {
    const subtotal = this.cart.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0);
    
    const deliveryFee = this.getDeliveryFee();
    return subtotal + deliveryFee;
  }

  getCartSubtotal(): number {
    return this.cart.reduce((total, item) => 
      total + (item.menuItem.price * item.quantity), 0);
  }

  getDeliveryFee(): number {
    if (this.orderType === 'pickup') return 0;
    
    const postcode = this.orderForm.get('postcode')?.value;
    const area = this.deliveryAreas.find(area => area.postcode === postcode);
    return area ? area.deliveryFee : 10.00; // Default delivery fee
  }

  getEstimatedTime(): string {
    if (this.orderType === 'pickup') return '20-30 mins';
    
    const postcode = this.orderForm.get('postcode')?.value;
    const area = this.deliveryAreas.find(area => area.postcode === postcode);
    return area ? area.estimatedTime : '45-60 mins';
  }

  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  clearCart(): void {
    this.cart = [];
    this.showCart = false;
  }

  onSubmit(): void {
    if (this.orderForm.valid && this.cart.length > 0) {
      this.isSubmitting = true;
      
      // Simulate order submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.orderSuccess = true;
        this.clearCart();
        
        // Reset form after success
        setTimeout(() => {
          this.orderSuccess = false;
          this.orderForm.reset();
          this.orderForm.patchValue({ 
            orderType: 'pickup', 
            preferredTime: 'asap',
            paymentMethod: 'cash'
          });
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['pattern']) {
        if (fieldName === 'phone') return 'Please enter a valid phone number';
        if (fieldName === 'postcode') return 'Please enter a valid 4-digit postcode';
      }
    }
    return '';
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
}