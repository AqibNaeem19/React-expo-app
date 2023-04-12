import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import axios from 'axios';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// importing Styled-components
import {
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledContainer,
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


const ForgotPassword = ({ navigation }) => {

  // Component states
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [receivedCode, setReceivedCode] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  

  // Function to handle the user login
  const handleLogin = (credentials, setSubmitting) => {
    // Clears the previous message
    let requestHandle = !receivedCode ? 'http://192.168.1.6:5000/user/reset-request' : 'http://192.168.1.6:5000/user/reset-password';
    handleMessage(null);
    axios.post(requestHandle, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status } = result;
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        }
        setSubmitting(false);
        if (status === 'SUCCESS' && !receivedCode) {
          setReceivedCode(true);
        }
        if(status === 'SUCCESS' && receivedCode){
          console.log('Password updated successfully')
          navigation.navigate("Login")
        }

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


  // Main return of the component
  return (
    <KeyboardAvoidingWrapper>

      <StyledContainer>
        <StatusBar style="auto" />
        <InnerContainer>
          <PageLogo passFor={true} resizeMode="cover" source={require('../assets/img/passwordForgot.png')} />
          <PageTitle>Reset Password</PageTitle>

          <Formik
            initialValues={{ email: '', password: '', code: '' }}
            onSubmit={(values, { setSubmitting }) => {
              // Validating for empty fields
              if ((!receivedCode && values.email == '') || (receivedCode && values.password == '' && values.code == '')) {
                if (!receivedCode) {
                  handleMessage("Email is required");
                  setSubmitting(false);
                } else {
                  if (values.password == '' && values.code == '') {
                    handleMessage("Fill al fields");
                    setSubmitting(false);
                  } else if (values.code == '') {
                    handleMessage("Code is required");
                    setSubmitting(false);
                  } else if( values.password == '') {
                    handleMessage("Password is required");
                    setSubmitting(false);
                  }
                }
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="abc@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {receivedCode &&
                <>
                  <MyTextInput
                    label="Reset Code"
                    icon="person"
                    placeholder="50794"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    value={values.code}
                  />
                  <MyTextInput
                    label="Password"
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
                </>
              }
              <MsgBox type={messageType}>{message}</MsgBox>

              {!isSubmitting && 
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>{!receivedCode ? 'Send me code': 'Update password'}</ButtonText>
                </StyledButton>
              }

              {isSubmitting &&
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary} />
                </StyledButton>
              }

              <Line />
            </StyledFormArea>
            )}

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

export default ForgotPassword;