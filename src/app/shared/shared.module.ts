import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    MapComponent
  ],

  imports: [ReactiveFormsModule, FormsModule, RouterModule, CommonModule],
  exports: [MapComponent],
})
export class SharedModule {}
