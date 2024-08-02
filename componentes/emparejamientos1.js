import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const TopRightText = styled(Text)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const EmparejamientosContainer = styled(View)`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Emparejamiento = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const GolesInput = styled(TextInput)`
  width: 40px;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  text-align: center;
`;

const DeshacerButton = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: #dc3545;
  border-radius: 5px;
  margin-top: 10px;
  align-self: flex-start;
`;

const DeshacerButtonText = styled(Text)`
  color: white;
  font-size: 16px;
`;

const ErrorText = styled(Text)`
  color: red;
  margin-top: 10px;
`;

const Emparejamientos1 = ({ equipos, nombreTorneo, onDeshacerTorneo }) => {
  const numEmparejamientos = Math.floor(equipos.length / 2);
  const initialEmparejamientos = Array(numEmparejamientos).fill([null, null]);

  const [emparejamientos, setEmparejamientos] = useState(initialEmparejamientos);
  const [goles, setGoles] = useState(Array(numEmparejamientos).fill([0, 0]));
  const [puntos, setPuntos] = useState(equipos.reduce((acc, equipo) => ({ ...acc, [equipo]: 0 }), {}));
  const [error, setError] = useState('');

  useEffect(() => {
    if (equipos.length % 2 !== 0) {
      setEmparejamientos([...initialEmparejamientos, [null]]);
    } else {
      setEmparejamientos(initialEmparejamientos);
    }
  }, [equipos]);

  const handleSelectEquipo = (index, equipo, posicion) => {
    const nuevosEmparejamientos = [...emparejamientos];
    nuevosEmparejamientos[index][posicion] = equipo;

    // Verificar si el equipo ya está seleccionado en otro lugar
    const seleccionados = nuevosEmparejamientos.flat();
    const duplicados = seleccionados.filter((item, idx) => item && seleccionados.indexOf(item) !== idx);

    if (duplicados.length > 0) {
      setError(`El equipo ${equipo} ya está seleccionado.`);
    } else {
      setError('');
      setEmparejamientos(nuevosEmparejamientos);
    }
  };

  const handleGolesChange = (index, posicion, value) => {
    const nuevosGoles = [...goles];
    nuevosGoles[index][posicion] = parseInt(value, 10) || 0;
    setGoles(nuevosGoles);
  };

  const handleIngresarResultados = () => {
    if (error) {
      Alert.alert('Error', error);
      return;
    }

    const nuevosPuntos = { ...puntos };
    const nuevosGoles = { ...goles };

    emparejamientos.forEach((emparejamiento, index) => {
      if (emparejamiento.length === 1) return; // Ignorar el equipo sin pareja

      const [equipoA, equipoB] = emparejamiento;
      const golesA = nuevosGoles[index][0];
      const golesB = nuevosGoles[index][1];

      if (golesA > golesB) {
        nuevosPuntos[equipoA] += 3;
      } else if (golesA < golesB) {
        nuevosPuntos[equipoB] += 3;
      } else {
        nuevosPuntos[equipoA] += 1;
        nuevosPuntos[equipoB] += 1;
      }

      nuevosGoles[equipoA] = (nuevosGoles[equipoA] || { aFavor: 0, enContra: 0 });
      nuevosGoles[equipoB] = (nuevosGoles[equipoB] || { aFavor: 0, enContra: 0 });

      nuevosGoles[equipoA].aFavor += golesA;
      nuevosGoles[equipoA].enContra += golesB;
      nuevosGoles[equipoB].aFavor += golesB;
      nuevosGoles[equipoB].enContra += golesA;
    });

    setPuntos(nuevosPuntos);
    setGoles(nuevosGoles);
  };

  const handleDeshacerTorneo = () => {
    Alert.alert(
      'Confirmar',
      '¿Está seguro de eliminar el torneo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => onDeshacerTorneo(),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <Container>
      <TopRightText>{nombreTorneo}</TopRightText>
      {/* <Emparejamientos1 equipos={equipos} nombreTorneo={nombreTorneo} onDeshacerTorneo={handleDeshacerTorneo} /> Ver donde colocar esto */}

      <EmparejamientosContainer>
        {emparejamientos.map((emparejamiento, index) => (
          <Emparejamiento key={index}>
            <Picker
              selectedValue={emparejamiento[0]}
              style={{ height: 50, width: 150 }}
              onValueChange={equipo => handleSelectEquipo(index, equipo, 0)}
            >
              <Picker.Item label="Seleccione un equipo" value={null} />
              {equipos.map(equipo => (
                <Picker.Item key={equipo} label={equipo} value={equipo} />
              ))}
            </Picker>
            <GolesInput
              keyboardType="numeric"
              onChangeText={value => handleGolesChange(index, 0, value)}
            />
            {emparejamiento.length > 1 && (
              <>
                <GolesInput
                  keyboardType="numeric"
                  onChangeText={value => handleGolesChange(index, 1, value)}
                />
                <Picker
                  selectedValue={emparejamiento[1]}
                  style={{ height: 50, width: 150 }}
                  onValueChange={equipo => handleSelectEquipo(index, equipo, 1)}
                >
                  <Picker.Item label="Seleccione un equipo" value={null} />
                  {equipos.map(equipo => (
                    <Picker.Item key={equipo} label={equipo} value={equipo} />
                  ))}
                </Picker>
              </>
            )}
          </Emparejamiento>
        ))}
      </EmparejamientosContainer>
      {error ? <ErrorText>{error}</ErrorText> : null}
      <Button title="Ingresar Resultados" onPress={handleIngresarResultados} />
      <DeshacerButton onPress={handleDeshacerTorneo}>
        <DeshacerButtonText>Deshacer Torneo</DeshacerButtonText>
      </DeshacerButton>
    </Container>
  );
};

export default Emparejamientos1;


