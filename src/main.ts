import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Env } from '@shared/interfaces/env.interface';
import { HelperService } from '@shared/services/helper/helper.service';
import { EnvInjectionToken } from '@shared/tokens/env-service.token';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then(moduleRef => {
  const env: Env = moduleRef.injector.get(EnvInjectionToken);
  HelperService.isDevMode = env.production === false;
}, err => console.error(err))