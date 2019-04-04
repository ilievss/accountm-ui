import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  CREATE_URL = environment.apiBaseUrl + '/account';
  GET_MULTIPLE_URL = environment.apiBaseUrl + '/account';
  editUrl = accountId => environment.apiBaseUrl + `/account/${accountId}`;
  deleteUrl = accountId => environment.apiBaseUrl + `/account/${accountId}`;

  constructor(
    private http: HttpClient
  ) { }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.CREATE_URL, account);
  }

  getAccounts(page: number, pageSize: number): Observable<Page<Account>> {
    const options = {
      params: {
        page: (page - 1).toString(),
        pageSize: pageSize.toString()
      }
    };

    return this.http.get<Page<Account>>(this.GET_MULTIPLE_URL, options);
  }

  editAccount(accountId: number, account: Account): Observable<Account> {
    return this.http.post<Account>(this.editUrl(accountId), account);
  }

  deleteAccount(accountId: number): Observable<void> {
    return this.http.delete<void>(this.deleteUrl(accountId));
  }
}
