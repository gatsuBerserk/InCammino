import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

type Screen = 'login' | 'register' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = () => {
    console.log('App: Login effettuato, mostro Home');
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    console.log('App: Registrazione completata, torno al Login');
    setCurrentScreen('login');
  };

  const handleGoToRegister = () => {
    console.log('App: Vai a Registrazione');
    setCurrentScreen('register');
  };

  const handleGoToLogin = () => {
    console.log('App: Torna al Login');
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    console.log('App: Logout effettuato, torno al Login');
    setCurrentScreen('login');
  };

  return (
    <SafeAreaProvider>
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
      )}
      {currentScreen === 'register' && (
        <RegisterScreen onRegister={handleRegister} onGoToLogin={handleGoToLogin} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen onLogout={handleLogout} />
      )}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}