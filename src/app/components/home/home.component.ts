import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FacebookFeedComponent } from '../facebook-feed/facebook-feed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FacebookFeedComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredDishes = [
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Tender chicken in a rich, creamy tomato-based sauce with aromatic spices',
      price: 24.90,
      image: 'assets/images/butter-chicken.jpg',
      spiceLevel: 2
    },
    {
      id: 2,
      name: 'Lamb Biryani',
      description: 'Fragrant basmati rice layered with tender lamb and traditional spices',
      price: 28.90,
      image: 'assets/images/lamb-biryani.jpg',
      spiceLevel: 3
    },
    {
      id: 3,
      name: 'Palak Paneer',
      description: 'Fresh cottage cheese in a creamy spinach curry with garlic and ginger',
      price: 22.90,
      image: 'assets/images/palak-paneer.jpg',
      spiceLevel: 2
    }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely amazing food! The butter chicken was the best I\'ve ever had. Will definitely be back!',
      date: '2024-01-15'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Authentic flavors and excellent service. The biryani was perfectly spiced and the portions were generous.',
      date: '2024-01-10'
    },
    {
      name: 'Emma Wilson',
      rating: 4,
      comment: 'Great vegetarian options! The palak paneer was delicious and the naan bread was fresh and warm.',
      date: '2024-01-08'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getSpiceIcons(level: number): string[] {
    return Array(level).fill('🌶️');
  }

  getStarIcons(rating: number): string[] {
    return Array(rating).fill('⭐');
  }
}