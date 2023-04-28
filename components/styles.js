import styled from 'styled-components/native';
import { Animated, ScrollView, View } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 70}px  
  background-color: ${primary}
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

// export const PageLogo = styled.Image`
//   width: 250px;
//   height: 200px;
// `;
export const PageLogo = styled.Image`
  width: ${props => props.passFor === true ? '300px' : '250px'};
  height: ${props => props.passFor === true ? '300px' : '200px'};
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 15px;
  text-align: right;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 32px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 32px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${(props) => props.google == true && `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) => props.google == true && `
    margin-left: 20px;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${props => props.type == 'SUCCESS' ? green : red};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

export const NavbarContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0px 20px;
  padding-top: ${StatusBarHeight + 5}px;  
`;

export const NavbarText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${tertiary};
`;

export const NavbarButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${StatusBarHeight + 40}px;
  margin:10px 0px;
`;

export const InfoBox = styled.TouchableOpacity`
  width: 70%;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  border-width: 2px;
  border-color: ${brand};
  border-radius: 20px;
  background-color: ${primary};
  position: relative;
 
`;

export const InfoText = styled.Text`
  font-size: 20px;
`

export const InfoIcon = styled.View`
  position: absolute;
  bottom: 5px;
  left: 15px;
`;