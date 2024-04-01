import { Component } from '@angular/core';
//import Papa from 'papaparse';
import { BarnavComponent } from '../barnav/barnav.component';

@Component({
  selector: 'app-carga-horaria',
  templateUrl: './carga-horaria.component.html',
  styleUrls: ['./carga-horaria.component.css'],
  standalone: true,
  imports: [BarnavComponent]
})
export class CargaHorariaComponent {
  // Función para manejar el cambio en el input de archivo
  

  // Función para mostrar las asignaturas en la tabla
  mostrarAsignaturas(data: any[]) {
    const tableBody = document.getElementById('asignaturas-body')!;
    tableBody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < data[i].length; j++) {
        const cell = document.createElement('td');
        cell.textContent = data[i][j];
        row.appendChild(cell);
      }
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.addEventListener('click', () => {
        row.remove();
      });
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
      tableBody.appendChild(row);
    }
  }

  toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content")!;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  }

  // Función para agregar una fila
  agregarFila(sectionId: string) {
    const sectionBody = document.getElementById(sectionId + '-body')!;
    const newRow = document.createElement('tr');
    switch (sectionId) {
      case 'DocenciaDirecta':
        newRow.innerHTML = `
          <td contenteditable="true">Nueva Asignatura</td>
          <td contenteditable="true">0</td>
          <td contenteditable="true">0</td>
          <td>
            <button (click)="eliminarFila($event.target)">Eliminar</button>
          </td>
        `;
        break;
      case 'DocenciaIndirecta':
        newRow.innerHTML = `
          <td contenteditable="true">Nuevo Concepto</td>
          <td contenteditable="true">0</td>
          <td contenteditable="true">0</td>
          <td>
            <button (click)="eliminarFila($event.target)">Eliminar</button>
          </td>
        `;
        break;
      case 'OtrosTrabajosDeGestionAcademica':
        newRow.innerHTML = `
          <td contenteditable="true">Nuevo Concepto</td>
          <td contenteditable="true">0</td>
          <td contenteditable="true">0</td>
          <td>
            <button (click)="eliminarFila($event.target)">Eliminar</button>
          </td>
        `;
        break;
      default:
        break;
    }
    sectionBody.appendChild(newRow);
  }

  agregarAsignatura(button: HTMLButtonElement) {
    const row = button.closest('tr')!;
    const newRow = row.cloneNode(true) as HTMLTableRowElement; // Clonar la fila actual
    newRow.querySelector('td')!.textContent = ''; // Limpiar el contenido de la primera celda
    const newButton = newRow.querySelector('button')!;
    newButton.textContent = 'Agregar'; // Cambiar el texto del botón a "Agregar"
    newButton.onclick = () => {
      this.agregarAsignatura(newButton);
    }; // Asignar el evento de agregar para el nuevo botón
    const sectionBody = row.parentElement!;
    sectionBody.appendChild(newRow);
  }

  eliminarFila(button: HTMLButtonElement) {
    const row = button.closest('tr')!;
    row.remove();
  }

  agregarasignatura(sectionId: string) {
    const sectionBody = document.getElementById(sectionId + '-body')!;
    const rows = sectionBody.querySelectorAll('tr');
    const data: any[] = [];
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const asignatura = {
        nombre: cells[0].textContent!.trim(),
        horas: parseInt(cells[1].textContent!.trim()),
        minutos: parseInt(cells[2].textContent!.trim())
      };
      data.push(asignatura);
    });
    console.log('Datos a enviar:', data);

    // Enviar los datos al backend
    fetch('url_del_backend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          console.log('Datos agregados correctamente.');
          // Aquí puedes agregar lógica adicional si es necesario
        } else {
          console.error('Error al agregar los datos.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}