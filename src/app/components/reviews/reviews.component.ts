import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  orderType?: string;
  favoriteItem?: string;
  avatar?: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  Math = Math; // Make Math available in template
  reviews: Review[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely incredible food! The Butter Chicken was the best I\'ve ever had. The spices were perfectly balanced and the service was exceptional. Will definitely be ordering again!',
      verified: true,
      orderType: 'Delivery',
      favoriteItem: 'Butter Chicken',
      avatar: '👩‍🦰'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      date: '2024-01-12',
      comment: 'Curry Palace has become our go-to Indian restaurant. The Lamb Vindaloo is outstanding - perfect heat level and tender meat. Great portion sizes too!',
      verified: true,
      orderType: 'Pickup',
      favoriteItem: 'Lamb Vindaloo',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      rating: 4,
      date: '2024-01-10',
      comment: 'Really enjoyed our dining experience. The atmosphere is lovely and the staff are very friendly. The Palak Paneer was delicious. Only minor issue was the wait time, but worth it!',
      verified: true,
      orderType: 'Dine-in',
      favoriteItem: 'Palak Paneer',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      rating: 5,
      date: '2024-01-08',
      comment: 'Best Indian food in Melbourne! The Tandoori Chicken is amazing and the naan bread is fresh and warm. Highly recommend for anyone who loves authentic Indian cuisine.',
      verified: true,
      orderType: 'Delivery',
      favoriteItem: 'Tandoori Chicken',
      avatar: '👨‍🍳'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      rating: 5,
      date: '2024-01-05',
      comment: 'Ordered for a family gathering and everyone was impressed! The variety in the menu is great and everything was perfectly spiced. The Biryani was a hit!',
      verified: true,
      orderType: 'Pickup',
      favoriteItem: 'Chicken Biryani',
      avatar: '👩‍💻'
    },
    {
      id: 6,
      name: 'James Wilson',
      rating: 4,
      date: '2024-01-03',
      comment: 'Solid Indian restaurant with good food and reasonable prices. The Rogan Josh was flavorful and the service was prompt. Will visit again.',
      verified: true,
      orderType: 'Dine-in',
      favoriteItem: 'Rogan Josh',
      avatar: '👨‍🔧'
    },
    {
      id: 7,
      name: 'Priya Sharma',
      rating: 5,
      date: '2024-01-01',
      comment: 'As someone from India, I can say this is authentic and delicious! The Dal Makhani reminds me of home. Great job maintaining traditional flavors!',
      verified: true,
      orderType: 'Delivery',
      favoriteItem: 'Dal Makhani',
      avatar: '👩‍🎓'
    },
    {
      id: 8,
      name: 'Robert Brown',
      rating: 4,
      date: '2023-12-28',
      comment: 'Good food and nice ambiance. The Chicken Korma was creamy and mild - perfect for those who don\'t like too much spice. Staff were helpful with recommendations.',
      verified: true,
      orderType: 'Dine-in',
      favoriteItem: 'Chicken Korma',
      avatar: '👨‍💼'
    }
  ];

  reviewStats: ReviewStats = {
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  };

  reviewForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  currentFilter = 'all';
  filteredReviews: Review[] = [];

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      orderType: ['', Validators.required],
      favoriteItem: [''],
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.calculateStats();
    this.filterReviews();
  }

  calculateStats(): void {
    this.reviewStats.totalReviews = this.reviews.length;
    
    if (this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      this.reviewStats.averageRating = totalRating / this.reviews.length;
      
      // Calculate rating distribution
      this.reviewStats.ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      this.reviews.forEach(review => {
        this.reviewStats.ratingDistribution[review.rating]++;
      });
    }
  }

  filterReviews(): void {
    switch (this.currentFilter) {
      case 'recent':
        this.filteredReviews = [...this.reviews].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 6);
        break;
      case 'highest':
        this.filteredReviews = this.reviews.filter(review => review.rating === 5);
        break;
      case 'verified':
        this.filteredReviews = this.reviews.filter(review => review.verified);
        break;
      default:
        this.filteredReviews = this.reviews;
    }
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.filterReviews();
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  getRatingPercentage(rating: number): number {
    if (this.reviewStats.totalReviews === 0) return 0;
    return (this.reviewStats.ratingDistribution[rating] / this.reviewStats.totalReviews) * 100;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  onSubmitReview(): void {
    if (this.reviewForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        const formValue = this.reviewForm.value;
        const newReview: Review = {
          id: this.reviews.length + 1,
          name: formValue.name,
          rating: formValue.rating,
          date: new Date().toISOString().split('T')[0],
          comment: formValue.comment,
          verified: false, // New reviews start as unverified
          orderType: formValue.orderType,
          favoriteItem: formValue.favoriteItem,
          avatar: '👤'
        };
        
        this.reviews.unshift(newReview);
        this.calculateStats();
        this.filterReviews();
        
        this.reviewForm.reset({
          rating: 5,
          name: '',
          email: '',
          orderType: '',
          favoriteItem: '',
          comment: ''
        });
        
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 1500);
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.reviewForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['maxlength']) return `${fieldName} is too long`;
      if (field.errors['min']) return 'Rating must be at least 1';
      if (field.errors['max']) return 'Rating cannot exceed 5';
    }
    return '';
  }
}
