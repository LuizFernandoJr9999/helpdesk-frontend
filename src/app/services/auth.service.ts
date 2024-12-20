import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from '../models/credenciais';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  
  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    
    //return this.http.post(`${API_CONFIG.baseUrl}/login?Authorization=Bearer`, creds, {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
        observe: 'response',
      responseType: 'text'
    })
  }
  
  successfulLogin(authToken: string) {
    localStorage.setItem('token' , authToken);
  }

  isAuthenticated(){ 
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.clear();
  }
}