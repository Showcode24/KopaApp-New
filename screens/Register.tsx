import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Text, Checkbox } from 'react-native-paper';
import { COLORS, FONTS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../constants/firebase';

export const Register = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'tutor' | 'parent' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!userType) {
      Alert.alert('Error', 'Please select if you are a Tutor or a Parent');
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        userType,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            activeOutlineColor={COLORS.accent}
            textColor={COLORS.inputText}
            theme={{ colors: { background: COLORS.white } }}
          />

          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            activeOutlineColor={COLORS.accent}
            textColor={COLORS.inputText}
            theme={{ colors: { background: COLORS.white } }}
          />

          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                color={COLORS.textSecondary}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
            activeOutlineColor={COLORS.accent}
            textColor={COLORS.inputText}
            theme={{ colors: { background: COLORS.white } }}
          />

          <TextInput
            mode="outlined"
            label="Repeat Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                color={COLORS.textSecondary}
              />
            }
            style={styles.input}
            outlineStyle={styles.inputOutline}
            activeOutlineColor={COLORS.accent}
            textColor={COLORS.inputText}
            theme={{ colors: { background: COLORS.white } }}
          />

          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={userType === 'tutor' ? 'checked' : 'unchecked'}
                onPress={() => setUserType(userType === 'tutor' ? null : 'tutor')}
                color={COLORS.accent}
              />
              <Text style={styles.checkboxLabel}>I'm a Tutor</Text>
            </View>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={userType === 'parent' ? 'checked' : 'unchecked'}
                onPress={() => setUserType(userType === 'parent' ? null : 'parent')}
                color={COLORS.accent}
              />
              <Text style={styles.checkboxLabel}>I'm a Parent</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? 'Registering...' : 'Register'}</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>I have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  inputOutline: {
    borderRadius: 8,
    borderColor: COLORS.inputBorder,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.accent,
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
});

