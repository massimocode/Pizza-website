import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { OrderService } from './../service/order.service';


@Component({
    moduleId: module.id,
    templateUrl: `./payment-processing.component.html`,

})
export class PaymentProcess implements OnInit, OnDestroy {
    dots = "";
    Processing = "Processing ";
    fullLoading = "";
    private subscription: Subscription;
    constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private router: Router) { }
    // updateLoading(): void {
    //     if (this.dots === "...") {
    //         this.dots = "";
    //     }
    //     this.dots += ".";

    //     this.fullLoading = this.Processing + this.dots;

    // }

    ngOnInit(): void {
        // setInterval(this.updateLoading, 500);
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.orderService.postPayerId(param['PayerID'], param['paymentId'])
                    .subscribe(response => {
                        if (response.state === 'approved') {
                            const buyerDetails: any = JSON.parse(localStorage.getItem('checkout-details'));
                            let items: any[] = [];
                            let storedItems: any = JSON.parse(localStorage.getItem('items'));
                            for (let id in storedItems) {
                                items.push({
                                    item: storedItems[id].item,
                                    qty: storedItems[id].qty,
                                    price: Math.round(storedItems[id].price * 100) / 100
                                });
                            }
                            let orderDetail: any = {
                                buyer: {
                                    firstName: buyerDetails.firstName,
                                    lastName: buyerDetails.lastName,
                                    address: buyerDetails.address2.length ? `${buyerDetails.address1} ${buyerDetails.address2}` : buyerDetails.address1,
                                    postCode: buyerDetails.postCode,
                                    email: buyerDetails.email,
                                    phone: buyerDetails.phone
                                },
                                orderItems: items,
                                deliveryMethod: buyerDetails.deliveryMethod,
                                date: new Date(),
                                paymentMethod: 'paypal',
                                total: Math.round(JSON.parse(localStorage.getItem('totalPrice')) * 100) / 100,
                                discount: 0,
                                totalPayment: Math.round(JSON.parse(localStorage.getItem('totalPrice')) * 100) / 100
                            }

                            this.orderService.postOrderDetails(orderDetail)
                                .subscribe(response => {
                                    if (response.success) {
                                        this.router.navigate(["/order/success"]);
                                        localStorage.clear();
                                    }
                                }, error => {
                                    if (error.status === 500) {
                                        this.router.navigate(["/order/failure"]);
                                    }
                                });
                        }
                    }, error => {
                        if (error.status === 500) {
                            this.router.navigate(["/order/failure"]);
                        }
                    });
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }
}



