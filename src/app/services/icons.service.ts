import {Http,URLSearchParams} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class IconService {
  icons: any = [
      {
        "_id": "5bebabd3b4dbbc123f0c1a21",
        "icons": "fa fa-user",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebabe4b4dbbc123f0c1a22",
        "icons": "fa fa-user-o",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebabf4b4dbbc123f0c1a23",
        "icons": "fa fa-user-circle-o",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac05b4dbbc123f0c1a24",
        "icons": "fa fa-user-circle",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac22b4dbbc123f0c1a26",
        "icons": "fa fa-envelope-o",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac2db4dbbc123f0c1a27",
        "icons": "fa fa-envelope-open",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac38b4dbbc123f0c1a28",
        "icons": "fa fa-phone",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac46b4dbbc123f0c1a29",
        "icons": "fa fa-phone-square",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac52b4dbbc123f0c1a2a",
        "icons": "fa fa-volume-control-phone",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac5eb4dbbc123f0c1a2b",
        "icons": "fa fa-mobile",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac70b4dbbc123f0c1a2c",
        "icons": "fa fa-sort-numeric-desc",
        "updated_at": "2020-06-04T09:49:08.062Z",
        "created_at": "2020-06-04T09:49:08.062Z"
      },
      {
        "_id": "5bebac7fb4dbbc123f0c1a2d",
        "icons": "fa fa-location-arrow",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5bebac8bb4dbbc123f0c1a2e",
        "icons": "fa fa-map-marker",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5bebac9db4dbbc123f0c1a2f",
        "icons": "fa fa-map-pin",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5c07760c1633a412cb2c8c1d",
        "icons": "fa fa-angle-double-down",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5c0776211633a412cb2c8c1e",
        "icons": "fa fa-angle-double-left",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5c0776351633a412cb2c8c1f",
        "icons": "fa fa-angle-double-right",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5c0776441633a412cb2c8c20",
        "icons": "fa fa-angle-double-up",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "_id": "5c0776661633a412cb2c8c21",
        "icons": "fa fa-mobile",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "icons": "fa fa-birthday-cake",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "icons": "fa fa-bitcoin",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "icons": "fa fa-bitbucket",
        "updated_at": "2020-06-04T09:49:08.063Z",
        "created_at": "2020-06-04T09:49:08.063Z"
      },
      {
        "icons": "fa fa-bitbucket-square",
        "updated_at": "2020-06-04T09:49:08.064Z",
        "created_at": "2020-06-04T09:49:08.064Z"
      },
      {
        "icons": "fa fa-black-tie",
        "updated_at": "2020-06-04T09:49:08.064Z",
        "created_at": "2020-06-04T09:49:08.064Z"
      },
      {
        "icons": "fa fa-bluetooth",
        "updated_at": "2020-06-04T09:49:08.064Z",
        "created_at": "2020-06-04T09:49:08.064Z"
      },
      {
        "icons": "fa fa-bluetooth-b",
        "updated_at": "2020-06-04T09:49:08.065Z",
        "created_at": "2020-06-04T09:49:08.065Z"
      },
      {
        "icons": "fa fa-bolt",
        "updated_at": "2020-06-04T09:49:08.065Z",
        "created_at": "2020-06-04T09:49:08.065Z"
      },
      {
        "icons": "fa fa-building",
        "updated_at": "2020-06-04T09:49:08.065Z",
        "created_at": "2020-06-04T09:49:08.065Z"
      },
      {
        "icons": "fa fa-bullhorn",
        "updated_at": "2020-06-04T09:49:08.066Z",
        "created_at": "2020-06-04T09:49:08.066Z"
      },
      {
        "icons": "fa fa-bullseye",
        "updated_at": "2020-06-04T09:49:08.066Z",
        "created_at": "2020-06-04T09:49:08.066Z"
      },
      {
        "icons": "fa fa-bus",
        "updated_at": "2020-06-04T09:49:08.067Z",
        "created_at": "2020-06-04T09:49:08.067Z"
      },
      {
        "icons": "fa fa-buysellads",
        "updated_at": "2020-06-04T09:49:08.067Z",
        "created_at": "2020-06-04T09:49:08.067Z"
      },
      {
        "icons": "fa fa-chain",
        "updated_at": "2020-06-04T09:49:08.067Z",
        "created_at": "2020-06-04T09:49:08.067Z"
      },
      {
        "icons": "fa fa-check",
        "updated_at": "2020-06-04T09:49:08.068Z",
        "created_at": "2020-06-04T09:49:08.068Z"
      },
      {
        "icons": "fa fa-cab",
        "updated_at": "2020-06-04T09:49:08.068Z",
        "created_at": "2020-06-04T09:49:08.068Z"
      },
      {
        "icons": "fa fa-calendar",
        "updated_at": "2020-06-04T09:49:08.068Z",
        "created_at": "2020-06-04T09:49:08.068Z"
      },
      {
        "icons": "fa fa-child",
        "updated_at": "2020-06-04T09:49:08.074Z",
        "created_at": "2020-06-04T09:49:08.074Z"
      },
      {
        "icons": "fa fa-crosshairs",
        "updated_at": "2020-06-04T09:49:08.074Z",
        "created_at": "2020-06-04T09:49:08.074Z"
      },
      {
        "icons": "fa fa-cube",
        "updated_at": "2020-06-04T09:49:08.075Z",
        "created_at": "2020-06-04T09:49:08.075Z"
      },
      {
        "icons": "fa fa-cloud",
        "updated_at": "2020-06-04T09:49:08.075Z",
        "created_at": "2020-06-04T09:49:08.075Z"
      },
      {
        "icons": "fa fa-code",
        "updated_at": "2020-06-04T09:49:08.076Z",
        "created_at": "2020-06-04T09:49:08.076Z"
      },
      {
        "icons": "fa fa-digg",
        "updated_at": "2020-06-04T09:49:08.076Z",
        "created_at": "2020-06-04T09:49:08.076Z"
      },
      {
        "icons": "fa fa-comment",
        "updated_at": "2020-06-04T09:49:08.079Z",
        "created_at": "2020-06-04T09:49:08.079Z"
      },
      {
        "icons": "fa fa-coffee",
        "updated_at": "2020-06-04T09:49:08.079Z",
        "created_at": "2020-06-04T09:49:08.079Z"
      },
      {
        "icons": "fa fa-edit",
        "updated_at": "2020-06-04T09:49:08.080Z",
        "created_at": "2020-06-04T09:49:08.080Z"
      },
      {
        "icons": "fa fa-ellipsis-h",
        "updated_at": "2020-06-04T09:49:08.080Z",
        "created_at": "2020-06-04T09:49:08.080Z"
      },
      {
        "icons": "fa fa-ellipsis-v",
        "updated_at": "2020-06-04T09:49:08.080Z",
        "created_at": "2020-06-04T09:49:08.080Z"
      },
      {
        "icons": "fa fa-empire",
        "updated_at": "2020-06-04T09:49:08.084Z",
        "created_at": "2020-06-04T09:49:08.084Z"
      },
      {
        "icons": "fa fa-copyright",
        "updated_at": "2020-06-04T09:49:08.085Z",
        "created_at": "2020-06-04T09:49:08.085Z"
      },
      {
        "icons": "fa fa-eur",
        "updated_at": "2020-06-04T09:49:08.085Z",
        "created_at": "2020-06-04T09:49:08.085Z"
      },
      {
        "icons": "fa fa-exchange",
        "updated_at": "2020-06-04T09:49:08.085Z",
        "created_at": "2020-06-04T09:49:08.085Z"
      },
      {
        "icons": "fa fa-exclamation",
        "updated_at": "2020-06-04T09:49:08.086Z",
        "created_at": "2020-06-04T09:49:08.086Z"
      },
      {
        "icons": "fa fa-exclamation-triangle",
        "updated_at": "2020-06-04T09:49:08.086Z",
        "created_at": "2020-06-04T09:49:08.086Z"
      },
      {
        "icons": "fa fa-expeditedssl",
        "updated_at": "2020-06-04T09:49:08.086Z",
        "created_at": "2020-06-04T09:49:08.086Z"
      },
      {
        "icons": "fa fa-eye",
        "updated_at": "2020-06-04T09:49:08.087Z",
        "created_at": "2020-06-04T09:49:08.087Z"
      },
      {
        "icons": "fa fa-eye-slash",
        "updated_at": "2020-06-04T09:49:08.087Z",
        "created_at": "2020-06-04T09:49:08.087Z"
      },
      {
        "icons": "fa fa-film",
        "updated_at": "2020-06-04T09:49:08.087Z",
        "created_at": "2020-06-04T09:49:08.087Z"
      },
      {
        "icons": "fa fa-headphones",
        "updated_at": "2020-06-04T09:49:08.088Z",
        "created_at": "2020-06-04T09:49:08.088Z"
      },
      {
        "icons": "fa fa-heart",
        "updated_at": "2020-06-04T09:49:08.093Z",
        "created_at": "2020-06-04T09:49:08.093Z"
      },
      {
        "icons": "fa fa-heartbeat",
        "updated_at": "2020-06-04T09:49:08.093Z",
        "created_at": "2020-06-04T09:49:08.093Z"
      },
      {
        "icons": "fa fa-hourglass",
        "updated_at": "2020-06-04T09:49:08.094Z",
        "created_at": "2020-06-04T09:49:08.094Z"
      },
      {
        "icons": "fa fa-hourglass-1",
        "updated_at": "2020-06-04T09:49:08.094Z",
        "created_at": "2020-06-04T09:49:08.094Z"
      },
      {
        "icons": "fa fa-hourglass-2",
        "updated_at": "2020-06-04T09:49:08.094Z",
        "created_at": "2020-06-04T09:49:08.094Z"
      },
      {
        "icons": "fa fa-hourglass-3",
        "updated_at": "2020-06-04T09:49:08.098Z",
        "created_at": "2020-06-04T09:49:08.098Z"
      },
      {
        "icons": "fa fa-hourglass-end",
        "updated_at": "2020-06-04T09:49:08.099Z",
        "created_at": "2020-06-04T09:49:08.099Z"
      },
      {
        "icons": "fa fa-hourglass-o",
        "updated_at": "2020-06-04T09:49:08.100Z",
        "created_at": "2020-06-04T09:49:08.100Z"
      },
      {
        "icons": "fa fa-magic",
        "updated_at": "2020-06-04T09:49:08.100Z",
        "created_at": "2020-06-04T09:49:08.100Z"
      },
      {
        "icons": "fa fa-key",
        "updated_at": "2020-06-04T09:49:08.101Z",
        "created_at": "2020-06-04T09:49:08.101Z"
      },
      {
        "icons": "fa fa-mobile",
        "updated_at": "2020-06-04T09:49:08.101Z",
        "created_at": "2020-06-04T09:49:08.101Z"
      }
  ]
  constructor(private http: Http, private httpClient: HttpClient) { }

  public getIcons(get)
  {
    return this.icons;
  }
}