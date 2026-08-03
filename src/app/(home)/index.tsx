import { useAuth } from '@clerk/expo'
import { View, Text, Button } from 'react-native'

export default function Home() {
  const { signOut } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className='text-white'>Home Screen</Text>
      <Button title="Sign Out (dev)" onPress={() => signOut()} />
    </View>
  )
}