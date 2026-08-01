import { useSignIn } from '@clerk/expo'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Link } from 'expo-router'

export default function SignInScreen() {
  const { signIn, setActive } = useSignIn()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    if (!signIn) return

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
      } else {
        console.log(JSON.stringify(result, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
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
      <Button title="Sign in" onPress={handleSignIn} />
      <Link href="/(auth)/sign-up">
        <Text>Don't have an account? Sign up</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
})