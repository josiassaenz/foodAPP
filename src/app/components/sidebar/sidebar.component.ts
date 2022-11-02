import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'app/login/login.component';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from 'app/auth.guard';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles: any[];    
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', roles: ['ROLE_SUPER_ADMIN','ROLE_ADMIN'] },
    { path: '/facilitator', title: 'Registro Nuevo Staff',  icon:'account_box', class: '', roles: ['ROLE_SUPER_ADMIN'] },
    { path: '/user-profile', title: 'Registro Beneficiario',  icon:'receipt', class: '', roles: ['ROLE_SUPER_ADMIN','ROLE_ADMIN'] },
    { path: '/delivery', title: 'Entrega Alimentos',  icon:'card_travel', class: '', roles: ['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACILITATOR'] },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/table-list', title: 'Listas',  icon:'content_paste', class: '', roles: ['ROLE_SUPER_ADMIN','ROLE_ADMIN'] },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  roles: any = [];

  constructor(
    private authService: AuthService,
    private loginComponent: LoginComponent,
  ) { 
    this.roles = this.loginComponent.getDataRoles();
  }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    // console.log('Rol: ',this.roles);
    this.menuItems = ROUTES.filter(menuItem => menuItem.roles.includes(this.roles));
    // console.log('Menú: ', this.menuItems);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(){
    this.loginComponent.deleteData();
    this.authService.logout();
  }
}
