import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteData } from '../models/site-data.model';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly http = inject(HttpClient);

  readonly content = toSignal(
    this.http.get<SiteData>('/data/site-data.json'),
    { initialValue: null },
  );
}
