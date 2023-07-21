import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "./App.css";
import { statesData } from "./data";
import "leaflet/dist/leaflet.css";

/**
 * https://stackoverflow.com/questions/65427633/fetch-data-from-local-api

 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

https://react-leaflet.js.org/docs/api-map/
 */

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // console.log(position)
  // get that position for ex. [40, 40]
  // add in backend
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function App() {
  const center = [40.63463151377654, -97.89969605983609];
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("hi?");
    const url = "/activities";

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/activities");
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NXYqFx4vIix4Ixh8KlN6"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />

        {statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0];
          const stateName = state.properties.name;

          return (
            <Polygon
              key={stateName}
              pathOptions={{
                fillColor: "#FD8D3C",
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: "white",
              }}
              positions={coordinates}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 2,
                    dashArray: "",
                    color: "#666",
                    fillColor: "#D45962",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 1,
                    weight: 2,
                    dashArray: "3",
                    color: "white",
                    fillColor: "#FD8D3C",
                  });
                },
                click: () => {
                  // navigate(`/park-details/${state.properties.name}`);
                },
              }}
            >
              <Popup>{stateName}</Popup>
              <Tooltip>{stateName}</Tooltip>
            </Polygon>
          );
        })}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default App;
