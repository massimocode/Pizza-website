import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../service/order.service'
import { ErrorService } from '../service/error.service'

@Component({
    moduleId: module.id,
    templateUrl: './orders.component.html',
    styles: [`
    h4 {
        display: inline-block;
    }
   .mark-complete{
       padding: 0 16px;
       margin-left: 20px;
   }

 .more-details{
       min-width: 400px;
       margin-top:20px;
   }

   .remove-right-border{
       border-right: 0;
   }
    `]
})
export class OrdersComponent implements OnInit {
    orders: OrderViewModel[];

    constructor(private orderService: OrderService, private errorService: ErrorService, private router: Router) {
    }

    ngOnInit() {
        this.refreshOrders();
        setInterval(this.refreshOrders.bind(this), 15000);
    }

    markAsComplete(id: string) {
        this.errorService.clearErrors();
        this.orderService.markOrderAsComplete({ orderId: id })
            .subscribe(() => {
                this.refreshOrders()
            }, error => this.handleError(error, 'There was an unexpected error marking the order as complete. Please try again.'));
    }

    private refreshOrders() {
        this.errorService.clearErrors();
        this.orderService.getOrders()
            .subscribe(response => {
                this.orders = response.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
                this.orders = this.orders.map(order => {
                    return Object.assign({ isShown: order.status === 'Outstanding' ? true : false }, order)
                })
                console.log(this.orders);
            }, error => this.handleError(error, 'There was an unexpected error refreshing the orders. Please try again.'));
    }

    private handleError(error: any, genericErrorMessage: string) {
        if (error.status === 401) {
            this.router.navigateByUrl('/admin/sign-in');
        }
        if (error.status === 500) {
            this.errorService.displayErrors([genericErrorMessage]);
        }

    }

    toggle(order: OrderViewModel): void {
        order.isShown = !order.isShown;

    }

    formatAddress(address: Address) {
        return [
            address.line1,
            address.line2,
            address.town,
            address.postcode
        ].filter(x => !!x).join(', ');
    }
}

interface OrderViewModel extends Order {
    isShown?: boolean;
}