import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BarnavComponent } from './Componentes/barnav/barnav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarnavComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CargaAcademica';
}
