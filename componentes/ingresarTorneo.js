import React, { useState } from 'react';
import styled from 'styled-components/native';

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
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const DisplayText = styled.Text`
  font-size: 24px;
  margin-top: 20px;
`;

const IngresarTorneo = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleButtonPress = () => {
    setDisplayText(inputText);
  };

  return (
    <Container>
      <InputContainer>
        <StyledTextInput
          placeholder="Ingrese el nombre del Torneo"
          value={inputText}
          onChangeText={setInputText}
        />
      </InputContainer>
      <Button onPress={handleButtonPress}>
        <ButtonText>Ingresar nombre del Torneo</ButtonText>
      </Button>
      {displayText ? <DisplayText>{displayText}</DisplayText> : null}
    </Container>
  );
};

export default IngresarTorneo;


