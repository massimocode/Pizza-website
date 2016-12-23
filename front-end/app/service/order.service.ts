import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { BasketService } from './basket.service';
@Injectable()
export class OrderService {
    constructor(private http: Http, private basket: BasketService) {
    }

    postOrder() {
        const postBody = {
            transactions: [
                {
                    amount:
                    {
                        total: Math.round(this.basket.totalPrice * 100) / 100,
                        currency: "GBP"
                    },
                    description: this.basket.generateDescription()
                }]
        }
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/get-token', postBody, options)
            .map(this.extractData)


    }

    private extractData(res: Response) {
        return res.json() || {};
    }


    postPayerId(payerId: string, token: string) {
        const postBody = {
            "payer_id": payerId,
            "Authorization": token,
            "execute_link": localStorage.getItem('execute-url')
        }
        const headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/order/execute', postBody, options)
            .map(this.extractData)
    }


}