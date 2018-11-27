import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WallpaperService {

  private apiUrl = 'https://cors-anywhere.herokuapp.com/http://www.bing.com/HPImageArchive.aspx?format=xml&idx=0&n=1&mkt=en-US';

  constructor(private http: Http) { }

  private getData(): Promise<any> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response);
  }

  public setWallpaper() {
    this.getData().
      then(result => {
        const regexp = '<urlBase>(.*?)<\/urlBase>';
        const urlBase = String(result._body).match(regexp)[1];

        const background =
          `.background {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 0;
            overflow: hidden;
            background-size: 100%;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }`;

        const backgroundBefore =
          `.background:before {
            animation: fade 3s ease-out forwards;
            /*background: var(--featured-image) no-repeat bottom;    */
            background: url(http://www.bing.com${urlBase}_${window.screen.width}x${window.screen.height}.jpg) no-repeat bottom;
            background-size: 100%;
            width: 100%;
            height: 100%;
            background-size: cover;
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }`;

        if (this.isIE()) {
          (<CSSStyleSheet>document.styleSheets[0]).addRule(background, '0'.toString());
          (<CSSStyleSheet>document.styleSheets[0]).addRule(backgroundBefore, '0'.toString());

        } else {
          (<CSSStyleSheet>document.styleSheets[0]).insertRule(background);
          (<CSSStyleSheet>document.styleSheets[0]).insertRule(backgroundBefore);
        }

      });
  }

  private isIE() {
    const match = navigator.userAgent.search(/(?:MSIE|Trident\/.*; rv:)/);
    let isIE = false;
    if (match !== -1) {
      isIE = true;
    }
    return isIE;
  }
}
