import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
  link?: string;
}

interface OpeningHours {
  day: string;
  hours: string;
  isToday?: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactInfo: ContactInfo[] = [
    {
      icon: '📍',
      title: 'Address',
      details: [
        '123 Collins Street',
        'Melbourne VIC 3000',
        'Australia'
      ],
      link: 'https://maps.google.com/?q=123+Collins+Street+Melbourne+VIC+3000'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: [
        '+61 3 9123 4567',
        'For reservations & inquiries'
      ],
      link: 'tel:+61391234567'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: [
        'info@currypalace.com.au',
        'We reply within 24 hours'
      ],
      link: 'mailto:info@currypalace.com.au'
    },
    {
      icon: '🌐',
      title: 'Social Media',
      details: [
        'Follow us for updates',
        '@CurryPalaceMelbourne'
      ],
      link: 'https://facebook.com/CurryPalaceMelbourne'
    }
  ];

  openingHours: OpeningHours[] = [
    { day: 'Monday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Tuesday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Wednesday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Thursday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Friday', hours: '5:00 PM - 11:00 PM' },
    { day: 'Saturday', hours: '12:00 PM - 11:00 PM' },
    { day: 'Sunday', hours: '12:00 PM - 10:00 PM' }
  ];

  reservationTypes = [
    { value: 'dinner', label: 'Dinner Reservation' },
    { value: 'lunch', label: 'Lunch Reservation' },
    { value: 'event', label: 'Private Event' },
    { value: 'catering', label: 'Catering Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' }
  ];

  partySizes = [
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5', label: '5 people' },
    { value: '6', label: '6 people' },
    { value: '7', label: '7 people' },
    { value: '8', label: '8 people' },
    { value: '9+', label: '9+ people' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]{10,}$/)]],
      inquiryType: ['dinner', Validators.required],
      partySize: ['2'],
      preferredDate: [''],
      preferredTime: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      specialRequests: [''],
      newsletter: [false]
    });
  }

  ngOnInit(): void {
    this.setTodayInOpeningHours();
  }

  private setTodayInOpeningHours(): void {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    this.openingHours = this.openingHours.map(hour => ({
      ...hour,
      isToday: hour.day === today
    }));
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  getTodaysHours(): string {
    const today = this.openingHours.find(hour => hour.isToday);
    return today ? today.hours : 'Closed';
  }

  isOpenNow(): boolean {
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const today = this.openingHours.find(hour => hour.isToday);
    
    if (!today || today.hours === 'Closed') return false;
    
    // Simple check for common opening hours format
    if (today.hours.includes('5:00 PM - 10:00 PM')) {
      return currentTime >= 1700 && currentTime <= 2200;
    }
    if (today.hours.includes('5:00 PM - 11:00 PM')) {
      return currentTime >= 1700 && currentTime <= 2300;
    }
    if (today.hours.includes('12:00 PM - 11:00 PM')) {
      return currentTime >= 1200 && currentTime <= 2300;
    }
    if (today.hours.includes('12:00 PM - 10:00 PM')) {
      return currentTime >= 1200 && currentTime <= 2200;
    }
    
    return false;
  }
}
