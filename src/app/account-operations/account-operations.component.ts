import { Component, Input } from '@angular/core';
import {ApiService} from "../api.service";
import {AuthService} from "../app-auth.service";

@Component({
  selector: 'app-account-operations',
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.css']
})
export class AccountOperationsComponent {
  @Input() account: any; // Input property to receive account data
  @Input() transferBalance: any; // Input property to receive accounts data

  constructor(private apiService: ApiService, private authService: AuthService) {}
  debit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken != null) {
      this.apiService.setAuthToken(authToken);
    }
    this.apiService.addBalance(this.account.id, this.account.amount).subscribe(
      () => {
        console.log('Balance added');
      },
      (error) => {
        console.error('Balance addition failed', error);
      })

    // Implement debit logic here
  }

  credit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken != null) {
      this.apiService.setAuthToken(authToken);
    }
    this.apiService.subtractBalance(this.account.id, this.account.amount).subscribe(
      () => {
        console.log('Balance subtracted');
      },
      (error) => {
        console.error('Balance subtraction failed', error);
      })
    // Implement credit logic here
  }

  transfer(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken != null) {
      this.apiService.setAuthToken(authToken);
    }
    this.apiService.TransferBalance(this.transferBalance.fromId, this.transferBalance.toId, this.transferBalance.amount).subscribe(
      () => {
        console.log('Balance transferred');
      },
      (error) => {
        console.error('Balance transfer failed', error);
      })
    // Implement transfer logic here
  }
}
