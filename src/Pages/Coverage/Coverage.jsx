import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fly to location component
function FlyToLocation({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 10, { duration: 1.0 });
        }
    }, [position, map]);
    return null;
}

const Coverage = () => {
    const branches = useLoaderData();
    const [search, setSearch] = useState("");
    const [flyPosition, setFlyPosition] = useState(null);
    const [popupContent, setPopupContent] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Update suggestions while typing
    useEffect(() => {
        const q = search.trim().toLowerCase();
        if (!q) {
            setSuggestions([]);
            return;
        }

        const matches = [];
        branches.forEach((b) => {
            const district = b.district.toLowerCase();
            const city = b.city.toLowerCase();
            const covered = (b.covered_area || []).join(" ").toLowerCase();

            if (district.startsWith(q) && !matches.includes(b.district)) {
                matches.push(b.district);
            } else if (city.startsWith(q) && !matches.includes(b.city)) {
                matches.push(b.city);
            } else {
                // check covered areas
                b.covered_area.forEach((area) => {
                    if (area.toLowerCase().startsWith(q) && !matches.includes(area)) {
                        matches.push(area);
                    }
                });
            }
        });

        setSuggestions(matches.slice(0, 5)); // max 5 suggestions
    }, [search, branches]);

    // Search or select from suggestion
    const handleSearch = (value) => {
        const q = (value || search).trim().toLowerCase();
        if (!q) {
            alert("Please type a district, city or area to search.");
            return;
        }

        // Exact district/city/region match
        let branch = branches.find((b) => {
            const district = (b.district || "").toLowerCase();
            const city = (b.city || "").toLowerCase();
            const region = (b.region || "").toLowerCase();
            return district === q || city === q || region === q;
        });

        // Partial match in covered_area
        if (!branch) {
            branch = branches.find((b) => {
                return (b.covered_area || []).some(
                    (area) => area.toLowerCase() === q
                );
            });
        }

        if (!branch) {
            alert("District not found!");
            return;
        }

        setFlyPosition([branch.latitude, branch.longitude]);
        setPopupContent(branch.district);
        setSearch(branch.district);
        setSuggestions([]);
    };

    return (
        <div className="min-h-screen bg-base-100 mt-8 mb-24 py-8 px-4 rounded-4xl">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center md:text-left mb-4">
                    We are available in 64 districts
                </h1>

                {/* Search */}
                <div className="relative max-w-md my-8">
                    <input
                        type="text"
                        placeholder="Search district, city or area (e.g. Bhola)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full rounded-full pr-12"
                    />
                    <button
                        onClick={() => handleSearch()}
                        className="absolute right-0 top-0 h-full btn btn-primary rounded-full px-4 flex items-center text-secondary gap-2"
                    >
                        Search
                    </button>

                    {/* Suggestions dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-52 overflow-y-auto shadow-lg">
                            {suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSearch(s)}
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="text-center md:text-left mb-6">
                    <p className="text-sm text-gray-600">
                        Try typing <strong>Bhola</strong>, <strong>Dhaka</strong>, or{" "}
                        <strong>Tongi</strong>.
                    </p>
                </div>

                <hr className="my-12" />

                <h2 className="text-2xl font-semibold text-center md:text-left text-secondary mb-4">
                    We deliver almost all over Bangladesh
                </h2>

                {/* Map */}
                <div className="h-[450px] w-full rounded-xl overflow-hidden shadow">
                    <MapContainer
                        center={[23.685, 90.3563]}
                        zoom={7}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {branches.map((branch, index) => (
                            <Marker
                                key={index}
                                position={[branch.latitude, branch.longitude]}
                            >
                                <Popup>
                                    <div className="max-w-xs">
                                        <h3 className="font-bold text-lg mb-1">
                                            {branch.district}, {branch.city}
                                        </h3>
                                        <p className="text-sm mb-1">
                                            <strong>Region:</strong> {branch.region}
                                        </p>
                                        <p className="text-sm mb-2">
                                            <strong>Areas:</strong> {branch.covered_area.join(", ")}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {/* Fly to searched location */}
                        {flyPosition && (
                            <>
                                <FlyToLocation position={flyPosition} />
                                <Marker position={flyPosition}>
                                    <Popup autoOpen>{popupContent}</Popup>
                                </Marker>
                            </>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Coverage;
