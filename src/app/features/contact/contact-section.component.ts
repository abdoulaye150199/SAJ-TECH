import { Component, input } from '@angular/core';
import { BrandData, ContactData } from '../../core/models/site-data.model';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact-section', standalone: true, imports: [RevealDirective],
  template: `
    <section class="contact" id="contact" appReveal>
      <div class="contact-left"><div class="section-kicker"><span>05</span><p>Contact</p></div><h2>UNE IDÉE ?<br /><em>FAISONS-LA<br />BOUGER.</em></h2>
        <div class="contact-meta"><a [href]="'mailto:' + contact().email">{{contact().email}} ↗</a><p>@for (location of brand().locations; track location) { {{location}}<br /> }</p><p>@for (phone of contact().phones; track phone.href) { <a [href]="'tel:' + phone.href">{{phone.label}}</a><br /> }</p></div>
      </div>
      <form class="project-form" [action]="'mailto:' + contact().email" method="post" enctype="text/plain"><p>Parlez-nous de votre projet</p><label><span>01 · Votre nom</span><input name="nom" required placeholder="Nom et prénom" /></label><label><span>02 · Votre email</span><input name="email" type="email" required placeholder="vous@entreprise.com" /></label><label><span>03 · Votre projet</span><input name="sujet" required placeholder="Site, application, identité..." /></label><label><span>04 · Votre message</span><textarea name="message" rows="4" required placeholder="Quelques mots sur votre ambition"></textarea></label><button type="submit"><span>Envoyer la demande</span><b>↗</b></button></form>
    </section>
  `,
})
export class ContactSectionComponent {
  readonly brand = input.required<BrandData>();
  readonly contact = input.required<ContactData>();
}
