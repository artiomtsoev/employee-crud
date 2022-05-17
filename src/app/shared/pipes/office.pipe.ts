import { Pipe, PipeTransform } from "@angular/core";
import { Office } from "src/app/models/office.model";

@Pipe({
    name: 'officeName',
    pure: false,
  })
  export class OfficePipe implements PipeTransform {
    public transform(officeId: string, offices: Office[]): string {
        const office = offices.find(officeItem => officeId === officeItem.id);

        return office ? office.name : '';
    }
  }
  