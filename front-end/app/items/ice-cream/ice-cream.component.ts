import { Component } from "@angular/core";
import Catalogue from "../../../../shared/static-data/catalogue";
import { Item } from "../../../../shared/dtos";

@Component({
  templateUrl: `./ice-cream.component.html`
})
export class IceCreamComponent {
  iceCreams: Item[];

  constructor() {
    this.iceCreams = Catalogue.filter(x => x.tags.indexOf("ice cream") !== -1);
  }
}
