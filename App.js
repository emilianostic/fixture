import React, { useState } from 'react';
import { View } from 'react-native';
import CrearEquipos from './componentes/crearEquipos';
import Image1 from './componentes/Imagen1';
import IngresarEquipo from './componentes/ingresarTorneo';
import Emparejamientos1 from './componentes/emparejamientos1';

export default function App() {
  const [torneoCreado, setTorneoCreado] = useState(false);
  const [equipos, setEquipos] = useState([]);
  const [nombreTorneo, setNombreTorneo] = useState('');

  const handleCrearTorneo = (equipos, nombreTorneo) => {
    setEquipos(equipos);
    setNombreTorneo(nombreTorneo);
    setTorneoCreado(true);
  };

  const handleDeshacerTorneo = () => {
    setTorneoCreado(false);
    setEquipos([]);
    setNombreTorneo('');
  };

  return (
    <View style={{ flex: 1 }}>
      <Image1 />
      {!torneoCreado ? (
        <>
          <IngresarEquipo />
          <CrearEquipos onCrearTorneo={handleCrearTorneo} />
        </>
      ) : (
        <Emparejamientos1 
          equipos={equipos} 
          nombreTorneo={nombreTorneo} 
          onDeshacerTorneo={handleDeshacerTorneo} 
        />
      )}
    </View>
  );
}


