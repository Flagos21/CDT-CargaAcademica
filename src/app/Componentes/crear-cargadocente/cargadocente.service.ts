import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';      
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cargadocente } from './cargadocente';

@Injectable({
  providedIn: 'root'
})
export class CargadocenteService {
  private apiURL = "http://localhost:3000";   
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/cargadocente/')
    .pipe(
      catchError(this.errorHandler)
    )
  } 
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(cargadocente: Cargadocente): Observable<any> {
    return this.httpClient.post(this.apiURL + '/cargadocente/crear-cargadocente', JSON.stringify(cargadocente), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(idCargaDocente:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/cargadocente' + idCargaDocente)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(idCargaDocente:number, cargadocente:Cargadocente): Observable<any> {
    return this.httpClient.put(this.apiURL + '/cargadocente/' + idCargaDocente, JSON.stringify(cargadocente), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  } 
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(idCargaDocente:number){
    return this.httpClient.delete(this.apiURL + '/cargadocente/' + idCargaDocente, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }      
  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      console.log('no funca')
    } else {
      console.log('no funca1')
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message} hola`;
    }
    return throwError(errorMessage);
 }
}