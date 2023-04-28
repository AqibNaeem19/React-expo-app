import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Colors } from './styles';


const {
  primary,
  secondary,
  tertiary,
  darkLight,
  brand,
  green,
  red
} = Colors

let allChats = [
  {
    "id": 1,
    "user_name": "user",
    "message": "کسان آواز میں خوش آمدید",
    "date": "12:04 PM"
  },
  {
    "id": 2,
    "user_name": "bot",
    "message": "بہت خوش آمدید",
    "date": "12:54 PM"
  },
  {
    "id": 2,
    "user_name": "user",
    "message": "کل لاہور میں درجہ حرارت کیا ہو گا؟",
    "date": "12:54 PM"
  },
  {
    "id": 2,
    "user_name": "bot",
    "message": "کل کس وقت کا درجہ حرارت",
    "date": "12:54 PM"
  },
  {
    "id": 2,
    "user_name": "user",
    "message": "صبح کا",
    "date": "12:54 PM"
  },
  {
    "id": 2,
    "user_name": "bot",
    "message": "کل لاہور میں صبح کا درجہ حرارت 27 ڈگری سیلسیس ہو گا",
    "date": "12:54 PM"
  }
]

let allChats1 = [
  {
  "id": 1,
  "user_name": "user",
  "message": "السلام علیکم",
  "date": "12:04 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "کسان آواز میں خوش آمدید",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "آپ کس سروس کے متعلق جاننا چاہتے ہیں؟",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "user",
  "message": "رات کو کیا درجہ حرارت رہے گا",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "آپ کس شہر میں موجود ہیں؟",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "user",
  "message": "پشاور",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "آپ کو کس دن کے موسم کا حال جاننا ہے؟",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "user",
  "message": "آج کا",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "کل پشاور میں رات میں درجہ حرارت 23.52 ڈگری سینٹی گریڈ رہے گا۔",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "کیا آپ نے کچھ اور معلوم کرنا ہے؟",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "user",
  "message": "جی نہیں",
  "date": "12:54 PM"
  },
  {
  "id": 2,
  "user_name": "bot",
  "message": "کسان آواز استعمال کرنے کا شکریہ۔ اللہ حافظ",
  "date": "12:54 PM"
  }
  ]

  let allChats2 = [
    {
    "id": 1,
    "user_name": "user",
    "message": "السلام علیکم",
    "date": "12:04 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "کسان آواز میں خوش آمدید",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "آپ کس سروس کے متعلق جاننا چاہتے ہیں؟",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "user",
    "message": "ہوا میں نمی کی مقدار کیا ہوگی",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "آپ کس شہر میں موجود ہیں؟",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "user",
    "message": "چنیوٹ",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "آپ کو کس دن کے موسم کا حال جاننا ہے؟",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "user",
    "message": "کل کا",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "کل کو چنیوٹ میں ہوا میں نمی کا تناسب 26 فیصد رہے گا۔",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "کیا آپ نے کچھ اور معلوم کرنا ہے؟",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "user",
    "message": "نہیں",
    "date": "12:54 PM"
    },
    {
    "id": 2,
    "user_name": "bot",
    "message": "کسان آواز استعمال کرنے کا شکریہ۔ اللہ حافظ",
    "date": "12:54 PM"
    }
    ]

    let allChats3 = [
      {
        "id": 1,
        "user_name": "user",
        "message": "سلام"
      },
      {
        "id": 2,
        "user_name": "bot",
        "message": "کسان آواز میں خوش آمدید۔ آپ کس سروس کے متعلق جاننا چاہتے ہیں؟"
      },
      {
        "id": 3,
        "user_name": "user",
        "message": "ہوا کس سپیڈ سے چل رہی ہے؟"
      },
      {
        "id": 4,
        "user_name": "bot",
        "message": "آپ کس شہر میں موجود ہیں؟"
      },
      {
        "id": 5,
        "user_name": "user",
        "message": "گوجرانوالہ میں"
      },
      {
        "id": 6,
        "user_name": "bot",
        "message": "آپ کو کس دن کے موسم کا حال جاننا ہے؟"
      },
      {
        "id": 7,
        "user_name": "user",
        "message": "آج کا"
      },
      {
        "id": 8,
        "user_name": "bot",
        "message": "آج گوجرانوالہ میں ہوا 6.23 کلو میٹر فی گنٹہ کی رفتار سے چل رہی ہے۔ کیا آپ نے کچھ اور معلوم کرنا ہے؟"
      },
      {
        "id": 9,
        "user_name": "user",
        "message": "نہیں"
      },
      {
        "id": 10,
        "user_name": "bot",
        "message": "کسان آواز استعمال کرنے کا شکریہ۔ اللہ حافظ"
      }
    ];
    

export default function Chatbot() {
  const [recording, setRecording] = React.useState();
  const [uri, setUri] = useState();
  const scrollViewRef = useRef();


  // Function to start recording audio
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  // Function to stop recording and convert audio into blob object
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setUri(uri);
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // utitlity function to convert BLOB to BASE64
    const blobToBase64 = (blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    };

    const audioURI = recording.getURI();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", audioURI, true);
      xhr.send(null);
    });

    const audioBase64 = await blobToBase64(blob);
    console.log(audioBase64);
    blob.close();

    // Object to send to the audio-transcoding server
    let baseOfRecordedFile = {
      getM4aBase64: audioBase64
    }

    fetch("https://radiant-springs-39951.herokuapp.com/convert-audio", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ; odata=verbose'
      },
      body: JSON.stringify(baseOfRecordedFile)
    }).then((response) => response.json())
      .then((data) => {
        console.log('I am the data here', data)
      })
  }



  return (
    <View style={styles.main_container}>
      <View style={styles.chat_container}>
        <ScrollView ref={scrollViewRef}
                  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
          <View>
           
            {allChats.length > 0 ?
              // Added return statement to map function
              allChats3.map((chat, index) => (
                <View key={index} style={chat.user_name === "user" ? styles.right_single_chat : styles.left_single_chat}>
                  <Text style={chat.user_name === "user" ? styles.right_single_chat_text : styles.left_single_chat_text}>{chat.message}</Text>
                </View>
              ))
              :
              <Text style={styles.no_chat_text}>ریکارڈنگ شروع کرنے کے لیے بٹن دبائیں</Text>
            }
          </View>
        </ScrollView>

      </View>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.recording_button} onPress={recording ? stopRecording : startRecording}>
          <Text style={styles.recording_btn_text}>{recording ? 'ریکارڈ بند کرو' : 'ریکارڈ شروع کریں'}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.recording_button} onPress={() => setRecording(!recording)}>
          <Text style={styles.recording_btn_text}>{recording ? 'ریکارڈ بند کرو' : 'ریکارڈ شروع کریں'}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

// Below are the styles only
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  chat_container: {
    flex: 5,
    width: '100%',
  },
  right_single_chat: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'right',
    margin: 20,
    maxWidth: '60%',
    borderWidth: 1,
    position: 'relative',
    left: '30%',
    backgroundColor: secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderColor: brand
  },
  left_single_chat: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'right',
    margin: 20,
    maxWidth: '60%',
    borderWidth: 1,
    backgroundColor: brand,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderColor: secondary
  },
  left_single_chat_text: {
    color: 'white',
  },
  no_chat_text: {
    fontSize: 25,
    color: tertiary,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.5
  },
  button_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 100,
    backgroundColor: secondary,
  },
  recording_button: {
    width: 200,
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: tertiary,
    borderWidth: 1.5,
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 7, // Shadow radius
    elevation: 4, // Elevation for Android
  },
  recording_btn_text: {
    color: tertiary,
    fontSize: 20
  }

})