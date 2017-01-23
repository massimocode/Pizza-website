import { Component } from '@angular/core';

import { ErrorService } from '../service/error.service';

@Component({
    moduleId: module.id,
    selector: 'error-component',
    templateUrl: `./error.component.html`,
    styles: [`
        ul {
            padding-left: 30px;
        }
    `]
})
export class ErrorComponent {
    constructor(public errorService: ErrorService) {
    }
}
