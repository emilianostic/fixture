import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Text } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const InputContainer = styled.View`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-color: gray;
  border-width: 1px;
  border-radius: 5px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  padding-left: 8px;
`;

const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #007bff;
  border-radius: 5px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const DisplayText = styled.Text`
  font-size: 24px;
  margin-top: 20px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-top: 10px;
`;

const DeshacerButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: #dc3545;
  border-radius: 5px;
  margin-top: 10px;
  align-self: flex-start;
`;

const DeshacerButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const CrearEquipos = () => {
  const [inputText, setInputText] = useState('');
  const [equipos, setEquipos] = useState([]);
  const [torneoCreado, setTorneoCreado] = useState(false);
  const [error, setError] = useState('');

  const handleButtonPress = () => {
    if (inputText.trim()) {
      setEquipos([...equipos, inputText]);
      setInputText('');
      setError('');
    }
  };

  const handleCrearTorneo = () => {
    if (equipos.length < 2) {
      setError('Debe haber al menos dos equipos para crear un torneo.');
    } else {
      setTorneoCreado(true);
      setError('');
    }
  };

  const handleDeshacerTorneo = () => {
    setEquipos([]);
    setTorneoCreado(false);
    setError('');
  };

  return (
    <Container>
      <Text>Crear Equipos</Text>
      {!torneoCreado && (
        <>
          <InputContainer>
            <StyledTextInput
              placeholder="Ingrese el nombre del equipo"
              value={inputText}
              onChangeText={setInputText}
              editable={!torneoCreado}
            />
          </InputContainer>
          <Button onPress={handleButtonPress}>
            <ButtonText>Ingresar Equipo</ButtonText>
          </Button>
        </>
      )}
      {equipos.length > 0 && (
        <>
          <DisplayText>{`Cantidad de equipos: ${equipos.length}`}</DisplayText>
          <DisplayText>{equipos.join(', ')}</DisplayText>
        </>
      )}
      {!torneoCreado && (
        <Button onPress={handleCrearTorneo}>
          <ButtonText>Crear Torneo</ButtonText>
        </Button>
      )}
      {error ? <ErrorText>{error}</ErrorText> : null}
      {torneoCreado && (
        <DeshacerButton onPress={handleDeshacerTorneo}>
          <DeshacerButtonText>Deshacer Torneo</DeshacerButtonText>
        </DeshacerButton>
      )}
    </Container>
  );
};

export default CrearEquipos;



