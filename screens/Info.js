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
  { message: "کسی بھی شہر کا موجودہ موسم جانیں" },
  { message: "کسی بھی شہر کا زیادہ سے زیادہ درجہ حرارت جانیں" },
  { message: "کسی بھی شہر کا کم از کم درجہ حرارت جانیں" },
  { message: "7 دن تک موسم کی پیشن گوئی جانیں" },
  { message: "زرعی مشینری کی قیمتیں جانیں" },
  { message: "کھاد کی قیمتیں جانیں" },
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