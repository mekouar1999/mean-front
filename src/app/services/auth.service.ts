
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


// import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any

 // const uri="https://deployversion.herokuapp.com/";

  constructor(private HttpClient:HttpClient) { }

  registerUser(user:any){
    let headers = new HttpHeaders();
    headers.append('Content-type' ,'application/json');
    return this.HttpClient.post('https://api-back-mean.herokuapp.com/users/register',user,{headers:headers})

    // with http client we dont need res -> res.json
  }

  authenticateUser(user:any){
    let headers = new HttpHeaders();
    headers.append('Content-type' ,'application/json');
    return this.HttpClient.post('https://api-back-mean.herokuapp.com/users/authenticate',user,{headers:headers})

    // with http client we dont need res -> res.json
  }

    getDashboard(user:any){
    let headers = new HttpHeaders();
    this.loadToken(); // on a acces a lauth token du local storage
    headers.append('Authorization', this.authToken);
    headers.append('Content-type' ,'application/json');
    return this.HttpClient.get('https://api-back-mean.herokuapp.com/users/assignments',{headers:headers})

    // with http client we dont need res -> res.json
  }



  storeUserData(token:any, user:any) {

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // pour recuperer le token stocke dans le localstorage

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // si l'utilisateur se deconnecte , on retire les valeurs de l id de l'utilisateur et son token du localstorage

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getAuthStatus() {


   if (this.authToken == null ){
    return false
   }else return true
  }

}


