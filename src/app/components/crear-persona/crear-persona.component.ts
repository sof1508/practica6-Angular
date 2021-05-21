import { syntaxError } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';

import { Persona } from 'src/app/entities/persona';
import { NewServiceService } from 'src/app/services/new-service.service';
import { ListarPersonaComponent } from '../listar-persona/listar-persona.component';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {
  crearPersonaForm : FormGroup;

  constructor(private newService: NewServiceService,
    private dialogRef: MatDialogRef<ListarPersonaComponent>) {
    
    // Configuración de las validaciones del form
    this.crearPersonaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('', [Validators.required,Validators.minLength(3)]),
      edad: new FormControl('', [Validators.required,Validators.pattern("^(0?[0-9]?[0-9]|1[01][0-9]|12[0-5])$")]),
      dni: new FormControl('', [Validators.required, Validators.pattern("[0-9]{8}[A-Za-z]{1}")]),
      cumpleanyos: new FormControl('', Validators.required),
      color: new FormControl('',[ Validators.required, Validators.minLength(3)]),
      sexo: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    // Si el form es válido
    if(this.crearPersonaForm.valid){
      // Llamamos al servicio para crear una persona
      this.newService.crearPersona({
        Nombre: this.crearPersonaForm.value.nombre,
        Apellidos: this.crearPersonaForm.value.apellidos,
        Edad: this.crearPersonaForm.value.edad,
        Dni: this.crearPersonaForm.value.dni,
        Cumpleanyos: this.crearPersonaForm.value.cumpleanyos,
        Color: this.crearPersonaForm.value.color,
        Sexo: this.crearPersonaForm.value.sexo,
      });

      // Limpiamos y cerramos
      this.crearPersonaForm.reset();
      this.dialogRef.close();
  }
}

  onCancelar(){
    // Salimos del dialogo
    this.dialogRef.close();
  }

}
