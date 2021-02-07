import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements CanActivate  {
  

  public hasUser: boolean = false;
  
  constructor(
    public router: Router
    ) { }

    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      this.hasUser = false;
      return false;
    }
    this.hasUser = true;
    return true;
  }

  public getToken(){
    return 'test token';
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    //mock auth
    return token? true: false;
  }


  public async login(){
    localStorage.setItem('token','mock-token');
    this.hasUser = true;
  }

  public async logout(){
    localStorage.removeItem('token');
    this.hasUser = false;
  }

}
