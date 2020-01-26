import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { IContribution } from 'app/shared/model/contribution.model';
import { IUserContribution } from 'app/shared/model/userContribution';

type EntityResponseType = HttpResponse<IUserRequest>;
type EntityArrayResponseType = HttpResponse<IUserRequest[]>;

@Injectable({ providedIn: 'root' })
export class ContributingService {
  public allRequests = SERVER_API_URL + 'api/user/global-requests';
  public contribute = SERVER_API_URL + 'api/user/global-requests/contribute';

  constructor(protected http: HttpClient) {}

  /**
   * READ
   * Get all requests
   * @param req
   */
  getAllRequests(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserRequest[]>(this.allRequests, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  /**
   * READ
   * Get a userRequest by ID
   * @param id
   */
  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserRequest>(`${this.allRequests}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  /**
   * CREATE
   * Contribute to a users request
   * @param userContribution
   */
  create(userContribution: IUserContribution): Observable<EntityResponseType> {
    return this.http.post<IContribution>(this.contribute, userContribution, { observe: 'response' });
  }

  /**
   * PROCESS
   * Converts a date from server into a readable format
   * @param res response
   */
  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  /**
   * PROCESS
   * Converts dates from server into a readable format
   * @param res response
   */
  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userRequest: IUserRequest) => {
        userRequest.validTo = userRequest.validTo ? moment(userRequest.validTo) : undefined;
      });
    }
    return res;
  }
}
