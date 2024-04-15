import { Component} from '@angular/core';
import { BarnavComponent } from '../barnav/barnav.component';
import { BackendService } from './server';

@Component({
    selector: 'app-carga-horaria',
    templateUrl: './carga-horaria.component.html',
    styleUrls: ['./carga-horaria.component.css'],
    standalone: true,
    imports: [BarnavComponent]
})
export class CargaHorariaComponent {

    constructor(private backendService: BackendService) { }

    buscarDatos() {
        const rut = '12345678-9'; // Obtener rut del formulario
        const nombre = 'Nombre Apellido'; // Obtener nombre del formulario
        const año = '2024'; // Obtener año del formulario
      
        this.backendService.buscarDatos(rut, nombre, año).subscribe(
          (datos: any) => {
            console.log('Datos encontrados:', datos);
            // Actualizar los campos del formulario con los datos encontrados
          },
          (error: Error) => {
            console.error('Error al buscar datos:', error);
          }
        );
      }
      

  guardarDatosCarga() {
    const datos = {
      rut: '12345678-9',
      nombre: 'Nombre Apellido',
      año: '2024',
      grado: 'Magister',
      jerarquizacion: 'Instructor',
      horascontrato: '44',
      PosibleHorasDeDocencia: '22',
      asignaturas: [
        // Aquí deberías incluir los datos de las asignaturas
      ]
    };

    this.backendService.guardarCargaHoraria(datos).subscribe(
      (response) => {
        console.log('Datos de carga horaria guardados correctamente:', response);
      },
      (error) => {
        console.error('Error al guardar datos de carga horaria:', error);
      }
    );
  }

    filasIndirecta: any[] = []; // Array para almacenar las filas de la tabla de docencia indirecta

    /*constructor() {
        // Event listeners para detectar cambios en los campos de rut y nombre
        document.getElementById("rut")?.addEventListener("input", this.mostrarDatos.bind(this));
        document.getElementById("nombre")?.addEventListener("input", this.mostrarDatos.bind(this));
    }*/

    agregarFila(tablaId: string) {
        const tbody = document.querySelector(`#${tablaId} tbody`);
        if (tbody) {
            const newRow = document.createElement('tr');
            const uniqueId = Date.now(); // Generar un identificador único basado en el tiempo
            newRow.dataset['id'] = uniqueId.toString(); // Asignar el identificador único a la fila
            newRow.innerHTML = `
                <td><input type="text" name="asignatura"></td>
                <td><input type="number" name="horas" min="0"></td>
                <td><input type="number" name="minutos" min="0" max="59"></td>
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
                const tbodyIndirecta = document.querySelector(`#asignaturasTable1 tbody`);
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
                const filaIndirecta = document.querySelector(`#asignaturasTable1 tr[data-id="${filaIndirectaId}"]`);
                if (filaIndirecta) {
                    filaIndirecta.remove();
                }
            }
        } else if (tablaId === 'asignaturasTable1') {
            const tablaDirecta = document.querySelector('#asignaturasTable tbody');
            if (tablaDirecta) {
                const filaDirectaId = row.dataset['id'];
                if (filaDirectaId) {
                    const filaDirecta = tablaDirecta.querySelector(`tr[data-id="${filaDirectaId}"]`);
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
    
   /*// Función para obtener y mostrar los datos según el rut o nombre ingresado
    mostrarDatos() {
        const rut = (document.getElementById("rut") as HTMLInputElement).value;
        const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    
    // Aquí deberías implementar la lógica para obtener los datos correspondientes
    // a partir del rut o nombre ingresado
    
    // Ejemplo de cómo podrías asignar datos aleatorios
    document.getElementById("grado")!.innerText = "Magister";
    document.getElementById("jerarquizacion")!.innerText = "Instructor";
    document.getElementById("horascontrato")!.innerText = "44";
    document.getElementById("PosibleHorasDeDocencia")!.innerText = "22";
}*/

    // Nuevo código TypeScript para calcular el total de horas y minutos
    calcularTotalHorasMinutos() {
        let totalHoras = 0;
        let totalMinutos = 0;
        const filas = document.querySelectorAll('#asignaturasTable tbody tr');
        filas.forEach((fila) => {
            const horasInput = fila.querySelector('input[name="horas"]') as HTMLInputElement;
            const minutosInput = fila.querySelector('input[name="minutos"]') as HTMLInputElement;
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
}