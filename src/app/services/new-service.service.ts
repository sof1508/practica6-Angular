import { Injectable } from '@angular/core';
import { CrearPersonaComponent } from '../components/crear-persona/crear-persona.component';
import { Persona } from '../entities/persona';

@Injectable({
  providedIn: 'root'
})
export class NewServiceService {
  personas: Persona[] = [];

  constructor( ) { }

  crearPersona(persona: Persona){
    this.personas.push(persona);
  }

  listarPersonas(): Persona[]{
    return this.personas;
  }

  modificarPersona(dni: String, persona: Persona): void {
    const personaModificar = Persona.getPersonaByDni(this.personas, dni);
    if(personaModificar != undefined) {
      this.personas[this.personas.indexOf(personaModificar)] = persona;
    }
  }

  borrarPersona(dni: string): void{
    this.personas = this.personas.filter(persona => persona.Dni != dni);
  }

  borrarTodo(): void{
    this.personas = [];
  }
}

