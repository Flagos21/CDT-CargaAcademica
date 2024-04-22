import { Component } from '@angular/core';
import { BarnavComponent } from '../barnav/barnav.component';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
// import { BackendService } from './cargadocente';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './carga-horaria.component.html',
  styleUrls: ['./carga-horaria.component.css'],
  standalone: true,
  imports: [BarnavComponent],
})
export class CargaHorariaComponent {
  asignaturas: any[] = [];
  constructor(private http: HttpClient) {}

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    // Verificar si el foco está en uno de los campos de entrada antes de ejecutar la búsqueda
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA')
    ) {
      this.buscarDatos();
    }
  }

  buscarDatos() {
    const rut = (document.getElementById('rut') as HTMLInputElement).value;
    const nombre = (
      document.getElementById('nombre') as HTMLInputElement
    ).value.trim();
    const año = (document.getElementById('año') as HTMLInputElement).value;

    this.http
      .post<any>('http://localhost:3000/buscar-datos', { rut, nombre, año })
      .subscribe(
        (response) => {
          console.log('Datos encontrados:', response);
          // Verificar si la respuesta es un array y contiene al menos un elemento
          if (Array.isArray(response) && response.length > 0) {
            // Buscar el resultado que coincide con el rut buscado o el nombre y apellido
            const data = response.find(
              (item) =>
                item.idProfesor === rut ||
                item.Nombre + ' ' + item.Apellido === nombre
            );
            if (data) {
              // Concatenar nombre y apellido
              const nombreCompleto = data.Nombre + ' ' + data.Apellido;
              // Actualizar los campos del formulario con los datos encontrados
              (document.getElementById('nombre') as HTMLInputElement).value =
                nombreCompleto;
              (document.getElementById('rut') as HTMLInputElement).value =
                data.idProfesor;

              console.log('Grado obtenido de la base de datos:', data.Grado);
              console.log('Valor de data.Grado antes del switch:', data.Grado);
              console.log('Tipo de data.Grado:', typeof data.Grado);
              console.log('Contenido de data.Grado:', data.Grado);
              // Actualizar el campo "Grado" según el valor obtenido de la base de datos
              let grado = '';
              switch (data.Grado.toUpperCase()) {
                case 'M':
                  console.log('Caso: M');
                  grado = 'Magister';
                  break;
                case 'L':
                  console.log('Caso: L');
                  grado = 'Licenciado';
                  break;
                case 'D':
                  console.log('Caso: D');
                  grado = 'Doctorado';
                  break;
                default:
                  console.log('Caso: Default');
                  grado = 'No especificado';
                  break;
              }
              console.log('Grado actualizado:', grado);

              document.getElementById('grado')!.innerText = grado;
              document.getElementById('jerarquizacion')!.innerText =
                data.NombreJ;
              document.getElementById('horascontrato')!.innerText = data.Horas;
              // Aquí obtenemos las horas máximas de docencia desde la tabla jerarquia
              this.obtenerHoraMaximaDocencia(data.idJerarquia);
            } else {
              console.error(
                'No se encontraron registros con el rut o nombre/apellido proporcionados.'
              );
            }
          } else {
            console.error(
              'La respuesta del servidor no es un array o está vacía.'
            );
          }
        },
        (error) => {
          console.error('Error al buscar datos:', error);
        }
      );
  }

  obtenerHoraMaximaDocencia(idJerarquia: string) {
    this.http
      .get<any>(
        `http://localhost:3000/obtener-hora-maxima-docencia/${idJerarquia}`
      )
      .subscribe(
        (response) => {
          if (response && response.horaMaximaDeDocencia) {
            document.getElementById('PosibleHorasDeDocencia')!.innerText =
              response.horaMaximaDeDocencia;
          } else {
            console.error('No se encontraron las horas máximas de docencia.');
          }
        },
        (error) => {
          console.error(
            'Error al obtener las horas máximas de docencia:',
            error
          );
        }
      );
  }

  filasIndirecta: any = []; // Array para almacenar las filas de la tabla de docencia indirecta

  //Docencia Directa
  agregarFila(tablaId: string) {
    const tbody = document.querySelector(`#${tablaId} tbody`);
    if (tbody) {
      const newRow = document.createElement('tr');
      const uniqueId = Date.now(); // Generar un identificador único basado en el tiempo
      newRow.dataset['id'] = uniqueId.toString(); // Asignar el identificador único a la fila
      newRow.innerHTML = `
                <td><input type="text" name="asignatura"></td>
                <td><input type="number" name="horas" min="0"></td>
                <td><input type="number" name="minutos" min="0"></td>
            `;

      // Verificar si es la tabla de docencia directa para agregar el botón "Eliminar"
      if (tablaId === 'asignaturasTable') {
        newRow.innerHTML += `<td><button type="button" class="remove-btn">Eliminar</button></td>`;
        const deleteButton = newRow.querySelector('.remove-btn');
        if (deleteButton) {
          deleteButton.addEventListener('click', () => {
            this.eliminarFila(newRow, tablaId);
          });
        }
      } else {
        // Si es docencia indirecta, no agregar el botón "Eliminar"
        newRow.innerHTML += `<td></td>`;
      }

      tbody.appendChild(newRow);

      // Verificar si el contenedor es el de docencia directa o indirecta
      if (tablaId === 'asignaturasTable') {
        // Si es docencia directa, agregar la misma fila al contenedor de docencia indirecta
        const tbodyIndirecta = document.querySelector(
          `#asignaturasTable1 tbody`
        );
        if (tbodyIndirecta) {
          const newRowIndirecta = newRow.cloneNode(true) as HTMLElement;
          newRowIndirecta.dataset['id'] = uniqueId.toString(); // Asignar el mismo identificador único
          tbodyIndirecta.appendChild(newRowIndirecta);
        }
      } else if (tablaId === 'asignaturasTable1') {
        // Si es docencia indirecta, agregar la misma fila al contenedor de docencia directa
        const tbodyDirecta = document.querySelector(`#asignaturasTable tbody`);
        if (tbodyDirecta) {
          const newRowDirecta = newRow.cloneNode(true) as HTMLElement;
          newRowDirecta.dataset['id'] = uniqueId.toString(); // Asignar el mismo identificador único
          tbodyDirecta.appendChild(newRowDirecta);
        }
      }
    }
  }

  //Docencia Indirecta
  agregarFilaIndirecta() {
    const tablaId = 'asignaturasTable1';
    const tbody = document.querySelector(`#${tablaId} tbody`);
    if (tbody) {
      const newRow = document.createElement('tr');
      const uniqueId = Date.now(); // Generar un identificador único basado en el tiempo
      newRow.dataset['id'] = uniqueId.toString(); // Asignar el identificador único a la fila
      newRow.innerHTML = `
                <td><input type="text" name="asignatura"></td>
                <td><input type="number" name="horas" min="0"></td>
                <td><input type="number" name="minutos" min="0" max="59"></td>
                <td><button type="button" class="remove-btn">Eliminar</button></td>
            `;

      tbody.appendChild(newRow);

      const deleteButton = newRow.querySelector('.remove-btn');
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          this.eliminarFila(newRow, tablaId);
        });
      }
    }

    this.filasIndirecta.push({ asignatura: '', horas: 0, minutos: 0 });
  }

  ngOnInit() {
    // Agregar la funcionalidad de agregar filas a la tabla de docencia indirecta al inicializar el componente
    this.agregarFilaIndirecta();
  }

  eliminarFilaIndirecta(index: number) {
    try {
      console.log('Eliminando fila:', index);
      this.filasIndirecta.splice(index, 1);
      console.log('Filas actualizadas:', this.filasIndirecta);
    } catch (error) {
      console.error('Error al eliminar fila:', error);
    }
  }

  eliminarFila(row: HTMLElement, tablaId: string) {
    console.log('Fila:', row);
    console.log('ID de tabla:', tablaId);

    if (!row || !tablaId) {
      console.error('Fila o ID de tabla no válidos.');
      return;
    }

    // Verificar si row es un nodo hijo directo de la tabla
    if (!row.parentNode || row.parentNode.nodeName !== 'TBODY') {
      console.error('La fila no es un hijo directo de una tabla.');
      return;
    }

    if (tablaId === 'asignaturasTable') {
      row.remove();

      const filaIndirectaId = row.dataset['id'];
      if (filaIndirectaId) {
        const filaIndirecta = document.querySelector(
          `#asignaturasTable1 tr[data-id="${filaIndirectaId}"]`
        );
        if (filaIndirecta) {
          filaIndirecta.remove();
        }
      }
    } else if (tablaId === 'asignaturasTable1') {
      const tablaDirecta = document.querySelector('#asignaturasTable tbody');
      if (tablaDirecta) {
        const filaDirectaId = row.dataset['id'];
        if (filaDirectaId) {
          const filaDirecta = tablaDirecta.querySelector(
            `tr[data-id="${filaDirectaId}"]`
          );
          if (filaDirecta) {
            filaDirecta.remove();
          }
        }
      }
    } else {
      console.error('ID de tabla no reconocido.');
    }

    this.calcularTotalHorasMinutos();
  }

  // Nuevo código TypeScript para calcular el total de horas y minutos
  calcularTotalHorasMinutos() {
    let totalHoras = 0;
    let totalMinutos = 0;
    const filas = document.querySelectorAll('#asignaturasTable tbody tr');
    filas.forEach((fila) => {
      const horasInput = fila.querySelector(
        'input[name="horas"]'
      ) as HTMLInputElement;
      const minutosInput = fila.querySelector(
        'input[name="minutos"]'
      ) as HTMLInputElement;
      if (horasInput && minutosInput) {
        totalHoras += parseInt(horasInput.value) || 0;
        totalMinutos += parseInt(minutosInput.value) || 0;
      }
    });

    // Actualizar los elementos span con los totales calculados
    const totalHorasSpan = document.getElementById('totalHorasValor');
    const totalMinutosSpan = document.getElementById('totalMinutosValor');
    if (totalHorasSpan && totalMinutosSpan) {
      totalHorasSpan.textContent = totalHoras.toString();
      totalMinutosSpan.textContent = totalMinutos.toString();
    }
  }

  enviarDatosDocencia() {
    // Aquí puedes colocar el código para enviar los datos al servidor o realizar la acción necesaria
    console.log('Datos enviados');
    // Por ejemplo, podrías llamar a la función buscarDatos() si es lo que deseas hacer al enviar los datos
    this.buscarDatos();
  }

  //Docencia Directa

  buscarAsignaturas(nombre: string) {
    this.http
      .get<any>(`http://localhost:3000/buscar-asignaturas/${nombre}`)
      .subscribe(
        (response) => {
          console.log('Asignaturas encontradas:', response);
          // Aquí puedes manejar la respuesta y actualizar la interfaz de usuario
        },
        (error) => {
          console.error('Error al buscar asignaturas:', error);
        }
      );
  }

  enviarDatos1() {
    // Obtener horas y minutos del formulario
    const horasInput = (document.querySelector('#asignaturasTable input[name="horas"]') as HTMLInputElement);
    const minutosInput = (document.querySelector('#asignaturasTable input[name="minutos"]') as HTMLInputElement);
  
    // Verificar que se han ingresado valores válidos para horas y minutos
    if (horasInput && minutosInput && horasInput.value && minutosInput.value) {
      const horas = parseInt(horasInput.value);
      const minutos = parseInt(minutosInput.value);
  
      // Enviar los datos al backend
      this.http.post<any>('http://localhost:3000/guardar-datos', { horas, minutos }).subscribe(
        (response) => {
          console.log('Datos guardados exitosamente:', response);
          // Aquí puedes manejar la respuesta del backend si es necesario
        },
        (error) => {
          console.error('Error al guardar datos:', error);
        }
      );
    } else {
      console.error('Por favor ingresa valores válidos para horas y minutos.');
    }
  }
  

//   enviarDatos1() {
//     const horas = this.obtenerHoras();
//     const minutos = this.obtenerMinutos();
//     const data = {
//       horas: horas,
//       minutos: minutos,
//     };
//     this.http
//       .post<any>('http://localhost:3000/guardar-datos', data)
//       .subscribe(
//         (response) => {
//           console.log('Datos guardados exitosamente:', response);
//           // Aquí puedes manejar la respuesta del backend
//         },
//         (error) => {
//           console.error('Error al guardar datos:', error);
//         }
//       );
//   }

//   obtenerHoras() {
//     // Obtener las horas de las asignaturas y sumarlas
//     let totalHoras = 0;
//     this.asignaturas.forEach((asignatura) => {
//       totalHoras += asignatura.horas || 0;
//     });
//     return totalHoras;
//   }
  
//   obtenerMinutos() {
//     // Obtener los minutos de las asignaturas y sumarlos
//     let totalMinutos = 0;
//     this.asignaturas.forEach((asignatura) => {
//       totalMinutos += asignatura.minutos || 0;
//     });
//     return totalMinutos;
//   }
}
