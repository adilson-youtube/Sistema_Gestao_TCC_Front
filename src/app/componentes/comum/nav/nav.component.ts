import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/servicos/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private authenticationService: AuthenticationService,private breakpointObserver: BreakpointObserver) {}

  @Input()
  showMenu: boolean = false;


  onLogout(){
    this.authenticationService.logout();
  }
}
