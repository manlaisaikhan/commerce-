"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface DeliveryMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export function DeliveryMap({ onLocationSelect }: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      const icon = L.divIcon({
        html: `<div style="background:rgb(139,92,246);width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      const map = L.map(mapRef.current, {
        center: [47.9184, 106.9177], // Ulaanbaatar center
        zoom: 13,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "",
        maxZoom: 19,
      }).addTo(map);

      mapInstance.current = map;
      setReady(true);

      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=mn`)
          .then((r) => r.json())
          .then((data) => {
            const addr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            onLocationSelect(lat, lng, addr);
          })
          .catch(() => {
            onLocationSelect(lat, lng, `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
          });
      });
    })();

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [onLocationSelect]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-white/70">
        <MapPin size={14} />
        Газрын зураг дээр байршлаа сонгоно уу
      </div>
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <div ref={mapRef} className="w-full h-[280px] sm:h-[320px]" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
            <div className="w-6 h-6 border-2 border-white/10 border-t-violet-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
