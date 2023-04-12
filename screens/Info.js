import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  InfoContainer,
  InfoBox,
  InfoText,
  InfoIcon,
  Colors,
} from '../components/styles';

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;


const myData = [
  { message: "This is my first message" },
  { message: "This is my second message" },
  { message: "This is my third message" },
  { message: "This is my fourth message" },
  { message: "This is my fifth message" },
  { message: "This is my sixth message" },
]

const Info = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <InfoContainer >
            {myData.map((data, index) => (
              <InfoBox key={index}>
                <InfoText>{data.message}</InfoText>
                <InfoIcon>
                  <Ionicons name="volume-high-outline" size={24} color={darkLight} />
                </InfoIcon>
              </InfoBox>
            ))}
          </InfoContainer>

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Info;