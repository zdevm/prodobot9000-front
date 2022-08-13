import { InjectionToken } from "@angular/core";
import { Env } from "@shared/interfaces/env.interface";
import { environment } from "src/environments/environment";

export const EnvInjectionToken = new InjectionToken<Env>('ENVIRONMENT Injection token', {
    providedIn: 'root',
    factory: () => environment
  });