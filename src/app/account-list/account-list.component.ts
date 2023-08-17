import { Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {AuthService} from "../app-auth.service";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{
  accounts: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();
    console.log('authToken', authToken);
    if (authToken != null) {
      this.apiService.setAuthToken(authToken);
    }

    this.apiService.getAccounts().subscribe(
      (accounts) => {
        this.accounts = accounts;
        console.log('Accounts', accounts);
      },
      (error) => {
        console.error('Accounts retrieval failed', error);
      }
    );
  }
}
