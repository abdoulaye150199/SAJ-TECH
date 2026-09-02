import { Component, output } from '@angular/core';
import { ParticleLogoComponent } from '../../shared/particle-logo.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ParticleLogoComponent],
  template: `
    <section class="hero" id="home">
      <p class="hero-index">Studio digital indépendant · Montréal — Dakar</p>
      <div class="hero-stage"><app-particle-logo /></div>
      <button class="hero-action" (click)="navigate.emit('services')"><span>Explorer le studio</span><b>↓</b></button>
      <p class="hero-side">Stratégie · Design · Technologie</p>
    </section>
    <div class="marquee" aria-hidden="true"><div><span>NOUS CRÉONS DES EXPÉRIENCES DIGITALES</span><i>✦</i><span>NOUS CRÉONS DES EXPÉRIENCES DIGITALES</span><i>✦</i><span>NOUS CRÉONS DES EXPÉRIENCES DIGITALES</span><i>✦</i></div></div>
  `,
})
export class HeroSectionComponent {
  readonly navigate = output<string>();
}
