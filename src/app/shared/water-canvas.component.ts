import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  life: number;
}

@Component({
  selector: 'app-water-canvas',
  standalone: true,
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styles: `
    :host, canvas { display: block; width: 100%; height: 100%; }
    canvas { touch-action: pan-y; }
  `,
})
export class WaterCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly ripples: Ripple[] = [];
  private animationFrame = 0;
  private resizeObserver?: ResizeObserver;
  private pointerX = 0.5;
  private pointerY = 0.5;
  private reducedMotion = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerenter', this.onPointerEnter);
    this.resize();
    this.zone.runOutsideAngular(() => this.render(0));
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.pointerX = (event.clientX - rect.left) / rect.width;
    this.pointerY = (event.clientY - rect.top) / rect.height;
    if (!this.reducedMotion && this.ripples.length < 10) {
      this.ripples.push({
        x: this.pointerX * rect.width,
        y: this.pointerY * rect.height,
        radius: 5,
        life: 1,
      });
    }
  };

  private readonly onPointerEnter = (event: PointerEvent): void => this.onPointerMove(event);

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(devicePixelRatio, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
  }

  private render = (time: number): void => {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;

    const dpr = Math.min(devicePixelRatio, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const glow = context.createRadialGradient(
      this.pointerX * width, this.pointerY * height, 0,
      this.pointerX * width, this.pointerY * height, width * 0.65,
    );
    glow.addColorStop(0, 'rgba(34, 218, 255, .25)');
    glow.addColorStop(0.38, 'rgba(8, 104, 255, .12)');
    glow.addColorStop(1, 'rgba(0, 17, 52, 0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const lines = this.reducedMotion ? 9 : 14;
    for (let line = 0; line < lines; line++) {
      const depth = line / lines;
      const baseY = height * (0.2 + depth * 0.75);
      context.beginPath();
      for (let x = -20; x <= width + 20; x += 7) {
        const wave = Math.sin(x * (0.018 + depth * 0.022) + time * 0.0013 + line) *
          (3 + depth * 8);
        const wave2 = Math.cos(x * 0.012 - time * 0.0008 + line * 0.7) * 3;
        const y = baseY + wave + wave2;
        x === -20 ? context.moveTo(x, y) : context.lineTo(x, y);
      }
      context.strokeStyle = `rgba(${80 + line * 5}, ${190 + line * 3}, 255, ${0.08 + depth * 0.2})`;
      context.lineWidth = 0.8 + depth * 1.6;
      context.stroke();
    }

    for (let index = this.ripples.length - 1; index >= 0; index--) {
      const ripple = this.ripples[index];
      ripple.radius += 1.8;
      ripple.life -= 0.015;
      context.beginPath();
      context.ellipse(ripple.x, ripple.y, ripple.radius * 2.5, ripple.radius * 0.65, 0, 0, Math.PI * 2);
      context.strokeStyle = `rgba(87, 226, 255, ${Math.max(0, ripple.life) * 0.45})`;
      context.lineWidth = 1.2;
      context.stroke();
      if (ripple.life <= 0) this.ripples.splice(index, 1);
    }

    this.animationFrame = requestAnimationFrame(this.render);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    const canvas = this.canvasRef.nativeElement;
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('pointerenter', this.onPointerEnter);
  }
}
