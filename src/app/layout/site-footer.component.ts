import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  template: `<footer class="footer"><div><img src="/assets/Saj.png" alt="" /><strong>SAJ TECH</strong></div><p>© {{year()}} — Tous droits réservés</p><button (click)="navigate.emit('home')">Retour en haut ↑</button></footer>`,
})
export class SiteFooterComponent {
  readonly year = input.required<number>();
  readonly navigate = output<string>();
}
