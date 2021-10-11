import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { switchMap } from 'rxjs/operators';




@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.productoService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idProducto),
          'nombre': new FormControl(data.nombre),
          'marca': new FormControl(data.marca)
        });
      });
    }
  }

  operar() {
    let producto = new Producto();
    producto.idProducto = this.form.value['id'];
    producto.nombre = this.form.value['nombre'];
    producto.marca = this.form.value['marca'];

    if (this.edicion) {
      //MODIFICAR
      //PRACTICA NO IDEAL, PERO COMUN
      this.productoService.modificar(producto).subscribe(() => {
        this.productoService.listar().subscribe(data => {
          this.productoService.setProductoCambio(data);
          this.productoService.setMensajeCambio('SE MODIFICO');
        });
      });
    } else {
      //REGISTRAR
      //PRACTICA IDEAL, OPERADORES REACTIVOS
      this.productoService.registrar(producto).pipe(switchMap(() => {
        return this.productoService.listar();
      }))
      .subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('SE REGISTRO');
      });
    }

    this.router.navigate(['/producto']);

  }

}
