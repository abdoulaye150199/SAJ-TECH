import { Component, input } from '@angular/core';
import { ServiceItem } from '../../core/models/site-data.model';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RevealDirective, TiltDirective],
  template: `
    <section class="work" id="services" appReveal>
      <header class="work-head"><div class="section-kicker"><span>02</span><p>Nos expertises</p></div><h2>TOUT CE QU’IL FAUT<br />POUR <em>ÉMERGER.</em></h2></header>
      <div class="services-list">
        @for (service of services(); track service.index) {
          <article class="service-row reveal-child" appTilt>
            <span class="service-index">{{service.index}}</span>
            <div class="service-symbol">
              @switch (service.icon) {
                @case ('code') { <svg viewBox="0 0 48 48"><path d="m17 13-11 11 11 11M31 13l11 11-11 11M28 7l-8 34"/></svg> }
                @case ('layers') { <svg viewBox="0 0 48 48"><path d="m24 5 19 10-19 10L5 15 24 5Zm-17 19 17 10 17-10M7 33l17 10 17-10"/></svg> }
                @case ('pen') { <svg viewBox="0 0 48 48"><path d="m30 7 11 11-22 22-13 2 2-13L30 7Zm-18 19 11 11M27 10l11 11"/></svg> }
                @case ('server') { <svg viewBox="0 0 48 48"><rect x="5" y="6" width="38" height="14" rx="3"/><rect x="5" y="28" width="38" height="14" rx="3"/><path d="M12 13h1M12 35h1M20 13h16M20 35h16"/></svg> }
                @case ('play') { <svg viewBox="0 0 48 48"><rect x="5" y="9" width="38" height="30" rx="4"/><path d="m20 17 12 7-12 7V17Z"/></svg> }
                @default { <svg viewBox="0 0 48 48"><circle cx="13" cy="24" r="5"/><circle cx="35" cy="11" r="5"/><circle cx="35" cy="37" r="5"/><path d="m17 21 13-7M17 27l13 7"/></svg> }
              }
            </div>
            <div class="service-main"><h3>{{service.title}}</h3><p>{{service.description}}</p></div>
            <div class="service-tags">@for (tag of service.tags; track tag) { <span>{{tag}}</span> }</div><b class="service-arrow">↗</b>
          </article>
        }
      </div>
    </section>
  `,
})
export class ServicesSectionComponent { readonly services = input.required<ServiceItem[]>(); }
