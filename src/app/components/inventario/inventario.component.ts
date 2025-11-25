import { Component, OnInit } from '@angular/core';

interface Bien {
  codigoInventario: string;
  nombre: string;
  modelo: string;
  estado: string;
  fechaAdquisicion: string;
  ubicacion: string;
}

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  currentUser = 'Ing Edison';
  searchTerm: string = '';
  showAddModal: boolean = false;
  showDetailModal: boolean = false;
  selectedBien: Bien | null = null;
  
  bienes: Bien[] = [
    { codigoInventario: 'PC001', nombre: 'Computadora Dell', modelo: 'PC001', estado: 'Operativo', fechaAdquisicion: '2025-05-22', ubicacion: 'Aula 16' },
    { codigoInventario: 'PC001', nombre: 'Computadora Dell', modelo: 'PC001', estado: 'Operativo', fechaAdquisicion: '2025-05-22', ubicacion: 'Aula 16' },
    { codigoInventario: 'PRO001', nombre: 'Proyector Epson', modelo: 'PC001', estado: 'Operativo', fechaAdquisicion: '2025-05-22', ubicacion: 'Aula 16' },
    { codigoInventario: 'PRO002', nombre: 'Proyector Epson', modelo: 'PC001', estado: 'Operativo', fechaAdquisicion: '2025-05-22', ubicacion: 'Aula 16' },
    { codigoInventario: 'PRO003', nombre: 'Proyector Epson', modelo: 'PC001', estado: 'Operativo', fechaAdquisicion: '2025-05-22', ubicacion: 'Aula 16' }
  ];

  filteredBienes: Bien[] = [];

  // Formulario para nuevo bien
  nuevoBien: Bien = {
    codigoInventario: '',
    nombre: '',
    modelo: '',
    estado: 'Operativo',
    fechaAdquisicion: '',
    ubicacion: 'Aula 101'
  };

  ubicaciones: string[] = ['Aula 101', 'Aula 16', 'Aula 20', 'Bodega', 'Laboratorio 1', 'Laboratorio 2'];
  estados: string[] = ['Operativo', 'En Reparación', 'Fuera de Servicio', 'Disponible'];

  ngOnInit(): void {
    this.filteredBienes = [...this.bienes];
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBienes = [...this.bienes];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredBienes = this.bienes.filter(bien =>
      bien.codigoInventario.toLowerCase().includes(term) ||
      bien.nombre.toLowerCase().includes(term) ||
      bien.modelo.toLowerCase().includes(term) ||
      bien.ubicacion.toLowerCase().includes(term)
    );
  }

  openAddModal(): void {
    this.nuevoBien = {
      codigoInventario: '',
      nombre: '',
      modelo: '',
      estado: 'Operativo',
      fechaAdquisicion: '',
      ubicacion: 'Aula 101'
    };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  saveBien(): void {
    if (this.nuevoBien.codigoInventario && this.nuevoBien.nombre && 
        this.nuevoBien.modelo && this.nuevoBien.fechaAdquisicion) {
      this.bienes.push({...this.nuevoBien});
      this.filteredBienes = [...this.bienes];
      this.closeAddModal();
    }
  }

  viewDetails(bien: Bien): void {
    this.selectedBien = bien;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedBien = null;
  }
}

