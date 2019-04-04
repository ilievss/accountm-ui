import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AccountService } from '../service/account.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent {

  public accountData: Account = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    birthDate: null,
    version: 0,
    displayName: null,
    rpDisplayName: null,
  };

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public account: Account,
    private snackBar: MatSnackBar) {
      if (account != null) {
        Object.assign(this.accountData, this.account);
      }
  }

  onSaveClick() {
    let operation;
    if (this.account == null) {
      operation = this.accountService.createAccount(this.accountData);
    } else {
      operation = this.accountService.editAccount(parseInt(this.account.id, 10), this.accountData)
        .pipe(tap(account => Object.assign(this.account, account)));
    }

    operation.subscribe(_ => {
      this.snackBar.open('Account saved successfully!', null, {
        duration: 2000
      });
      this.dialogRef.close();
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
