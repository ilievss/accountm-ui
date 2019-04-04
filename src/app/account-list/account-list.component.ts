import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  private accounts: Account[];
  private page = 1;
  private pageSize = 10;
  private collectionSize = 0;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.populateList(this.page, this.pageSize);
  }

  private populateList(page: number, pageSize: number) {
    this.accountService.getAccounts(page, pageSize)
      .subscribe(accountPage => {
        this.accounts = accountPage.content;
        this.collectionSize = accountPage.totalElements;
      },
      error => this.modalService.open('An error has occurred. ', { centered: true }));
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AccountDialogComponent);

    dialogRef.afterClosed().subscribe(_ => {
      this.populateList(this.page, this.pageSize);
    });
  }

  openEditDialog(account: Account) {
    this.dialog.open(AccountDialogComponent, {
      data: account
    });
  }

  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId)
      .subscribe(() => this.snackBar.open('Account deleted.', null, {
        duration: 2000
      }));
  }
}
