import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainMenuScreenProps = {
  onLogout: () => void;
};

export default function MainMenuScreen({ onLogout }: MainMenuScreenProps) {
  const [activeMenuId, setActiveMenuId] = useState(1); // Menu Principale è attivo all'inizio

  const menuItems = [
    { id: 1, title: 'Menu Principale' },
    { id: 2, title: 'Calendario' },
    { id: 3, title: 'Il Mio Punto' },
    { id: 4, title: 'Logout', isLogout: true },
  ];

  const handleMenuPress = (item: any) => {
    if (item.isLogout) {
      console.log('Logout premuto');
      onLogout();
    } else {
      console.log(`Navigazione a: ${item.title}`);
      setActiveMenuId(item.id); // Cambia il pulsante attivo
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#e8dcc4" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>In Cammino</Text>
          <Text style={styles.subtitle}>Gestione attività Scout</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuButton,
                activeMenuId === item.id ? styles.menuButtonActive : styles.menuButtonInactive
              ]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.menuButtonText,
                  activeMenuId === item.id ? styles.menuButtonTextActive : styles.menuButtonTextInactive
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Rover/Scolte - Gestione Comunità
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8dcc4',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5a5a5a',
    fontStyle: 'italic',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  menuButton: {
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButtonActive: {
    backgroundColor: '#2d5016',
    borderColor: '#2d5016',
  },
  menuButtonInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#2d5016',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  menuButtonTextActive: {
    color: '#ffffff',
  },
  menuButtonTextInactive: {
    color: '#2d5016',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});