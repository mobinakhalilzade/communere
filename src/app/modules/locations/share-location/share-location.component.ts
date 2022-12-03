import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  LocationRequest,
  locationTypes,
} from 'src/app/core/interfaces/location/location.interface';
import { ShareLocationService } from 'src/app/core/services/share-location.service';

@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.css'],
})
export class ShareLocationComponent implements OnInit {
  locationTypes: locationTypes[] = [
    { name: 'Bussines', value: 1 },
    { name: 'Home', value: 2 },
    { name: 'Office', value: 3 },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private shareLocationService: ShareLocationService
  ) {}

  shareLocationForm = this.fb.group({
    locationName: ['', Validators.required],
    map: { lat: 51.5, lng: 0.12 },
    locationType: 1,
    logo: '',
  });

  ngOnInit(): void {}

  changeLocationTypes(event: any) {
    console.log(event);
  }

  onChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.shareLocationForm.patchValue({
        logo: String(reader.result),
      });
    };
  }

  saveShareLocation() {
    console.log(this.shareLocationForm.value);
    const form = this.shareLocationForm.value;
    const location: LocationRequest = {
      name: form.locationName ?? '',
      map: form.map!,
      type: form.locationType ?? 1,
      logo: form.logo ?? '',
    };
    this.shareLocationService.saveLocation(location);
  }

  goToMap() {
    this.router.navigate(['/location']);
  }
}
