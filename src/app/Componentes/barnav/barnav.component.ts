import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-barnav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './barnav.component.html',
  styleUrl: './barnav.component.css'
})
export class BarnavComponent {
  constructor (
    private router: Router
  ){   
  }  
 
}
