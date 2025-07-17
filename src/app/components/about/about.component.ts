import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  teamMembers: TeamMember[] = [
    {
      name: 'Rajesh Kumar',
      role: 'Head Chef & Owner',
      description: 'With over 20 years of culinary experience from Mumbai and Delhi, Chef Rajesh brings authentic Indian flavors to Melbourne. His passion for traditional cooking techniques and fresh ingredients makes every dish a masterpiece.',
      image: 'assets/images/chef-rajesh.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Sous Chef',
      description: 'Specializing in North Indian cuisine and tandoor cooking, Chef Priya has been perfecting her craft for 15 years. Her expertise in spice blending creates the perfect balance in every curry.',
      image: 'assets/images/chef-priya.jpg'
    },
    {
      name: 'Amit Patel',
      role: 'Restaurant Manager',
      description: 'Amit ensures every guest feels welcomed and enjoys an exceptional dining experience. His attention to detail and warm hospitality reflect the true spirit of Indian culture.',
      image: 'assets/images/manager-amit.jpg'
    },
    {
      name: 'Sunita Gupta',
      role: 'Pastry Chef',
      description: 'Creating traditional Indian sweets and desserts with a modern twist, Chef Sunita brings sweetness to every celebration. Her gulab jamuns and kulfi are customer favorites.',
      image: 'assets/images/chef-sunita.jpg'
    }
  ];

  achievements: Achievement[] = [
    {
      year: '2018',
      title: 'Best Indian Restaurant',
      description: 'Melbourne Food Awards - Recognized for authentic flavors and exceptional service',
      icon: '🏆'
    },
    {
      year: '2019',
      title: 'Excellence in Hospitality',
      description: 'Victorian Restaurant Association - Outstanding customer service award',
      icon: '⭐'
    },
    {
      year: '2020',
      title: 'Community Choice Award',
      description: 'Local community voted us as their favorite Indian restaurant',
      icon: '❤️'
    },
    {
      year: '2021',
      title: 'Sustainable Dining',
      description: 'Green Restaurant Certification for eco-friendly practices',
      icon: '🌱'
    },
    {
      year: '2022',
      title: 'Cultural Ambassador',
      description: 'Recognized for promoting Indian culture through authentic cuisine',
      icon: '🇮🇳'
    }
  ];

  restaurantStats = {
    yearsInBusiness: 8,
    happyCustomers: '10,000+',
    dishesServed: '50,000+',
    teamMembers: 15
  };

  constructor() { }

  ngOnInit(): void {
  }

}
