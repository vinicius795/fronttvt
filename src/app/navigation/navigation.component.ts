import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { menus} from "./navigation.inteface";
import { menulist} from "../mocks/menus"
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  _menulist = menulist;
  menubase: menus;
  utilits: Utilit[] = [
    { link: "https://sistema.ssw.inf.br/", name: "SSW Sistema"}
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    ) {}

  logout(){
    this.auth.logout();
    window.location.reload();
  }

}

interface Utilit {
  link: string;
  name: string;
}