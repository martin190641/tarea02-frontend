import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //ReactiveX -> JS RxJS | Java RxJava || ProjectReactor Webflux
import { environment } from 'src/environments/environment';
import { Persona } from '../_model/persona';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericService<Persona> {
  private personaCambio: Subject<Persona[]> = new Subject<Persona[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/personas`);
  }

  getPersonaCambio(){
    return this.personaCambio.asObservable();
  }

  setPersonaCambio(lista: Persona[]){
    this.personaCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string){
    this.mensajeCambio.next(msj);
  }
}
