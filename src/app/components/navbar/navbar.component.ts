import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
   ) { }

  ngOnInit() {
  }

  open_toogle(){

    console.log("toogle actif");
    this.router.navigate(['/sidebar']);

    

  }

  onLogoutClick() {
    this.authService.logout();
    this.toastr.success('Vous vous êtes deconnecté avec succes');
    this.router.navigate(['/home']);
    return false;
  }
}
