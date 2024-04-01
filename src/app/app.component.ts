import { Component } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { BarnavComponent } from './Componentes/barnav/barnav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet,RouterLink,BarnavComponent]
})

export class AppComponent {
  title = 'CargaAcademica';
}
