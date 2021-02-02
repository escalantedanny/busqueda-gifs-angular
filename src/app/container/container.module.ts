import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [BodyComponent, BusquedaComponent, ResultadosComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BodyComponent
  ]
})
export class ContainerModule { }
