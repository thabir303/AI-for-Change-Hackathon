import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicMap from './leaflet/BasicMap'
import MarkersMap from './leaflet/MarkersMap.jsx'
import MarkersMap2 from './leaflet/CurrentLocation.jsx'
import DrawMap from './leaflet/Draw.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './component/home/Home.jsx'
import DescriptionPage from './component/DescriptionPage.jsx'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<DrawMap/>}/>
          <Route path="/map_description/:lat/:lng" element={<DescriptionPage/>}/>


        </Routes>
      </BrowserRouter>

 {/* <BasicMap></BasicMap>
 <MarkersMap2></MarkersMap2>
 <DrawMap></DrawMap> */}
 
    </>
  )
}

export default App
