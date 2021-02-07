import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  public async onSubmit(){
    await this.authService.login();
    this.router.navigate(['orders']);
  }
}
