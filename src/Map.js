import React, { useState } from 'react'
import DeckGL from '@deck.gl/react';
import {PolygonLayer} from '@deck.gl/layers';
import {H3HexagonLayer} from '@deck.gl/geo-layers';
import {StaticMap} from 'react-map-gl';
import {center} from './polygon'
// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGtyaGFzYW4iLCJhIjoiY2trbjN3ZGdtMjhtczJvcXR4ODB6OWlyNCJ9.pDWluTS0HNPhKIdjsq08qw';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 77.2090,
    latitude: 28.6139,
    zoom: 11,
    maxZoom: 20,
    pitch: 0,
    bearing: 0
};


export default function Map({centerIndex, southKeys, westKeys, eastKeys, onClick}) {
    const [polyData, setPolyData] = useState({
      pData: []
    })
    const {pData} = polyData

    const polygon = new PolygonLayer({
      id: 'polygon-layer',
      data:  [
        {
          contours: pData
        }
      ] ,
      pickable: true,
      opacity: 0.1,
      stroked: true,
      filled: true,

      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d.contours,
      // getElevation: d => d.population / d.area / 10,
      // getFillColor: d => [255, 0, 0],
      getLineColor: [255, 0, 0],
      getLineWidth: 5
    })
    
    const center = new H3HexagonLayer({
        id: 'center',
        data: centerIndex?.index || [],
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        opacity:0.3,
        elevationScale: 0,
        getHexagon: d => d,
        getFillColor: d => [255, 0, 0],
        // getElevation: d => d
      });
    const south = new H3HexagonLayer({
        id: 'south',
        data: centerIndex?.compactResult  || [],
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        opacity:0.3,
        elevationScale: 0,
        getHexagon: d => d,
        getFillColor: d => [185, 255, 0],
        // getElevation: d => d
      });
    const west = new H3HexagonLayer({
        id: 'west',
        data: centerIndex?.unCompactResult  || [],
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        opacity:0.3,
        elevationScale: 0,
        getHexagon: d => d,
        getFillColor: d => [0, 0, 125],
        // getElevation: d => d
      });
    const east = new H3HexagonLayer({
        id: 'east',
        data: eastKeys  || [],
        pickable: true,
        wireframe: false,
        filled: true,
        extruded: true,
        opacity:0.1,
        elevationScale: 0,
        getHexagon: d => d,
        getFillColor: d => [255, 165, 0],
        // getElevation: d => d
      });

    return (
        <div>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[center, south, west, polygon]}
                onClick={(e) => {
                  onClick({lat: e.coordinate[1], lng: e.coordinate[0]})
                  pData.push(e.coordinate)
                  setPolyData({...polyData, pData})
                  // console.log(polyData)
                  // polyData?.push(e.coordinate)
                  // console.log(polyData)
                }}
            >
                <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}  />
            </DeckGL>
        </div>
    )
}
