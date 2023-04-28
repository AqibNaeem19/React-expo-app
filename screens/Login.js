import React, { useState, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import axios from 'axios';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Context for sharing authenticated user credentials. includes token
import { CredentialsContext } from '../components/CredentialsContext';

// importing Styled-components
import {
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledContainer,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors
} from '../components/styles';

const { brand, darkLight, primary } = Colors


const Login = ({ navigation }) => {

  // Component states
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // Context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  // Function to handle the user login
  const handleLogin = (credentials, setSubmitting) => {
    // Clears the previous message
    handleMessage(null);
    const authLoginUrl = 'http://192.168.1.7:5000/user/login'
    console.log(credentials);

    axios.post('http://192.168.1.8:5000/user/login', credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, user } = result;
        console.log(user);
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          // navigation.navigate('Welcome', {...user});
          persistLogin({ ...user }, message, status)
        }

        setSubmitting(false);

      })
      .catch(error => {
        if (error.response.data) {
          const { message, status } = error.response.data;
          handleMessage(message, status);
        } else {
          handleMessage("Request failed, Check your network");
        }
        setSubmitting(false);
      })
  }


  // Function to handle the success, failed messages when user try to login
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  }

  // Function to check the stored user credentials and move to Welcome Component
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('flowerCribCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch(error => {
        console.log(error);
        handleMessage('Persisting login failed')
      })
  }


  // Main return of the component
  return (
    <KeyboardAvoidingWrapper>

      <StyledContainer>
        <StatusBar style="auto" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('../assets/img/img1.png')} />
          <PageTitle>کسان آواز</PageTitle>
          <SubTitle>اکاؤنٹ لاگ ان</SubTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              // Validating for empty fields
              if (values.email == '') {
                handleMessage("Email is required");
                setSubmitting(false);
              } else if (values.password == '') {
                handleMessage("Password is required");
                setSubmitting(false);
              }
              else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
              <MyTextInput
                label="ای میل اڈریس"
                icon="mail"
                placeholder="abc@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                label="پاس ورڈ"
                icon="lock"
                placeholder="* * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox type={messageType}>{message}</MsgBox>

              {!isSubmitting &&
                <>
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>لاگ ان کریں</ButtonText>
                  </StyledButton>
                  <ExtraView>
                    <TextLink onPress={() => navigation.navigate("ForgotPassword")}>
                      <TextLinkContent>دوبارہ ترتیب دیں</TextLinkContent>
                    </TextLink>
                    <ExtraText>پاسورڈ بھول گے؟ </ExtraText>
                  </ExtraView>
                </>
              }

              {isSubmitting &&
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary} />
                </StyledButton>
              }

              <Line />
              <StyledButton google={true} onPress={() => navigation.navigate("Signup")}>
                <ButtonText>  نیا اکاؤنٹ بنائیں</ButtonText>
                <Ionicons name="create-outline" color={primary} size={27} />
              </StyledButton>
            </StyledFormArea>)}

          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  )
}

export default Login;