import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//components
import { LocationComponent } from './location/location.component';
import { ShareLocationComponent } from './share-location/share-location.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'location',
    component: LocationComponent,
  },
  {
    path: 'share-location',
    component: ShareLocationComponent,
  },
];

@NgModule({
  declarations: [
    LocationComponent,
    ShareLocationComponent
    ],

  imports: [CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
})
export class LocationsModule {}
