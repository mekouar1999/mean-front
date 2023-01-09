import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;
  dataRegister:any={}


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

     // Required Fields
     if(!this.validateService.validateRegister(user)) {
      this.toastr.error('Veuillez remplir tout le formulaire','hum hum' , { positionClass : 'toast-top-right',
      timeOut:5000 }
      );
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.toastr.error('Veuillez mettre une adresse mail valide','hum hum' , { positionClass : 'toast-top-right',
      timeOut:5000 }
      );
    return false;

    // jai mis les alertes en attendant les flash messages

    }




    // Register user

    this.authService.registerUser(user)
    .subscribe(data =>{

      this.dataRegister = data;
      if(this.dataRegister.success){

        this.toastr.success("Vous êtes desormais inscrit ! Vous pourrez désormais pouvoir vous connecter via la page de connexion disponible au niveau de l'onglet LOGIN" , 'Felicitation', { positionClass : 'toast-top-right',
        timeOut:5000
      })

        this.router.navigate(['/login']);
      } else {

        this.toastr.error('Il semble y avoir un problème au niveau de votre inscription, Veuillez ressayez dans quelques instants' , ' Hum hum ', { positionClass : 'toast-top-right',
        timeOut:5000
      })

        this.router.navigate(['/register']);
      }
    });

    return true;



  }}
