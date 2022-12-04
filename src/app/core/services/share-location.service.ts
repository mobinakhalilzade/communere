import { Injectable } from '@angular/core';
import {
  LocationInterface,
  locationTypes,
} from '../interfaces/location/location.interface';

@Injectable({
  providedIn: 'root',
})
export class ShareLocationService {
  constructor() {}

  getLocationTypes(): locationTypes[] {
    return [
      { name: 'Bussines', value: 1 },
      { name: 'Home', value: 2 },
      { name: 'Office', value: 3 },
    ];
  }

  saveLocation(location: LocationInterface) {
    localStorage.setItem('Location', JSON.stringify(location));
  }

  getLocationInfo() {
    const location = localStorage.getItem('Location');
    if (location) {
      return JSON.parse(location || '');
    }
  }
}
