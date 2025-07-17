import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface FacebookPost {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
}

@Component({
  selector: 'app-facebook-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facebook-feed.component.html',
  styleUrls: ['./facebook-feed.component.scss']
})
export class FacebookFeedComponent implements OnInit {
  posts: FacebookPost[] = [];
  loading = true;
  error = false;

  // Mock data for demonstration (replace with actual Facebook API integration)
  mockPosts: FacebookPost[] = [
    {
      id: '1',
      message: 'New special menu this week! Try our authentic Goan Fish Curry - a perfect blend of coconut milk, spices, and fresh fish. Available for dine-in and takeaway! 🐟🥥 #CurryPalace #GoanCurry #IndianFood',
      created_time: '2024-01-20T10:30:00Z',
      permalink_url: 'https://facebook.com/currypalace/posts/1',
      full_picture: 'assets/images/goan-fish-curry.jpg'
    },
    {
      id: '2',
      message: 'Thank you to all our customers who joined us for our Diwali celebration last night! The restaurant was filled with joy, laughter, and amazing food. See you next year! ✨🪔 #Diwali #CurryPalace #Celebration',
      created_time: '2024-01-18T20:15:00Z',
      permalink_url: 'https://facebook.com/currypalace/posts/2',
      full_picture: 'assets/images/diwali-celebration.jpg'
    },
    {
      id: '3',
      message: 'Weekend special: Buy 2 main courses and get 20% off your entire order! Valid for dine-in and takeaway. Book your table now or order online. 🍛🎉 #WeekendSpecial #CurryPalace #Discount',
      created_time: '2024-01-16T14:45:00Z',
      permalink_url: 'https://facebook.com/currypalace/posts/3',
      full_picture: 'assets/images/weekend-special.jpg'
    }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFacebookPosts();
  }

  loadFacebookPosts(): void {
    // For now, we'll use mock data
    // In production, you would integrate with Facebook Graph API
    setTimeout(() => {
      this.posts = this.mockPosts;
      this.loading = false;
    }, 1500);

    // Example of actual Facebook API integration (commented out):
    /*
    const accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN';
    const pageId = 'YOUR_FACEBOOK_PAGE_ID';
    const fields = 'id,message,story,created_time,permalink_url,full_picture';
    const limit = 3;
    
    const url = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${accessToken}`;
    
    this.http.get<{data: FacebookPost[]}>(url).subscribe({
      next: (response) => {
        this.posts = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading Facebook posts:', error);
        this.error = true;
        this.loading = false;
        // Fallback to mock data
        this.posts = this.mockPosts;
      }
    });
    */
  }

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return `${diffInMinutes} minutes ago`;
      }
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else {
      return `${diffInDays} days ago`;
    }
  }

  retryLoad(): void {
    this.loading = true;
    this.error = false;
    this.loadFacebookPosts();
  }
}