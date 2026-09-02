import { Component, input } from '@angular/core';
import { TeamMember } from '../../core/models/site-data.model';
import { RevealDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';

@Component({
  selector: 'app-team-section', standalone: true, imports: [RevealDirective, TiltDirective],
  template: `
    <section class="team" id="team" appReveal>
      <header class="team-head"><div class="section-kicker"><span>03</span><p>Le collectif</p></div><h2>3 REGARDS.<br /><em>UNE VISION.</em></h2><p>Une équipe resserrée, complémentaire et impliquée à chaque étape de votre projet.</p></header>
      <div class="team-stack">
        @for (member of members(); track member.index; let i = $index) {
          <article class="person reveal-child" [class.person-middle]="i === 1" appTilt>
            <figure><img [src]="member.photo" [alt]="member.name" /><figcaption>{{member.index}} — {{member.position}}</figcaption></figure>
            <div><h3>{{member.name}}</h3><p>@for (line of roleLines(member.role); track line) { {{line}}<br /> }</p></div>
          </article>
        }
      </div>
    </section>
  `,
})
export class TeamSectionComponent {
  readonly members = input.required<TeamMember[]>();

  protected roleLines(role: string): string[] {
    return role.split(' / ');
  }
}
