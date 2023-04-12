import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import axios from 'axios';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker/src';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context for sharing authenticated user credentials. includes token
import { CredentialsContext } from '../components/CredentialsContext';
import {
  InnerContainer,
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


const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2023, 0, 1));
  const [dob, setDob] = useState();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // Context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  }

  const showDatePicker = () => {
    setShow(true);
  }


  // Function to handle the user login
  const handleSignup = (credentials, setSubmitting) => {
    // Clears the previous message
    handleMessage(null);
    const authLoginUrl = 'http://192.168.232.173:5000/user/login'
    console.log(credentials);

    axios.post('http://192.168.1.7:5000/user/signup', credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, user } = result;
        console.log(user);
        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          // navigation.navigate('Welcome', { ...user });
          persistLogin({...user}, message, status)
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

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="auto" />

        <InnerContainer>
          <PageTitle>Kisaan Awaaz</PageTitle>
          <SubTitle>Account Signup</SubTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              display="spinner"
              mode='date'
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{ name: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
            onSubmit={(values, { setSubmitting }) => {

              values = { ...values, dateOfBirth: dob };
              // Validating for empty fields
              if (values.email == '' || values.password == '' || values.name == '' || values.confirmPassword == '') {
                handleMessage("All fields are required");
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage("Passwords do not match");
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>

              <MyTextInput
                label="Full Name"
                icon="person"
                placeholder="Aqib Naeem"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />

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

              <MyTextInput
                label="Date of Birth"
                icon="calendar"
                placeholder="YYYY - MM - DD"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('dateOfBirth')}
                onBlur={handleBlur('dateOfBirth')}
                value={dob ? dob.toDateString() : ''}
                isDate={true}
                editable={false}
                showDatePicker={showDatePicker}
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

              <MyTextInput
                label=" Confirm Password"
                icon="lock"
                placeholder="* * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <MsgBox type={messageType}>{message}</MsgBox>

              {!isSubmitting &&
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Signup</ButtonText>
                </StyledButton>
              }

              {isSubmitting &&
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary} />
                </StyledButton>
              }

              <Line />

              <ExtraView>
                <ExtraText>Already have an Account?  </ExtraText>
                <TextLink onPress={() => navigation.navigate("Login")}>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ExtraView>

            </StyledFormArea>)}
          </Formik>

        </InnerContainer>

      </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && <TouchableOpacity onPress={showDatePicker}>
        <StyledTextInput {...props} />
      </TouchableOpacity>}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  )
}

export default Signup;