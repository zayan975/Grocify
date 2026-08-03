import { AuthView } from '@clerk/expo/native'
import { useSocialAuth} from '@/src/app/hooks/useSocialAuth'

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  return <AuthView mode="signIn" />
}