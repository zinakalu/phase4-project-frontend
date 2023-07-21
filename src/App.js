import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "./App.css";
import { statesData } from "./data";
import 'leaflet/dist/leaflet.css';

function App() {
  const center = [40.63463151377654, -97.89969605983609];
  // const navigate = useNavigate();

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

          return(
            <Polygon
            key={stateName}
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white',
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: '',
                  color: '#666',
                  fillColor: '#D45962',
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 1,
                  weight: 2,
                  dashArray: '3',
                  color: 'white',
                  fillColor: '#FD8D3C',
                });
              },
              click: () => {
                // navigate(`/park-details/${state.properties.name}`);
              },
            }}
          >
            <Tooltip>{stateName}</Tooltip>
          </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
