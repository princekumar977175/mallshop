import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteCheckpoint, CUSTOMER_LOCATION, ROUTE_PATH_COORDINATES } from '../../data/deliveryRoute';
import { Maximize2, LocateFixed } from 'lucide-react';

interface LiveMapProps {
  currentCheckpoint: RouteCheckpoint;
  checkpointIndex: number;
  isDelivered: boolean;
}

export const LiveMap: React.FC<LiveMapProps> = ({
  currentCheckpoint,
  checkpointIndex,
  isDelivered
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);
  const customerMarkerRef = useRef<L.Marker | null>(null);
  const traveledLineRef = useRef<L.Polyline | null>(null);
  const remainingLineRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center between start and destination
    const centerLat = (12.9865 + CUSTOMER_LOCATION.lat) / 2;
    const centerLng = (77.6320 + CUSTOMER_LOCATION.lng) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    // Clean OpenStreetMap tiles (CartoDB Voyager: genuine OSM data with sleek modern palette)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Zoom control on top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Customer Location Marker (Clean custom Pin with Home icon)
    const customerIcon = L.divIcon({
      className: 'custom-customer-pin',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 0; background: rgba(17, 24, 39, 0.15); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 32px; height: 32px; background: #111827; border: 2.5px solid #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div style="position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%); background: #111827; color: #ffffff; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 6px; border-radius: 3px; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            Delivery Point
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    const customerMarker = L.marker([CUSTOMER_LOCATION.lat, CUSTOMER_LOCATION.lng], {
      icon: customerIcon
    }).addTo(map);
    customerMarkerRef.current = customerMarker;

    // Delivery Partner Marker (Motorcycle with pulse ring)
    const driverIcon = L.divIcon({
      className: 'custom-driver-pin',
      html: `
        <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 2px; background: rgba(16, 185, 129, 0.25); border-radius: 50%; animation: pulse 1.8s infinite;"></div>
          <div style="width: 36px; height: 36px; background: #0f172a; border: 2.5px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 14px rgba(0,0,0,0.35);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18.5" cy="17.5" r="3.5"></circle>
              <circle cx="5.5" cy="17.5" r="3.5"></circle>
              <circle cx="15" cy="5" r="1"></circle>
              <path d="M12 17.5V14l-3-3 4-3 2 3h2"></path>
            </svg>
          </div>
          <div style="position: absolute; top: -18px; left: 50%; transform: translateX(-50%); background: #10b981; color: #ffffff; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 6px; border-radius: 3px; white-space: nowrap; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            Rahul (Courier)
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    const driverMarker = L.marker([currentCheckpoint.lat, currentCheckpoint.lng], {
      icon: driverIcon
    }).addTo(map);
    driverMarkerRef.current = driverMarker;

    // Remaining Route Polyline (dashed neutral-500)
    const remainingLine = L.polyline(ROUTE_PATH_COORDINATES, {
      color: '#64748b',
      weight: 4,
      opacity: 0.7,
      dashArray: '8, 8'
    }).addTo(map);
    remainingLineRef.current = remainingLine;

    // Traveled Route Polyline (solid emerald/black)
    const traveledLine = L.polyline([[ROUTE_PATH_COORDINATES[0][0], ROUTE_PATH_COORDINATES[0][1]]], {
      color: '#111827',
      weight: 5,
      opacity: 0.95
    }).addTo(map);
    traveledLineRef.current = traveledLine;

    mapInstanceRef.current = map;

    // Clean up
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Driver Marker & Polylines whenever checkpoint changes
  useEffect(() => {
    if (!mapInstanceRef.current || !driverMarkerRef.current) return;

    const newPos: L.LatLngTuple = [currentCheckpoint.lat, currentCheckpoint.lng];
    driverMarkerRef.current.setLatLng(newPos);

    // Update polylines
    if (traveledLineRef.current && remainingLineRef.current) {
      const traveled = ROUTE_PATH_COORDINATES.slice(0, checkpointIndex + 1);
      const remaining = ROUTE_PATH_COORDINATES.slice(checkpointIndex);

      traveledLineRef.current.setLatLngs(traveled);
      remainingLineRef.current.setLatLngs(remaining);
    }

    // Pan map smoothly to keep vehicle in view
    mapInstanceRef.current.panTo(newPos, {
      animate: true,
      duration: 0.8
    });
  }, [currentCheckpoint, checkpointIndex]);

  // Recenter map button
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds([
      [currentCheckpoint.lat, currentCheckpoint.lng],
      [CUSTOMER_LOCATION.lat, CUSTOMER_LOCATION.lng]
    ]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[520px] rounded-sm overflow-hidden border border-neutral-300 shadow-sm bg-neutral-100">
      {/* Real Interactive Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Map Controls */}
      <div className="absolute bottom-4 left-4 z-20 flex space-x-2">
        <button
          onClick={handleRecenter}
          className="px-3 py-1.5 bg-white text-neutral-800 text-xs font-semibold rounded shadow-md border border-neutral-200 hover:bg-neutral-50 transition-colors flex items-center space-x-1.5"
          title="Fit Route Bounds"
        >
          <LocateFixed className="w-3.5 h-3.5 text-neutral-600" />
          <span>Fit Route</span>
        </button>
      </div>

      {/* Floating Status Pill over Map */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded shadow-sm border border-neutral-200 text-xs font-semibold flex items-center space-x-2 text-neutral-900">
        <span className={`w-2 h-2 rounded-full ${isDelivered ? 'bg-emerald-500' : 'bg-emerald-500 animate-pulse'}`} />
        <span>
          {isDelivered
            ? 'Delivered at Indiranagar'
            : `Courier moving • ${currentCheckpoint.distanceLabel}`}
        </span>
      </div>

      {/* Real Map Attribution */}
      <div className="absolute bottom-1 right-2 z-20 text-[9px] text-neutral-500 bg-white/80 px-1.5 py-0.5 rounded">
        © OpenStreetMap contributors, CartoDB
      </div>
    </div>
  );
};
