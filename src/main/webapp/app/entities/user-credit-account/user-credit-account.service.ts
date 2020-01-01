import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserCreditAccount } from 'app/shared/model/user-credit-account.model';

type EntityResponseType = HttpResponse<IUserCreditAccount>;
type EntityArrayResponseType = HttpResponse<IUserCreditAccount[]>;

@Injectable({ providedIn: 'root' })
export class UserCreditAccountService {
  public resourceUrl = SERVER_API_URL + 'api/user-credit-accounts';

  constructor(protected http: HttpClient) {}

  create(userCreditAccount: IUserCreditAccount): Observable<EntityResponseType> {
    return this.http.post<IUserCreditAccount>(this.resourceUrl, userCreditAccount, { observe: 'response' });
  }

  update(userCreditAccount: IUserCreditAccount): Observable<EntityResponseType> {
    return this.http.put<IUserCreditAccount>(this.resourceUrl, userCreditAccount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserCreditAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserCreditAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
