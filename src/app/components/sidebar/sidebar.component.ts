import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
   ) { }

  ngOnInit() {
  }


  onLogoutClick() {
    this.authService.logout();
    this.toastr.success('Vous vous êtes deconnecté avec succes');
    this.router.navigate(['/home']);
    return false;
  }
}
