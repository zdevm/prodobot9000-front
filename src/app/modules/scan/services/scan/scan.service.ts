import { Injectable } from '@angular/core';
import { Scan } from '@modules/scan/classes/scan';
import { ScanUpdatedMessage } from '@modules/scan/messages/scan-updated.message';
import { ExternalEventService } from '@shared/services/external-event/external-event.service';
import { HttpService } from '@shared/services/http/http.service';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanService extends HttpService {

  constructor(private readonly eventService: ExternalEventService) {
    super('scans');
    this.eventService.associateTypeWithClass(ScanUpdatedMessage.getType(), ScanUpdatedMessage)
  }

  findById(id: string) {
    this.http.get<Scan>(`${this.url}/${id}`).pipe(map(doc => <Scan>ScanService.transform(doc)));
  }

  findLatestByProduct(productId: string) {
    return this.http.get<Scan>(`${this.url}/product/${productId}/latest`).pipe(map(doc => <Scan>ScanService.transform(doc)));
  }

  static transform(raw: any) {
    return plainToInstance(Scan, raw, { excludeExtraneousValues: true })
  }

}
