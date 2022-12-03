import { Injectable } from '@angular/core';
import { LocationRequest } from '../interfaces/location/location.interface';

@Injectable({
  providedIn: 'root',
})
export class ShareLocationService {
  savedLocations: LocationRequest;
  constructor() {}

  saveLocation(location: LocationRequest) {
    localStorage.setItem('Location', JSON.stringify(location));
    return this.savedLocations;
  }
}
