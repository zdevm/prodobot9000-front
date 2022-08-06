import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService extends HttpService {

  constructor() {
    super('upload');
  }

  /**
   * 
   * @param file
   */
  uploadSingle(file: File): Observable<string> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<{ id: string }>(`${this.url}/single`, form)
                    .pipe(map(res => res.id))
  }

}
