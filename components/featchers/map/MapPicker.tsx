"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { api } from "@/lib/api";

type Location = {
  lat: number;
  lng: number;
};

type MapPickerProps = {
  value?: Location | null;
  onChange: (location: Location) => void;
  onPlaceSelect?: (address: string) => void;
};

type Place = {
  id: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  distance_m: number;
};

type PlaceSearchResponse = {
  addresses: Place[];
};

type CachedSearch = {
  expiresAt: number;
  results: Place[];
};

const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 850;
const SEARCH_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function searchCacheKey(query: string, center: L.LatLng) {
  const normalizedQuery = query
    .replaceAll("ي", "ی")
    .replaceAll("ك", "ک")
    .trim()
    .toLowerCase();

  return `mapir-search:${normalizedQuery}:${center.lat.toFixed(3)}:${center.lng.toFixed(3)}`;
}

function getCachedSearch(key: string): Place[] | null {
  try {
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;

    const value = JSON.parse(cached) as CachedSearch;
    if (value.expiresAt <= Date.now()) {
      sessionStorage.removeItem(key);
      return null;
    }

    return value.results;
  } catch {
    return null;
  }
}

function cacheSearch(key: string, results: Place[]) {
  try {
    const value: CachedSearch = {
      results,
      expiresAt: Date.now() + SEARCH_CACHE_TTL_MS,
    };

    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Browsers may disable storage; search still works through the server cache.
  }
}

function MapController({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  return null;
}

function LocationMarker({ value, onChange }: MapPickerProps) {
  useMapEvents({
    click(event) {
      onChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  if (!value) return null;

  return <Marker position={[value.lat, value.lng]} />;
}

function MapCenter({ value }: { value?: Location | null }) {
  const map = useMap();

  useEffect(() => {
    if (!value) return;

    map.setView([value.lat, value.lng], map.getZoom());
  }, [value, map]);

  return null;
}

type SearchControlProps = {
  map: L.Map | null;
  onSelect: (place: Place) => void;
};

function SearchControl({ map, onSelect }: SearchControlProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const requestId = useRef(0);
  const skipNextSearch = useRef(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }

    if (trimmedQuery.length < MIN_SEARCH_LENGTH || !map) {
      return;
    }

    const timeout = setTimeout(async () => {
      const currentRequestId = ++requestId.current;
      const center = map.getCenter();
      const cacheKey = searchCacheKey(trimmedQuery, center);
      const cachedResults = getCachedSearch(cacheKey);

      if (cachedResults) {
        if (currentRequestId === requestId.current) {
          setResults(cachedResults);
          setHasSearched(true);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get<PlaceSearchResponse>(
          `/places/search?q=${encodeURIComponent(
            trimmedQuery,
          )}&lat=${center.lat}&lng=${center.lng}`,
        );

        if (currentRequestId === requestId.current) {
          cacheSearch(cacheKey, response.addresses);
          setResults(response.addresses);
          setHasSearched(true);
        }
      } catch (error) {
        console.error("Place search error:", error);

        if (currentRequestId === requestId.current) {
          setResults([]);
          setError(
            error instanceof Error &&
              error.message === "daily place search limit reached"
              ? "سهمیهٔ روزانهٔ جست‌وجوی مکان تمام شده است."
              : "جستجوی مکان با خطا مواجه شد. دوباره تلاش کنید.",
          );
          setHasSearched(true);
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, map]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    requestId.current += 1;
    setResults([]);
    setError("");
    setLoading(false);
    setHasSearched(false);
  };

  const handleSelect = (place: Place) => {
    onSelect(place);

    skipNextSearch.current = true;
    setQuery(place.title);
    setResults([]);
    setError("");
    setHasSearched(false);
  };

  return (
    <div className="relative w-full" dir="rtl">
      <div className="rounded-2xl border border-border/80 bg-card p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between px-1">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="material-symbols-outlined text-[18px] text-primary">
              search
            </span>
            جست‌وجوی هوشمند مکان
          </label>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-muted-foreground">
            location_on
          </span>
          <input
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder="مثلاً سینما تماشا، بیمارستان یا داروخانه"
            className="h-12 w-full rounded-xl border border-input bg-background py-3 pr-11 pl-11 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          {loading ? (
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 animate-spin text-[20px] text-primary">
              progress_activity
            </span>
          ) : query ? (
            <button
              type="button"
              onClick={() =>
                handleQueryChange({
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="پاک کردن جست‌وجو"
            >
              <span className="material-symbols-outlined text-[19px]">
                close
              </span>
            </button>
          ) : null}
        </div>

        <p className="mt-2 px-1 text-[11px] text-muted-foreground">
          حداقل ۳ حرف بنویسید تا مکان‌های مرتبط پیشنهاد شوند.
        </p>
      </div>

      {results.length > 0 && (
        <div className="absolute z-[1000] mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl">
          {results.map((place) => (
            <button
              key={place.id}
              type="button"
              onClick={() => handleSelect(place)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-primary/10 focus:bg-primary/10 focus:outline-none"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <span className="material-symbols-outlined text-[20px]">
                  location_on
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {place.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {place.address}
                </span>
              </span>
              <span className="shrink-0 rounded-lg bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                {Math.round(place.distance_m)} متر
              </span>
            </button>
          ))}
        </div>
      )}

      {hasSearched &&
        !loading &&
        query.trim().length >= MIN_SEARCH_LENGTH &&
        !error &&
        results.length === 0 && (
          <p className="mt-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            مکانی با این نام پیدا نشد؛ نام یا بخش دیگری از آدرس را امتحان کنید.
          </p>
        )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function MapPicker({
  value,
  onChange,
  onPlaceSelect,
}: MapPickerProps) {
  const [map, setMap] = useState<L.Map | null>(null);

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

  const handleSelectPlace = (place: Place) => {
    onChange({
      lat: place.latitude,
      lng: place.longitude,
    });
    onPlaceSelect?.(place.address);

    if (map) {
      map.setView(
        [place.latitude, place.longitude],
        Math.max(map.getZoom(), 15),
      );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3">
        <SearchControl map={map} onSelect={handleSelectPlace} />
      </div>

      <div className="overflow-hidden rounded-xl">
        <MapContainer
          center={[35.6892, 51.389]}
          zoom={12}
          scrollWheelZoom
          className="h-80 w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController onMapReady={setMap} />

          <MapCenter value={value} />

          <LocationMarker value={value} onChange={onChange} />
        </MapContainer>
      </div>
    </div>
  );
}
