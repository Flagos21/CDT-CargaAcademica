import { Routes } from '@angular/router';
import { ProfesorComponent } from './Componentes/profesor/profesor.component';
import { AsignarAsignaturaComponent } from './Componentes/asignar-asignatura/asignar-asignatura.component';
import { CrearAsignaturaComponent } from './Componentes/crear-asignatura/crear-asignatura.component';


export const routes: Routes = [
    {path: '', pathMatch:'full',redirectTo:'profesor'},
    {path: 'profesor', component: ProfesorComponent},
    {path: 'asignar-asignatura', component: AsignarAsignaturaComponent},
    {path: 'crear-asignatura', component: CrearAsignaturaComponent}
    

];
