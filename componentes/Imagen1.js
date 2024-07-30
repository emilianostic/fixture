import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";

const Imagen1 = () => {
  const ImageMenu = styled(Image)`
    width: 50px;
    height: 50px;
  `;
  const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 10px;
    margin-top: 50px
  `;

  return (
    <Container>
      <ImageMenu source={require("../assets/home.png")}></ImageMenu>
    </Container>
  );
};
export default Imagen1;
