import { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import MainMenuScreen from './src/screens/MainMenuScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log('App: Login effettuato, mostro MainMenu');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('App: Logout effettuato, torno al Login');
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaProvider>
      {isLoggedIn ? (
        <MainMenuScreen onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
