import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaxService {

    taxFormObject;
    url = 'http://localhost:3000/tax';

    constructor(private http: HttpClient) { }

    getTaxType() {
        return this.http.get(this.url);
    }

    putTaxType() {
        return this.http.put(this.url, this.taxFormObject, { responseType: 'text'});
    }
}

