import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  LocationInterface,
  locationTypes,
} from 'src/app/core/interfaces/location/location.interface';
import { ShareLocationService } from 'src/app/core/services/share-location.service';

@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.css'],
})
export class ShareLocationComponent implements OnInit {
  locationTypes: locationTypes[];
  locationInfo: LocationInterface;
  IsLogoExist: boolean = false;
  routerData;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private shareLocationService: ShareLocationService
  ) {
    this.routerData = this.router.getCurrentNavigation()?.extras.state;
    if (this.routerData?.['mapConfigMode']) {
      this.getLocationInfoForm();
      this.IsLogoExist = true;
    }
  }

  shareLocationForm = this.fb.group({
    locationName: ['', Validators.required],
    map: [{ lat: 51.5, lng: 0.12 }],
    locationType: 1,
    logo: '',
  });

  ngOnInit(): void {
    this.getLocationTypesForm();
    this.locationInfo = this.shareLocationService.getLocationInfo();
    if (this.locationInfo) {
      this.getLocationInfoForm();
    }
  }

  getLocationTypesForm() {
    this.locationTypes = this.shareLocationService.getLocationTypes();
  }

  getLocationInfoForm() {
    this.locationInfo = this.shareLocationService.getLocationInfo();
    this.shareLocationForm.patchValue({
      locationName: this.locationInfo.name,
      map: this.routerData?.['mapLocations'],
      locationType: this.locationInfo.type,
      logo: this.locationInfo.logo,
    });
  }

  onChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.shareLocationForm.patchValue({
        logo: String(reader.result),
      });
    };
    this.locationInfo = this.shareLocationService.getLocationInfo();
    if (this.locationInfo) {
      this.IsLogoExist = true;
    }
  }

  saveShareLocation() {
    console.log(this.shareLocationForm.value);
    const form = this.shareLocationForm.value;
    const location: LocationInterface = {
      name: form.locationName ?? '',
      map: this.routerData?.['mapLocations']
        ? this.routerData?.['mapLocations']
        : [],
      type: form.locationType ?? 1,
      logo: form.logo ?? '',
    };
    this.shareLocationService.saveLocation(location);
    this.getLocationInfoForm();
  }

  goToMap() {
    this.saveShareLocation();
    this.router.navigate(['/location']);
  }
}
