import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../models/solicitud.model';
import { Asignacion } from '../../models/asignacion.model';
import { Bien } from '../../models/bien.model';
import { Aula } from '../../models/aula.model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { BienesService } from '../../services/bienes.service';

@Component({
  selector: 'app-portal-docente',
  templateUrl: './portal-docente.component.html',
  styleUrls: ['./portal-docente.component.scss']
})
export class PortalDocenteComponent implements OnInit {
  currentUser = 'Docente';
  currentUserId: number = 0;

  // Formulario
  aulaSeleccionada: number | null = null;
  tipoSolicitud: string = '';
  detalleProblema?: string ;

  // Datos
  bienes: Bien[] = [];
  asignaciones: Asignacion[] = [];
  misSolicitudes: Solicitud[] = [];
  aulasAsignadas: Aula[] = [];
  tiposSolicitud: string[] = [
    'Mobiliario (sillas, mesas, pizarrón)',
    'Equipamiento (proyector, PCs, red)',
    'Infraestructura (paredes, luz, aire acondicionado)',
    'Otros (Limpieza, seguridad, etc.)'
  ];
  bienSeleccionado: number | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private bienesService: BienesService
  ) {}

 ngOnInit(): void {
  const user = this.authService.getCurrentUser();
  console.log('👤 USER:', user);

  if (user) {
    this.currentUser = user.nombre;
    this.currentUserId = user.idUsuario;

    console.log('🟢 ID DOCENTE:', this.currentUserId);

    this.loadAsignaciones(); // ⬅️ aquí empieza todo
  }
}




loadAsignaciones(): void {
  this.apiService.getAsignaciones().subscribe(asignaciones => {
    this.asignaciones = asignaciones.filter(
      a => a.usuario.idUsuario === this.currentUserId && a.estado
    );

    this.loadBienes(); // ⬅️ sigue el flujo
  });
}


loadBienes(): void {
  this.apiService.getBienes().subscribe({
    next: bienes => {
      this.bienes = bienes;
      this.loadAulas();

      // ✅ AQUÍ SÍ, porque el ID YA EXISTE
      this.loadMisSolicitudes();
    },
    error: err => console.error(err)
  });
}




loadAulas(): void {
  this.aulasAsignadas = [];

  this.bienes.forEach(b => {
    if (b.aula && !this.aulasAsignadas.some(a => a.idAula === b.aula.idAula)) {
      this.aulasAsignadas.push(b.aula);
    }
  });

  // seleccionar primera aula por defecto
  if (this.aulasAsignadas.length > 0) {
    this.aulaSeleccionada = this.aulasAsignadas[0].idAula;
  }
}




loadMisSolicitudes(): void {
  console.log('🟢 loadMisSolicitudes llamado con ID:', this.currentUserId);

  this.apiService.getSolicitudesDocente(this.currentUserId).subscribe({
    next: (solicitudes: any[]) => {
      console.log('🟢 RESPUESTA BACKEND:', solicitudes);
      this.misSolicitudes = solicitudes;
    },
    error: err => console.error('🔴 ERROR API:', err)
  });
}





onAulaChange(): void {
  // limpiar bien seleccionado cuando cambia el aula
  this.bienSeleccionado = null;
}

getBienesAsignados(): Bien[] {
  console.log(this.bienes);
  return this.bienes.filter(b => b.aula?.idAula === this.aulaSeleccionada);
}



enviarSolicitud(): void {
  // Validar que todos los campos estén completos
  if (!this.aulaSeleccionada || !this.tipoSolicitud || !this.detalleProblema) {
    alert('Por favor complete todos los campos');
    return;
  }

  // Buscar un bien relacionado con el aula seleccionada
  const bienRelacionado = this.getBienesAsignados().find(
    b => b.aula?.idAula === this.aulaSeleccionada
  );

  if (!bienRelacionado) {
    alert('No se encontró un bien para el aula seleccionada');
    return;
  }

  // Construir objeto a enviar al backend
  const body = {
    idBien: bienRelacionado.idBien,
    descripcion: `${this.tipoSolicitud}: ${this.detalleProblema}`,
    estado: 'PENDIENTE'
  };

  // Llamar al API para crear la solicitud
  this.apiService.createSolicitud(body).subscribe({
    next: (res) => {
      // Agregar el bien al objeto recibido para mostrar correctamente en el front
      (res as any).bien = bienRelacionado;

      alert('Solicitud enviada correctamente');
          this.loadMisSolicitudes();

      // Limpiar formulario
      this.detalleProblema = '';
      this.tipoSolicitud = '';
      this.aulaSeleccionada = this.aulasAsignadas.length > 0 ? this.aulasAsignadas[0].idAula : null;
    },
    error: (err) => {
      console.error('Error al enviar la solicitud:', err);
      alert('Error al enviar la solicitud');
    }
  });
  
  
}}

