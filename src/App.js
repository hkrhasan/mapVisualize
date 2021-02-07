import logo from './logo.svg';
import './App.css';
import Map from './Map';
import RangeSlider from 'react-bootstrap-range-slider';
import { useEffect, useState } from 'react';
import { arrayToKey, clientAreaChecking } from './utils';
import { center, south, east, west } from './polygon';

function App() {
  const [formData, setFormData] = useState({})
  const [ resolution, setResolution ] = useState(0);
  const [centerKeys, setCenterKeys] = useState(null)
  const [southKeys, setSouthKeys] = useState([])
  const [westKeys, setWestKeys] = useState([])
  const [eastKeys, setEastKeys] = useState([])


  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
  const {lat, lng} = formData

  useEffect(() => {
    arrayToKey(center, Number(resolution), true)
      .then((keys) => setCenterKeys(keys))
    
    // arrayToKey(south, Number(resolution), true)
    //   .then((keys) => setSouthKeys(keys))
    
    // arrayToKey(west, Number(resolution), true)
    //   .then((keys) => setWestKeys(keys))
    
    // arrayToKey(east, Number(resolution), true)
    //   .then((keys) => setEastKeys(keys))
  },[resolution])

  // console.log("Center >>>",centerKeys)
  // console.log("South >>>",southKeys)
  // console.log("East >>>",westKeys)
  // console.log("West >>>",eastKeys)

  

  const onClick = async() => {
    if(lat && lng){
      // console.log(centerKeys)
      clientAreaChecking(lat, lng, centerKeys, resolution)
    } else{
      console.log("I want Lat Lng.... :>")
    }
  }

  return (
    <div className="App">
      <Map 
        centerIndex={centerKeys}
        southKeys={southKeys}
        westKeys={westKeys}
        eastKeys={eastKeys}
        onClick={setFormData}

      />
      <div style={{position:'absolute', zIndex: 999, top:0, left:0, backgroundColor:'#fff', padding: '20px'}}>
        <input type="number" value={resolution} onChange={(e) => setResolution(e.target.value)} />
        <h3>{centerKeys?.length}</h3>
      </div>
      <div style={{position:'absolute', zIndex: 999, top:0, right:0, backgroundColor:'#fff', padding: '20px'}}>
        <input type="text" placeholder="Lat" value={lat} onChange={onChange} name="lat" />
        <input type="text" placeholder="Lng" value={lng} onChange={onChange} name="lng" />
        <button onClick={onClick}>Validate</button>
      </div>
    </div>
  );
}

export default App;
