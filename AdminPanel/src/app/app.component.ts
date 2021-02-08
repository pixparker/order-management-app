import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AdminPanel';

  constructor(
    public router: Router,
    public authService:AuthService,
    public webSocketService:WebsocketService,
  ) {
    
  }



  async onLogout(){
    await this.authService.logout();
    this.router.navigate(['login']);
  }


}
