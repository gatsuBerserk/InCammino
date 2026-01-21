import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = {
  onLogout: () => void;
  userName?: string;
};

export default function HomeScreen({ onLogout, userName = 'Carmine' }: HomeScreenProps) {
  const menuCards = [
    {
      id: 1,
      title: 'Calendario',
      description: 'Visualizza e conferma\nle attività',
      icon: '📅',
      color: '#f39c12',
      route: 'Calendar',
    },
    {
      id: 2,
      title: 'Il Mio Punto\ndella Strada',
      description: 'Dove sei nel tuo\npercorso',
      icon: '🎯',
      color: '#16a085',
      route: 'MyPoint',
    },
    {
      id: 3,
      title: 'La Mia Strada\nfino ad Ora',
      description: 'Rivivi il tuo cammino\nscout',
      icon: '🗺️',
      color: '#f1c40f',
      route: 'MyPath',
    },
  ];

  const handleCardPress = (route: string) => {
    console.log(`Navigazione a: ${route}`);
    // TODO: Implementare navigazione
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#2d5016" />
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Buon cammino,</Text>
        <Text style={styles.userName}>{userName}</Text>
        
        {/* Pulsante Logout nell'header */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Esci</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {menuCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => handleCardPress(card.route)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
              <Text style={styles.icon}>{card.icon}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8dcc4',
  },
  header: {
    backgroundColor: '#2d5016',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
  },
  userName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  logoutButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 32,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});