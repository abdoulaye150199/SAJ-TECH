import { Component, output } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-statement-section',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section class="statement" appReveal>
      <div class="section-kicker"><span>01</span><p>Notre approche</p></div>
      <div class="statement-copy"><h1>LE DIGITAL NE DOIT PAS<br />SEULEMENT ÊTRE VU.<br /><em>IL DOIT ÊTRE VÉCU.</em></h1><div><p>SAJ Tech réunit design, développement et stratégie pour créer des expériences utiles, singulières et mémorables.</p><button class="arrow-link" (click)="navigate.emit('services')">Notre savoir-faire <span>↗</span></button></div></div>
      <div class="stats"><article><strong>06</strong><span>expertises réunies</span></article><article><strong>360°</strong><span>de l’idée au lancement</span></article><article><strong>02</strong><span>continents, une équipe</span></article></div>
    </section>
  `,
})
export class StatementSectionComponent { readonly navigate = output<string>(); }
