declare namespace google.maps.visualization {
  interface WeightedLocation {
    location: google.maps.LatLng | google.maps.LatLngLiteral;
    weight: number;
  }

  interface HeatmapLayerOptions {
    data?: Array<
      google.maps.LatLng | google.maps.LatLngLiteral | WeightedLocation
    >;
    dissipating?: boolean;
    gradient?: string[];
    maxIntensity?: number;
    opacity?: number;
    radius?: number;
    map?: google.maps.Map | null;
  }
}
