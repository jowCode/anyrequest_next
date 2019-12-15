import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContribution } from 'app/shared/model/contribution.model';

type EntityResponseType = HttpResponse<IContribution>;
type EntityArrayResponseType = HttpResponse<IContribution[]>;

@Injectable({ providedIn: 'root' })
export class ContributionService {
  public resourceUrl = SERVER_API_URL + 'api/contributions';

  constructor(protected http: HttpClient) {}

  create(contribution: IContribution): Observable<EntityResponseType> {
    return this.http.post<IContribution>(this.resourceUrl, contribution, { observe: 'response' });
  }

  update(contribution: IContribution): Observable<EntityResponseType> {
    return this.http.put<IContribution>(this.resourceUrl, contribution, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContribution>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContribution[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
