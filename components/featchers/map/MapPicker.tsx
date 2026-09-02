"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

type Location = {
  lat: number;
  lng: number;
};

type MapPickerProps = {
  value?: Location | null;
  onChange: (location: Location) => void;
};

function LocationMarker({
  value,
  onChange,
}: MapPickerProps) {
  useMapEvents({
    click(e) {
      onChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  if (!value) return null;

  return (
    <Marker
      position={[value.lat, value.lng]}
    />
  );
}

export default function MapPicker({
  value,
  onChange,
}: MapPickerProps) {
  useEffect(() => {
    const defaultIcon = L.icon({
      iconUrl: "/leaflet/marker-icon.png",
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      shadowUrl: "/leaflet/marker-shadow.png",

      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  return (
    <MapContainer
      center={[35.6892, 51.389]}
      zoom={12}
      scrollWheelZoom
      className="h-80 w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        value={value}
        onChange={onChange}
      />
    </MapContainer>
  );
}
