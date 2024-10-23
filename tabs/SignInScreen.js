import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import firebase from '../firebaseConfig';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Navigate to the Main stack and then to the Home screen
        navigation.navigate('Main', { screen: 'Home' });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderWidth: 1, padding: 5 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, borderWidth: 1, padding: 5 }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
};

export default SignInScreen;