import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataService {
	public gridData: Array<any> = [];
	constructor(private _http: Http) { }

	getData(dataUrl) {
		return this._http.get(dataUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}

	postData(dataUrl, requestData) {
		let bodyString = JSON.stringify(requestData);

		// console.log(bodyString);
		let headers = new Headers(
			{
				"content-type": "application/json",
				"accept": "application/json",
				"sm_user": "alpha.beta.consultant@nielsen.com"
			});

		return this._http.post(dataUrl, requestData, { headers: headers }/*, options*/)
			.map(res => res.json());
	}

	private extractData(res: Response) {
		let data = res.json();
		return data || {};
	}

	private handleError(error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;

		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}

		console.error(errMsg);
		return Observable.throw(errMsg);
	}
	
}
