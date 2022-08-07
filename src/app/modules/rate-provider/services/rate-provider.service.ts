import { Injectable } from '@angular/core';
import { HelperService } from '@shared/services/helper/helper.service';
import { HttpService } from '@shared/services/http/http.service';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { RateProvider } from '../classes/rate-provider';
import { RateProviderFormOptions } from '../interfaces/form-options.interface';

@Injectable({
  providedIn: 'root'
})
export class RateProviderService extends HttpService {

  constructor() {
    super('providers');
  }

  getFormOptions(providerSlug: string) {
    return this.http.get<RateProviderFormOptions>(`${this.url}/${providerSlug}/form-options`);
  }

  getProviders() {
    return this.http.get<RateProvider[]>(this.url).pipe(map(RateProviderService.transform))
                                                  .pipe(map(val => HelperService.toArray<RateProvider>(val)))
  }

  static transform(raw: any) {
    return plainToInstance(RateProvider, raw, { excludeExtraneousValues: true });
  }

}
