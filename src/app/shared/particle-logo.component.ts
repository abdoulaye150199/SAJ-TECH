import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

@Component({
  selector: 'app-particle-logo',
  standalone: true,
  template: '<canvas #canvas aria-label="Logo SAJ Tech interactif"></canvas>',
  styles: ':host,canvas{display:block;width:100%;height:100%}canvas{touch-action:pan-y}',
})
export class ParticleLogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private readonly zone = inject(NgZone);
  private particles: Particle[] = [];
  private frame = 0;
  private observer?: ResizeObserver;
  private pointer = { x: -1000, y: -1000, active: false };
  private image = new Image();
  private reducedMotion = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.image.onload = () => this.rebuild();
    this.image.src = '/assets/Saj.png';
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerenter', this.onEnter);
    canvas.addEventListener('pointerleave', this.onLeave);
    this.resize();
    this.zone.runOutsideAngular(() => this.draw());
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio, 2);
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);
    if (this.image.complete && this.image.naturalWidth) this.rebuild();
  }

  private rebuild(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;

    const source = document.createElement('canvas');
    source.width = this.image.naturalWidth;
    source.height = this.image.naturalHeight;
    const sourceContext = source.getContext('2d', { willReadFrequently: true });
    if (!sourceContext) return;
    sourceContext.drawImage(this.image, 0, 0);
    const sourcePixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
    let minX = source.width;
    let minY = source.height;
    let maxX = 0;
    let maxY = 0;
    for (let y = 0; y < source.height; y += 2) {
      for (let x = 0; x < source.width; x += 2) {
        if (sourcePixels[(y * source.width + x) * 4 + 3] > 20) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    const sample = document.createElement('canvas');
    const maxSize = Math.min(width, height) * 0.82;
    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;
    const scale = maxSize / Math.max(cropWidth, cropHeight);
    const drawWidth = cropWidth * scale;
    const drawHeight = cropHeight * scale;
    const dpr = Math.min(devicePixelRatio, 2);
    sample.width = width * dpr;
    sample.height = height * dpr;
    const context = sample.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    context.scale(dpr, dpr);
    context.drawImage(
      this.image,
      minX, minY, cropWidth, cropHeight,
      (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight,
    );
    const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
    const step = width < 600 ? 7 : 6;
    const next: Particle[] = [];

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const px = Math.floor(x * dpr);
        const py = Math.floor(y * dpr);
        const index = (py * sample.width + px) * 4;
        if (pixels[index + 3] > 75) {
          next.push({
            x, y, ox: x, oy: y, vx: 0, vy: 0,
            color: `rgba(${pixels[index]},${pixels[index + 1]},${pixels[index + 2]},${Math.min(1, pixels[index + 3] / 210)})`,
            size: width < 600 ? 1.25 : 1.45,
          });
        }
      }
    }
    this.particles = next;
  }

  private readonly onMove = (event: PointerEvent): void => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.pointer.x = event.clientX - rect.left;
    this.pointer.y = event.clientY - rect.top;
    this.pointer.active = event.pointerType !== 'touch';
  };
  private readonly onEnter = (event: PointerEvent): void => this.onMove(event);
  private readonly onLeave = (): void => { this.pointer.active = false; };

  private draw = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    const dpr = Math.min(devicePixelRatio, 2);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    for (const particle of this.particles) {
      if (this.pointer.active && !this.reducedMotion) {
        const dx = particle.x - this.pointer.x;
        const dy = particle.y - this.pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 105;
        if (distance < radius && distance > 0) {
          const force = (radius - distance) / radius;
          particle.vx += (dx / distance) * force * 5.8;
          particle.vy += (dy / distance) * force * 5.8;
        }
      }

      particle.vx += (particle.ox - particle.x) * 0.035;
      particle.vy += (particle.oy - particle.y) * 0.035;
      particle.vx *= 0.87;
      particle.vy *= 0.87;
      particle.x += particle.vx;
      particle.y += particle.vy;

      context.beginPath();
      context.fillStyle = particle.color;
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    }
    this.frame = requestAnimationFrame(this.draw);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.observer?.disconnect();
    const canvas = this.canvasRef.nativeElement;
    canvas.removeEventListener('pointermove', this.onMove);
    canvas.removeEventListener('pointerenter', this.onEnter);
    canvas.removeEventListener('pointerleave', this.onLeave);
  }
}
