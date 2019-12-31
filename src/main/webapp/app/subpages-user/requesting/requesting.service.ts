import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRequest } from 'app/shared/model/user-request.model';
import { INewRequest } from 'app/shared/model/new-request.model';

type EntityResponseType = HttpResponse<IUserRequest>;
type EntityArrayResponseType = HttpResponse<IUserRequest[]>;

@Injectable({ providedIn: 'root' })
export class RequestingService {
  public newRequestUrl = SERVER_API_URL + 'api/new-request';
  public myRequestsUrl = SERVER_API_URL + 'api/my-requests';

  constructor(protected http: HttpClient) {}

  /**
   * CREATE
   * publish a new userRequest
   * @param newRequest
   */
  publish(newRequest: INewRequest): Observable<EntityResponseType> {
    return this.http
      .post<INewRequest>(this.newRequestUrl, newRequest, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  /**
   * READ
   * Get all my requests
   * @param req
   */
  queryMyRequests(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserRequest[]>(this.myRequestsUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  /**
   * READ
   * Get any of my requests by id
   * @param id
   */
  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserRequest>(`${this.myRequestsUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  /**
   * PROCESS
   * Converts a date from server into a readable format
   * @param res response
   */
  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validTo = res.body.validTo != null ? moment(res.body.validTo) : null;
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
        userRequest.validTo = userRequest.validTo != null ? moment(userRequest.validTo) : null;
      });
    }
    return res;
  }
}
