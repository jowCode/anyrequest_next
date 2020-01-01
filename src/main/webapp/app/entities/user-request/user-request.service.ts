import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUserRequest } from 'app/shared/model/user-request.model';

type EntityResponseType = HttpResponse<IUserRequest>;
type EntityArrayResponseType = HttpResponse<IUserRequest[]>;

@Injectable({ providedIn: 'root' })
export class UserRequestService {
  public resourceUrl = SERVER_API_URL + 'api/user-requests';

  constructor(protected http: HttpClient) {}

  create(userRequest: IUserRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userRequest);
    return this.http
      .post<IUserRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(userRequest: IUserRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(userRequest);
    return this.http
      .put<IUserRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUserRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUserRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(userRequest: IUserRequest): IUserRequest {
    const copy: IUserRequest = Object.assign({}, userRequest, {
      validTo: userRequest.validTo && userRequest.validTo.isValid() ? userRequest.validTo.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((userRequest: IUserRequest) => {
        userRequest.validTo = userRequest.validTo ? moment(userRequest.validTo) : undefined;
      });
    }
    return res;
  }
}
