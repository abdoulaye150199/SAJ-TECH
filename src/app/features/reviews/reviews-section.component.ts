import { Component, input } from '@angular/core';
import { Testimonial } from '../../core/models/site-data.model';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-reviews-section', standalone: true, imports: [RevealDirective],
  template: `
    <section class="reviews" id="reviews" appReveal>
      <div class="section-kicker"><span>04</span><p>Paroles de clients</p></div>
      <div class="reviews-title"><h2>LEUR SUCCÈS<br /><em>EST NOTRE ÉCHO.</em></h2><span>★★★★★</span></div>
      <div class="review-track">
        @for (review of testimonials(); track review.company; let i = $index) {
          <article class="review-card reveal-child" [class.blue-card]="i === 1"><header><strong>{{review.client}}</strong><span>{{review.company}}</span></header><blockquote>“{{review.quote}}”</blockquote><footer>{{review.service}} · {{review.location}}</footer></article>
        }
      </div>
    </section>
  `,
})
export class ReviewsSectionComponent { readonly testimonials = input.required<Testimonial[]>(); }
