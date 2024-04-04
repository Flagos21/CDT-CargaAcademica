import { Component } from '@angular/core';
import { BarnavComponent } from '../barnav/barnav.component';

@Component({
    selector: 'app-carga-horaria',
    templateUrl: './carga-horaria.component.html',
    styleUrls: ['./carga-horaria.component.css'],
    standalone: true,
    imports: [BarnavComponent]
})
export class CargaHorariaComponent {

    /*constructor() {
        // Event listeners para detectar cambios en los campos de rut y nombre
        document.getElementById("rut")?.addEventListener("input", this.mostrarDatos.bind(this));
        document.getElementById("nombre")?.addEventListener("input", this.mostrarDatos.bind(this));
    }*/

    agregarFila(tablaId: string) {
        const tbody = document.querySelector(`#${tablaId} tbody`);
        if (tbody) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" name="asignatura"></td>
                <td><input type="number" name="horas" min="0"></td>
                <td><input type="number" name="minutos" min="0" max="59"></td>
                <td><button type="button" class="remove-btn">Eliminar</button></td>
            `;
            tbody.appendChild(newRow);
    
            // Adjuntar evento de clic al botón "Eliminar"
            const deleteButton = newRow.querySelector('.remove-btn');
            if (deleteButton) {
                deleteButton.addEventListener('click', () => {
                    this.eliminarFila(newRow, tablaId);
                });
            }
    
            // Verificar si el contenedor es el de docencia directa o indirecta
            if (tablaId === 'asignaturasTable') {
                // Si es docencia directa, agregar la misma fila al contenedor de docencia indirecta
                const tbodyIndirecta = document.querySelector(`#asignaturasTable1 tbody`);
                if (tbodyIndirecta) {
                    const newRowIndirecta = newRow.cloneNode(true) as HTMLElement;
                    tbodyIndirecta.appendChild(newRowIndirecta);
    
                    // Adjuntar evento de clic al botón "Eliminar" en el contenedor de docencia indirecta
                    const deleteButtonIndirecta = newRowIndirecta.querySelector('.remove-btn');
                    if (deleteButtonIndirecta) {
                        deleteButtonIndirecta.addEventListener('click', () => {
                            this.eliminarFila(newRowIndirecta, 'asignaturasTable1');
                        });
                    }
                }
            } else if (tablaId === 'asignaturasTable1') {
                // Si es docencia indirecta, agregar la misma fila al contenedor de docencia directa
                const tbodyDirecta = document.querySelector(`#asignaturasTable tbody`);
                if (tbodyDirecta) {
                    const newRowDirecta = newRow.cloneNode(true) as HTMLElement;
                    tbodyDirecta.appendChild(newRowDirecta);
    
                    // Adjuntar evento de clic al botón "Eliminar" en el contenedor de docencia directa
                    const deleteButtonDirecta = newRowDirecta.querySelector('.remove-btn');
                    if (deleteButtonDirecta) {
                        deleteButtonDirecta.addEventListener('click', () => {
                            this.eliminarFila(newRowDirecta, 'asignaturasTable');
                        });
                    }
                }
            }
        }
    }
    
    eliminarFila(row: HTMLElement, tablaId: string) {
        row.remove();
        this.calcularTotalHorasMinutos(); // Llamada a la función para recalcular totales después de eliminar la fila
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