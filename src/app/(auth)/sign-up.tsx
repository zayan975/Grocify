import { useSignUp } from '@clerk/expo'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'

export default function SignUpScreen() {
  const { signUp } = useSignUp()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress, password })
    if (error) {
      return
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode()
    if (sendError) {
      return
    }

    setIsVerifying(true)
  }

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code })
    if (error) {
      return
    }

    const { error: finalizeError } = await signUp.finalize()
    if (finalizeError) {
      // Handle the error in your app.
    }
  }

  if (isVerifying) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <Button title="Verify" onPress={handleVerify} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title="Sign up" onPress={handleSignUp} />
      <View nativeID="clerk-captcha" />
      <Link href="/(auth)/sign-in">
        <Text>Already have an account? Sign in</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
})