import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationRepositorio } from '../repositorios/authenticationrepositorio.service';
import { Usuario } from '../modelo/entidades/usuario';
import { UserToken } from '../modelo/entidades/userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  showMenuEmitter = new EventEmitter<boolean>();
  showRegisterEmitter = new EventEmitter<boolean>();
  showLoginEmitter = new EventEmitter<boolean>();
  showAllMenu = new EventEmitter<boolean>();
  showNav = new EventEmitter<boolean>();
  showHamburguerMenu = new EventEmitter<boolean>();
  isAuthenticated = false;
  viewRouta = true;
  userToken: UserToken;
  // private loggedIn = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  // set setLoggedIn(value: boolean) {
  //   this.loggedIn.next(value);
  // }



  constructor(private repositorio: AuthenticationRepositorio, public router: Router) {
    this.autenticar();
   }

  ngOnInit() {
    // this.showMenuEmitter.emit(true);
    // this.showAllMenu.emit(true);
    // this.showNav.emit(true);
    // this.showLoginEmitter.emit(false);

  }

  getAuthenticatedUser() : string{
    throw new Error('Method not implemented.');
  }

  login(usuario: Usuario) : Observable<UserToken> {
    return this.repositorio.login(usuario);
    // this.showHamburguerMenu.emit(true);
    // this.showMenuEmitter.emit(true);
    // this.showAllMenu.emit(true);
    // this.showNav.emit(true);
    // this.isAuthenticated = true;
    // this.showLoginEmitter.emit(false);
    // this.router.navigate(['']);
  }

  autenticar(){

    if ((localStorage.getItem("jwt") !="" && localStorage.getItem("jwt") != null)) {
      // this.userToken.token = localStorage.getItem("jwt");
      this.isAuthenticated = true;
      // this.router.navigate(['']);
    } else {
      this.isAuthenticated = false;
      this.showLoginEmitter.emit(true);
      this.router.navigate(['/login']);
    }
    // this.showHamburguerMenu.emit(true);
    // this.showAllMenu.emit(false);
    // this.showNav.emit(true);
  }

  register(){
    this.showRegisterEmitter.emit(true);
    this.showLoginEmitter.emit(false);
    this.showMenuEmitter.emit(false);
    this.router.navigate(['register']);
  }


  logout() {
    // this.showHamburguerMenu.emit(false);
    // this.showMenuEmitter.emit(true);
    // this.showAllMenu.emit(true);
    // this.showNav.emit(false);
    this.isAuthenticated = false;
    localStorage.removeItem("jwt");
    this.userToken = null;
    this.showLoginEmitter.emit(true);
    // this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem("jwt");
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedPayload = this.base64Decode(parts[1]);
        return JSON.parse(decodedPayload);
      }
    }
    return null;
  }

  private base64Decode(str: string): string {
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  isRole(role: string): boolean {
    const roleAuthenticatedUser: string = this.getDecodedToken().role;
    if (roleAuthenticatedUser===role) {
      return true;
    }
    return false;
  }

  getRole(): string {
    const roleAuthenticatedUser: string = this.getDecodedToken().role;
    return roleAuthenticatedUser;
  }


}
