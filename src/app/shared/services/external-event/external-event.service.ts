import { Injectable } from '@angular/core';
import { RefreshMessage } from '@shared/classes/refresh-message';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { EnvService } from '../env/env.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalEventService extends HttpService {
  private privateKey?: string;
  private source?: EventSource;
  private subject$ = new Subject<object>();
  private transformClassesMap = new Map<string, ClassConstructor<any>>(); // message type - Class (will be used to plainToInstance)

  constructor(private readonly envService: EnvService) {
    super('events')
    this.associateTypeWithClass(RefreshMessage.getType(), RefreshMessage);
  }

  associateTypeWithClass(type: string, classType: ClassConstructor<any>) {
    this.transformClassesMap.set(type, classType);
  }

  acquireChannel(): Observable<void> {
    if (this.privateKey) {
      return of();
    }
    return this.http.get<{ key: string }>(`${this.url}/subscribe/private`).pipe(
      tap((r: { key: string }) => this.privateKey = r.key),
      map(() => void 0)
    );
  }

  listen(): Observable<object> {
    if (!this.source) {
      this.createSource();
    }
    return this.subject$.asObservable();
  }

  reset() {
    if (this.source) {
      this.source.removeAllListeners?.();
      this.source.close();
      this.privateKey = undefined;
    }
  }

  private createSource() {
    const apiUrl = this.envService.getOrThrow('api.url')
    this.source = new EventSource(`${apiUrl}/events/private/${this.privateKey}`)
    this.source.onmessage = ({data}) => this.onMessage(JSON.parse(data))
  }

  private onMessage(data: { type: string; message: any }) {
    const classType = this.transformClassesMap.get(data.type);
    if (!classType) {
      return;
    }
    const message = plainToInstance<any, any>(classType, data?.message || {}, { excludeExtraneousValues: true });
    // Refresh private key and channel
    if (message instanceof RefreshMessage) {
      return this.onRefresh();
    }
    this.subject$.next(message);
  }

  private onRefresh() {
    if (this.source) {
      this.source.removeAllListeners?.();
      this.source.close();
    }
    this.source = undefined;
    this.privateKey = undefined;
    this.acquireChannel().subscribe(() => {
      this.listen();
    })
  }

}
