import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
    
    private baseUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

    constructor(private http: HttpClient) { }

    buscarDatos(rut: string, nombre: string, año: string): Observable<any> {
        const url = `${this.baseUrl}/buscar-datos`;
        const body = { rut, nombre, año };
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        return this.http.post<any>(url, body, options).pipe(
            catchError(this.handleError)
          );
        }

        private handleError(error: any) {
            console.error('Ocurrió un error en la solicitud:', error);
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente.');
          }
          
    guardarCargaHoraria(datos: any) {
    return this.http.post('http://localhost:3000/guardar-carga', datos);
  }
}
