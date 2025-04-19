import { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';

import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

const RegisterScreen = () => {

  const { height } = useWindowDimensions();

  const { signUp } = useAuthStore();

  const backgroundColor = useThemeColor({}, 'background')

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const onLogin = async() => {

    const {fullName, email, password} = form;


    if(!fullName || !email || !password) return;

    await signUp(fullName, email, password)

    Alert.alert('Usuario creado correctamente');
  }


  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }}
    >

      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35
          }}
        >
          <ThemedText type='title'>Crear cuenta</ThemedText>
          <ThemedText
            style={{ color: 'grey' }}
          >
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>


        {/* Email y password */}

        <View style={{ marginTop: 20 }}>

          <ThemedTextInput
            placeholder='Nombre completo'
            autoCapitalize='words'
            icon='person-outline'
            value={form.fullName}
            onChangeText={(text) => setForm((form) => ({...form, fullName: text}))}
          />

          <ThemedTextInput
            placeholder='Correo electrónico'
            autoCapitalize='words'
            icon='mail-outline'
            value={form.email}
            onChangeText={(text) => setForm((form) => ({...form, email: text}))}
          />

          <ThemedTextInput
            placeholder='Contraseña'
            autoCapitalize='none'
            secureTextEntry
            icon='lock-closed-outline'
            value={form.password}
            onChangeText={(text) => setForm((form) => ({...form, password: text}))}
          />

        </View>

        <View style={{ marginTop: 10 }} />

        <ThemedButton
          icon='arrow-forward-outline'
          onPress={onLogin}
        >
          Crear cuenta
        </ThemedButton>

        <View style={{ marginTop: 50 }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ThemedText>¿Ya tienes cuenta?</ThemedText>

          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>Ingresar</ThemedLink>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;