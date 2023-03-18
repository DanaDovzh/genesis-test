import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  URL = 'https://api.wisey.app/api/v1/core/preview-courses';

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get(`${this.URL}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  getCourse(courseId: any) {
    return this.http.get(`${this.URL}/${courseId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }
}
