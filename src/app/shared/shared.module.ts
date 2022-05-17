import { NgModule } from "@angular/core";
import { OfficePipe } from "./pipes/office.pipe";

@NgModule({
    declarations: [
        OfficePipe,
    ],
    imports: [
    ],
    exports: [
        OfficePipe,
    ],
})
export class SharedModule {
    
}