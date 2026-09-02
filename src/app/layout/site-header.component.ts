import { Component, input, output } from '@angular/core';
import { NavigationItem } from '../core/models/site-data.model';

@Component({
  selector: 'app-site-header',
  standalone: true,
  template: `
    <header class="nav" [class.scrolled]="scrolled()">
      <button class="nav-brand" type="button" (click)="navigate.emit('home')" aria-label="Accueil SAJ Tech">
        <img src="/assets/Saj.png" alt="" /><span>SAJ TECH</span>
      </button>
      <nav class="nav-links" aria-label="Navigation principale">
        @for (item of primaryNavigation(); track item.target) {
          <button (click)="navigate.emit(item.target)">{{ item.label }}</button>
        }
      </nav>
      <button class="nav-cta" (click)="navigate.emit('contact')">Démarrer un projet <span>↗</span></button>
      <button class="menu-trigger" (click)="menuToggle.emit()" [attr.aria-expanded]="menuOpen()" aria-label="Ouvrir le menu"><i></i><i></i></button>
    </header>
    <aside class="menu-panel" [class.open]="menuOpen()">
      <div class="menu-panel-top"><span>Navigation</span><button (click)="menuToggle.emit()">Fermer ×</button></div>
      <nav>
        @for (item of navigation(); track item.target; let i = $index) {
          <button (click)="navigate.emit(item.target)"><small>0{{i + 1}}</small><strong>{{item.label}}</strong><span>↗</span></button>
        }
      </nav>
    </aside>
  `,
})
export class SiteHeaderComponent {
  readonly navigation = input.required<NavigationItem[]>();
  readonly scrolled = input.required<boolean>();
  readonly menuOpen = input.required<boolean>();
  readonly navigate = output<string>();
  readonly menuToggle = output<void>();

  protected primaryNavigation(): NavigationItem[] {
    return this.navigation().filter(({ target }) => ['services', 'team', 'reviews'].includes(target));
  }
}
