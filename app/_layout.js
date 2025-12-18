import { Stack } from 'expo-router';
import 'react-native-reanimated';

import {AppStateProvider} from './../context/state';
import { SessionProvider } from '../context/authContext';
import { SplashScreenController } from '../controller/splash';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
      <SessionProvider>
      <SplashScreenController/>
      <AppStateProvider>
          <Stack screenOptions={{headerShown : false}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="article-detail" options={{ title: 'details articles' }} />
          <Stack.Screen name="center-detail" options={{ title: 'détails centre' }} />
          <Stack.Screen name="prediction-form" options={{ title: 'Formulaire d\'évaluation' }} />
          <Stack.Screen name="prediction-result" options={{ title: 'Résultat de l\'évaluation' }} />
          <Stack.Screen name="prediction-history" options={{ title: 'Historique des évaluations' }} />
          <Stack.Screen name="settings" options={{ title: 'Paramètres' }} />
          <Stack.Screen name="auth" options={{ title: 'connexion/inscription' }} />
           <Stack.Screen name="onboarding" options={{ title: 'onboarding', headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </AppStateProvider>
      </SessionProvider> 
  );
}

