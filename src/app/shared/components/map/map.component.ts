import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() width: string = '100vh';
  @Input() height: string = '100vw';

  @Output() locations = new EventEmitter<any>();

  map: L.Map;
  marker: L.Marker;
  center: L.LatLngExpression;
  mapMarkerIcon = L.icon({
    iconUrl: 'marker-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  constructor() {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.center = [pos.coords.latitude, pos.coords.longitude];
        this.initMap();
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.center,
      zoom: 3,
      dragging: true,
    });

    this.marker = L.marker(this.center, {
      icon: this.mapMarkerIcon,
      draggable: true,
    }).addTo(this.map);

    this.map.on('click', (e) => {
      L.marker([e.latlng.lat, e.latlng.lng], {
        icon: this.mapMarkerIcon,
      }).addTo(this.map);
      this.locations.emit(e.latlng);
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 15,
        minZoom: 4,

        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }
}
