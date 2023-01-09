import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: String;
  password!: String;
  dataLogin:any={}



  constructor(

    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService

    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }


    this.authService.authenticateUser(user)
    .subscribe(data =>{

      this.dataLogin = data;

      if(this.dataLogin.success){

        this.authService.storeUserData(this.dataLogin.token, this.dataLogin.user);


        this.toastr.success(' Vous vous êtes connecté avec succés.' ,'Félicitation !',
        { positionClass : 'toast-top-right',
        timeOut:5000,
      })

          this.router.navigate(['assignments']);

      } else {
        this.toastr.error("L'utilisateur et/ou le mot de passe ne sont pas valides", 'Hum hum' ,
        { positionClass : 'toast-top-right',
        timeOut:5000,
      })

          this.router.navigate(['login']);

      }
    });

    // stocker l id de l user et le token de l user dans le local storage


  }

}
