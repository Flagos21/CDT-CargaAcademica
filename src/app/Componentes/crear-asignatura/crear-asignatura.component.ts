import { Component } from '@angular/core';
import { BarnavComponent } from "../barnav/barnav.component";

@Component({
    selector: 'app-crear-asignatura',
    standalone: true,
    templateUrl: './crear-asignatura.component.html',
    styleUrl: './crear-asignatura.component.css',
    imports: [BarnavComponent]
})
export class CrearAsignaturaComponent {

}
