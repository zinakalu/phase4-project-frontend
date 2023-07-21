import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import './App.css';
import { statesData } from './data'

function App() {
  const center = [40.63463151377654, -97.89969605983609];
  // const navigate = useNavigate();


  return (
    <div className="App">
     <MapContainer center={center} zoom={10} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NXYqFx4vIix4Ixh8KlN6"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0];
        const stateName = state.properties.name;

        return (
        <></>
        );
        })}
    </MapContainer>
    </div>
  );
}

export default App;
