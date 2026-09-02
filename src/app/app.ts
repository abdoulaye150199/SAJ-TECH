import { Component, HostListener, ViewEncapsulation, inject, signal } from '@angular/core';
import { SiteContentService } from './core/services/site-content.service';
import { ContactSectionComponent } from './features/contact/contact-section.component';
import { HeroSectionComponent } from './features/home/hero-section.component';
import { StatementSectionComponent } from './features/home/statement-section.component';
import { ReviewsSectionComponent } from './features/reviews/reviews-section.component';
import { ServicesSectionComponent } from './features/services/services-section.component';
import { TeamSectionComponent } from './features/team/team-section.component';
import { SiteFooterComponent } from './layout/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header.component';

@Component({
  selector: 'app-root',
  imports: [
    SiteHeaderComponent,
    SiteFooterComponent,
    HeroSectionComponent,
    StatementSectionComponent,
    ServicesSectionComponent,
    TeamSectionComponent,
    ReviewsSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  private readonly siteContent = inject(SiteContentService);

  protected readonly content = this.siteContent.content;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly currentYear = new Date().getFullYear();

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  updateScrollState(): void {
    const root = document.documentElement;
    const scrollableDistance = root.scrollHeight - window.innerHeight;
    const progress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;

    root.style.setProperty('--scroll-progress', `${progress}`);
    root.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.16, 110)}px`);
    this.scrolled.set(window.scrollY > 80);
  }

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  navigateTo(sectionId: string): void {
    this.menuOpen.set(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
