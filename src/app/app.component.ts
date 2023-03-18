import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'genesis-test';

  constructor(public service: AuthService) {}
  ngOnInit() {
    this.service.getToken().subscribe((data: any) => localStorage.setItem('token', data.token));
  }
}
