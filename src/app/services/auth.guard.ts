import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router,
    private toastr: ToastrService) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		var isAuthenticated = this.authService.getAuthStatus();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
      this.toastr.error("Vous devez vous connecter afin d'acceder aux Assignements",'hum hum' , { positionClass : 'toast-top-right',
      timeOut:5000 }
      );

		}
		return isAuthenticated;
	}
}
