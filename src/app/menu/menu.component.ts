import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isProd = false;
  isAdmin = false;
  isUser = false;
  roles: string[];

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    /** */
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol.indexOf('ROLE_ADMIN') === 0) {
        this.isAdmin = true;
      }
      if (rol.indexOf('ROLE_PROD') === 0) {
        this.isProd = true;
      }
      if (rol.indexOf('ROLE_USER') === 0) {
        this.isUser = true;
      }
    });

  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
