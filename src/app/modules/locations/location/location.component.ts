import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map } from 'src/app/core/interfaces/location/location.interface';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  selectedLocations: Map[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  submitLocation() {
    this.router.navigate(['share-location'], {
      state: { mapConfigMode: true, mapLocations: this.selectedLocations },
    });
  }

  getLocations(event: any) {
    this.selectedLocations.push(event);
  }
}
