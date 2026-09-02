import { Component, computed, input, signal } from '@angular/core';
import { BrandData, ContactData } from '../../core/models/site-data.model';
import { RevealDirective } from '../../shared/reveal.directive';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact-section', standalone: true, imports: [RevealDirective],
  template: `
    <section class="contact" id="contact" appReveal>
      <div class="contact-left"><div class="section-kicker"><span>05</span><p>Contact</p></div><h2>UNE IDÉE ?<br /><em>FAISONS-LA<br />BOUGER.</em></h2>
        <div class="contact-meta"><a [href]="'mailto:' + contact().email">{{contact().email}} ↗</a><p>@for (location of brand().locations; track location) { {{location}}<br /> }</p><p>@for (phone of contact().phones; track phone.href) { <a [href]="'tel:' + phone.href">{{phone.label}}</a><br /> }</p></div>
      </div>
      <form class="project-form" #projectForm [attr.action]="nativeFormEndpoint()" method="post" (submit)="submitForm(projectForm, $event)">
        <p>Parlez-nous de votre projet</p>
        <label for="contact-name"><span>01 · Votre nom</span><input id="contact-name" name="name" autocomplete="name" required placeholder="Nom et prénom" /></label>
        <label for="contact-email"><span>02 · Votre email</span><input id="contact-email" name="email" type="email" autocomplete="email" required placeholder="vous@entreprise.com" /></label>
        <label for="contact-subject"><span>03 · Votre projet</span><input id="contact-subject" name="sujet" autocomplete="off" required placeholder="Site, application, identité..." /></label>
        <label for="contact-message"><span>04 · Votre message</span><textarea id="contact-message" name="message" rows="4" required minlength="10" autocomplete="off" placeholder="Quelques mots sur votre ambition"></textarea></label>
        <input class="honeypot" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <input type="hidden" name="_subject" value="Nouvelle demande de projet - SAJ Tech" />
        <input type="hidden" name="_template" value="table" />
        <button type="submit" [disabled]="status() === 'sending'" [attr.aria-busy]="status() === 'sending'">
          <span>{{ status() === 'sending' ? 'Envoi en cours...' : 'Envoyer la demande' }}</span><b>↗</b>
        </button>
        @if (status() === 'success') {
          <p class="form-feedback form-success" role="status">Merci, votre message a bien été envoyé. Nous revenons vers vous rapidement.</p>
        } @else if (status() === 'error') {
          <p class="form-feedback form-error" role="alert">L’envoi a échoué. Réessayez ou écrivez directement à <a [href]="'mailto:' + contact().email">{{ contact().email }}</a>.</p>
        }
      </form>
    </section>
  `,
})
export class ContactSectionComponent {
  readonly brand = input.required<BrandData>();
  readonly contact = input.required<ContactData>();
  readonly status = signal<FormStatus>('idle');
  readonly formEndpoint = computed(() => `https://formsubmit.co/ajax/${this.contact().email}`);
  readonly nativeFormEndpoint = computed(() => `https://formsubmit.co/${this.contact().email}`);

  async submitForm(form: HTMLFormElement, event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.status.set('sending');

    try {
      const response = await fetch(this.formEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      form.reset();
      this.status.set('success');
    } catch {
      this.status.set('error');
    }
  }
}
