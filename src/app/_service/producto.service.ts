import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; //ReactiveX -> JS RxJS | Java RxJava || ProjectReactor Webflux
import { environment } from 'src/environments/environment';
import { Producto } from '../_model/producto';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto> {
  private productoCambio: Subject<Producto[]> = new Subject<Producto[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/productos`);
  }

  getProductoCambio(){
    return this.productoCambio.asObservable();
  }

  setProductoCambio(lista: Producto[]){
    this.productoCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(msj: string){
    this.mensajeCambio.next(msj);
  }
}
