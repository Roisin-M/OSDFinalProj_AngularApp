import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  backgroundImage = '';
  quote = '';
  author = '';
  sanskritWord = '';

  private readonly UNSPLASH_ACCESS_KEY = 'O2wGWCoVrslVAMUEaDzhTC66JmS6VQX5qPMJV-Ff0GY';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuote();
    this.selectSanskritWord();
    this.setRandomBackgroundImage();
  }

  setRandomBackgroundImage(): void {
    const topics = ['yoga', 'meditation', 'nature', 'peaceful'];
    const random = topics[Math.floor(Math.random() * topics.length)];
    const url = `https://api.unsplash.com/photos/random?query=${random}&orientation=landscape&client_id=${this.UNSPLASH_ACCESS_KEY}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.backgroundImage = data.urls.regular;
      },
      error: () => {
        // fallback if API fails
        this.backgroundImage = '../../../../assets/yogaHome.jpg';
      }
    });
  }

  loadQuote() {
    this.http.get<any[]>('https://zenquotes.io/api/random').subscribe({
      next: (data) => {
        this.quote = data[0].q;
        this.author = data[0].a;
      },
      error: () => {
        this.quote = '“Yoga is the journey of the self, through the self, to the self.”';
        this.author = '— Bhagavad Gita';
      }
    });
  }

  selectSanskritWord() {
    const words = [
      '🧘 Namaste – I bow to you',
      '🫁 Pranayama – Breath control',
      '🌀 Chakra – Energy center',
      '🕉 Dharma – Universal truth',
      '🪷 Asana – Yoga pose',
      '🧠 Dhyana – Meditation',
      '🙏 Shanti – Peace',
      '🔥 Tapas – Discipline',
      '🌿 Ahimsa – Non-violence'
    ];
    this.sanskritWord = words[Math.floor(Math.random() * words.length)];
  }
}
