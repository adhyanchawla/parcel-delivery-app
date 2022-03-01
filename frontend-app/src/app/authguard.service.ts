// auth guard service that inhabits navigating between urls
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate{
    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isUserLoggedIn();
      }

      isUserLoggedIn(){
        let userToken = localStorage.getItem("token") ? localStorage.getItem("token") : false;
        if(userToken){
          return true;
        }
        else {
          this.router.navigate(['/']);
          return false;
        }
      }  

}