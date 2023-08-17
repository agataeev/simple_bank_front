import { Component } from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from './app-auth.service';


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  accountId: number = 0;
  loggedIn: boolean = false;
  username: string = '';
  pin: string = '';
  type: number = 1;
  balance: number = 0;
  currency: number = 1;
  active: boolean = true;
  rights: number = 1;


  constructor(private apiService: ApiService, private authService: AuthService) {}

  onDeleteAccount(): void{
    if (this.accountId) {
      const authToken = this.authService.getAuthToken();
      if (authToken != null) {
        this.apiService.setAuthToken(authToken);
      }
    }
    this.apiService.deleteAccount(this.accountId).subscribe(
      () => {
        console.log('Account deleted');
      },
      (error) => {
        console.error('Account deletion failed', error);
      }
    );
  }

  createUser(): void {
    this.apiService.createUser(this.username, this.pin).subscribe(
      () => {
        console.log('User created');
      },
      (error) => {
        console.error('User creation failed', error);
      }
    );
  }

  createAccount(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken != null) {
      this.apiService.setAuthToken(authToken);
    }
    this.apiService.createAccount(this.type, this.balance, this.currency, this.active).subscribe(
      () => {
        console.log('Account created');
      },
      (error) => {
        console.error('Account creation failed', error);
      }
    );
  }

  login(): void {
    this.apiService.login(this.username, this.pin).subscribe(
      (jwtResponse) => {
        console.log('Login successful', jwtResponse);
        this.authService.setAuthToken(jwtResponse.jwt);
        this.loggedIn = true;
      },
      (error) => {
        console.error('Login failed', error);
        // Handle error, show error message, etc.
      }
    );
  }

  logout(): void {
    this.apiService.logout().subscribe(
      () => {
        this.loggedIn = false;
      },
      (error) => {
        console.error('Logout failed', error);
        // Handle error, show error message, etc.
      }
    );
  }
}


export interface JwtResponse {
  refreshToken: string
  accessTokenExpiration: string
  permission: any[]
  jwt: string
}
