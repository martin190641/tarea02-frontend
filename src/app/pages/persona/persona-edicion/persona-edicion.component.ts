import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/_model/persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.personaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPersona),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos)
        });
      });
    }
  }

  operar() {
    let persona = new Persona();
    persona.idPersona = this.form.value['id'];
    persona.nombres = this.form.value['nombres'];
    persona.apellidos = this.form.value['apellidos'];

    if (this.edicion) {
      //MODIFICAR
      //PRACTICA NO IDEAL, PERO COMUN
      this.personaService.modificar(persona).subscribe(() => {
        this.personaService.listar().subscribe(data => {
          this.personaService.setPersonaCambio(data);
          this.personaService.setMensajeCambio('SE MODIFICO');
        });
      });
    } else {
      //REGISTRAR
      //PRACTICA IDEAL, OPERADORES REACTIVOS
      this.personaService.registrar(persona).pipe(switchMap(() => {
        return this.personaService.listar();
      }))
      .subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio('SE REGISTRO');
      });
    }

    this.router.navigate(['/persona']);

  }

}
