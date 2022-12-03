export interface locationTypes {
  name: string;
  value: number;
}

export interface Map {
  lat: number;
  lng: number;
}
export interface LocationRequest {
  name: string;
  map: Map;
  type: number;
  logo: string;
}
