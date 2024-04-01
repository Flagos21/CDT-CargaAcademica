import { Component } from '@angular/core';
import { BarnavComponent } from "../barnav/barnav.component";

@Component({
    selector: 'app-profesor',
    standalone: true,
    templateUrl: './profesor.component.html',
    styleUrl: './profesor.component.css',
    imports: [BarnavComponent]
})
export class ProfesorComponent {

}
