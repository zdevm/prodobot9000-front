import { Injectable } from '@angular/core';
import { EnvService } from '../env/env.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class FileService extends HttpService {

  constructor(private readonly envService: EnvService) {
    super('files');
  }

  public getFileUrl(fileId: string) {
    const apiUrl = this.envService.getOrThrow('api.url')
    return `${apiUrl}/${this.url}/${fileId}`;
  }

}
