import { Component, HostListener, signal } from '@angular/core';
import { RevealDirective } from './shared/reveal.directive';
import { ParticleLogoComponent } from './shared/particle-logo.component';
import { TiltDirective } from './shared/tilt.directive';

interface Service {
  index: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-root',
  imports: [TiltDirective, RevealDirective, ParticleLogoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly services: Service[] = [
    {
      index: '01',
      icon: 'code',
      title: 'Développement web & mobile',
      description: 'Des plateformes rapides, robustes et pensées pour convertir, du prototype au produit final.',
      tags: ['Angular', 'Mobile', 'API'],
    },
    {
      index: '02',
      icon: 'layers',
      title: 'Design UI/UX',
      description: 'Des interfaces claires et mémorables qui transforment chaque parcours en expérience fluide.',
      tags: ['UX Research', 'UI Design', 'Prototype'],
    },
    {
      index: '03',
      icon: 'pen',
      title: 'Design graphique',
      description: 'Identités visuelles, supports de communication et créations qui rendent votre marque unique.',
      tags: ['Branding', 'Print', 'Digital'],
    },
    {
      index: '04',
      icon: 'server',
      title: 'Maintenance informatique',
      description: 'Installation, assistance et maintenance pour garder vos outils performants et disponibles.',
      tags: ['Support', 'Sécurité', 'Réseau'],
    },
    {
      index: '05',
      icon: 'play',
      title: 'Édition vidéo',
      description: 'Des contenus audiovisuels rythmés et professionnels pour capter l’attention de votre audience.',
      tags: ['Montage', 'Motion', 'Storytelling'],
    },
    {
      index: '06',
      icon: 'share',
      title: 'Réseaux sociaux',
      description: 'Une stratégie éditoriale cohérente pour construire votre communauté et amplifier votre impact.',
      tags: ['Stratégie', 'Contenu', 'Analytics'],
    },
  ];

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const root = document.documentElement;
    const distance = root.scrollHeight - innerHeight;
    const progress = distance > 0 ? scrollY / distance : 0;
    root.style.setProperty('--scroll-progress', `${progress}`);
    root.style.setProperty('--hero-shift', `${Math.min(scrollY * 0.16, 110)}px`);
    this.scrolled.set(scrollY > 80);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  scrollTo(id: string): void {
    this.menuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
