import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  constructor(private http: HttpClient) { }

  getDeadline(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>('http://localhost:3000/api/deadline');
  }
}
