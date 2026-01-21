import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { REGIONI_DATA, getProvince, getGruppi } from '../data/regioni-data';

type RegisterScreenProps = {
  onRegister: () => void;
  onGoToLogin: () => void;
};

export default function RegisterScreen({ onRegister, onGoToLogin }: RegisterScreenProps) {
  const [codiceCensimento, setCodiceCensimento] = useState('');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [dataNascita, setDataNascita] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Nuovi stati per Regione, Provincia, Gruppo
  const [regioneId, setRegioneId] = useState('');
  const [provinciaId, setProvinciaId] = useState('');
  const [gruppoId, setGruppoId] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Recupera le liste in base alle selezioni
  const province = regioneId ? getProvince(regioneId) : [];
  const gruppi = regioneId && provinciaId ? getGruppi(regioneId, provinciaId) : [];

  // Formattazione automatica della data
  const handleDateChange = (text: string) => {
    // Rimuovi tutto tranne i numeri
    const numbers = text.replace(/[^\d]/g, '');
    
    let formatted = '';
    
    if (numbers.length > 0) {
      // Primi 2 caratteri (giorno)
      formatted = numbers.substring(0, 2);
      
      if (numbers.length >= 3) {
        // Aggiungi / dopo il giorno
        formatted += '/' + numbers.substring(2, 4);
      }
      
      if (numbers.length >= 5) {
        // Aggiungi / dopo il mese
        formatted += '/' + numbers.substring(4, 8);
      }
    }
    
    setDataNascita(formatted);
  };

  // Quando cambia la regione, resetta provincia e gruppo
  const handleRegioneChange = (value: string) => {
    setRegioneId(value);
    setProvinciaId('');
    setGruppoId('');
  };

  // Quando cambia la provincia, resetta il gruppo
  const handleProvinciaChange = (value: string) => {
    setProvinciaId(value);
    setGruppoId('');
  };

  // Validazione password
  const validatePassword = (pwd: string): { isValid: boolean; message: string } => {
    if (pwd.length < 8) {
      return { 
        isValid: false, 
        message: 'La password deve contenere almeno 8 caratteri' 
      };
    }
    
    if (!/[A-Z]/.test(pwd)) {
      return { 
        isValid: false, 
        message: 'La password deve contenere almeno una lettera maiuscola' 
      };
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return { 
        isValid: false, 
        message: 'La password deve contenere almeno un carattere speciale' 
      };
    }
    
    return { isValid: true, message: '' };
  };

  // Validazione data di nascita (formato DD/MM/YYYY)
  const validateDate = (date: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(date)) return false;
    
    const [, day, month, year] = date.match(regex) || [];
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1900 || y > new Date().getFullYear()) return false;
    
    return true;
  };

  const handleRegister = async () => {
    // Validazione campi obbligatori
    if (!codiceCensimento || !nome || !cognome || !dataNascita || !password || !confirmPassword) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    // Validazione selezione regione, provincia, gruppo
    if (!regioneId || !provinciaId || !gruppoId) {
      setError('Seleziona Regione, Provincia e Gruppo');
      return;
    }

    // Validazione data di nascita
    if (!validateDate(dataNascita)) {
      setError('Formato data non valido. Usa DD/MM/YYYY');
      return;
    }

    // Validazione password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    // Controllo password coincidenti
    if (password !== confirmPassword) {
      setError('Le password non coincidono');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implementare chiamata API al backend
      const registrationData = {
        codiceCensimento,
        nome,
        cognome,
        dataNascita,
        regioneId,
        provinciaId,
        gruppoId,
        password
      };
      
      console.log('Dati registrazione:', registrationData);

      // Simulazione registrazione
      setTimeout(() => {
        setIsLoading(false);
        console.log('Registrazione completata con successo!');
        onRegister();
      }, 1000);

    } catch (err) {
      setIsLoading(false);
      setError('Errore durante la registrazione. Riprova.');
      console.error('Register error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Registrazione</Text>
            <Text style={styles.subtitle}>Crea il tuo account In Cammino</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Codice Censimento</Text>
              <TextInput
                style={styles.input}
                placeholder="Il tuo codice censimento"
                placeholderTextColor="#999"
                value={codiceCensimento}
                onChangeText={setCodiceCensimento}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Il tuo nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cognome</Text>
              <TextInput
                style={styles.input}
                placeholder="Il tuo cognome"
                placeholderTextColor="#999"
                value={cognome}
                onChangeText={setCognome}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Data di Nascita</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
                value={dataNascita}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                maxLength={10}
                editable={!isLoading}
              />
            </View>

            {/* Selezione Regione */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Regione</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={regioneId}
                  onValueChange={handleRegioneChange}
                  enabled={!isLoading}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleziona una regione" value="" />
                  {REGIONI_DATA.map((regione) => (
                    <Picker.Item 
                      key={regione.id} 
                      label={regione.nome} 
                      value={regione.id} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Selezione Provincia */}
            {regioneId ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Provincia</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={provinciaId}
                    onValueChange={handleProvinciaChange}
                    enabled={!isLoading && province.length > 0}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleziona una provincia" value="" />
                    {province.map((provincia) => (
                      <Picker.Item 
                        key={provincia.id} 
                        label={provincia.nome} 
                        value={provincia.id} 
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            ) : null}

            {/* Selezione Gruppo */}
            {provinciaId ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Gruppo Scout</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={gruppoId}
                    onValueChange={setGruppoId}
                    enabled={!isLoading && gruppi.length > 0}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleziona un gruppo" value="" />
                    {gruppi.map((gruppo) => (
                      <Picker.Item 
                        key={gruppo.id} 
                        label={gruppo.nome} 
                        value={gruppo.id} 
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Almeno 8 caratteri"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
              <Text style={styles.passwordHint}>
                Min 8 caratteri, 1 maiuscola, 1 carattere speciale
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Conferma Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Ripeti la password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Registrati</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Hai già un account? </Text>
              <TouchableOpacity onPress={onGoToLogin} disabled={isLoading}>
                <Text style={styles.loginLink}>Accedi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8dcc4',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#2c3e50',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#2c3e50',
  },
  passwordHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  errorText: {
    color: '#c0392b',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#2d5016',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerButtonDisabled: {
    backgroundColor: '#95a5a6',
    elevation: 0,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
    fontSize: 15,
  },
  loginLink: {
    color: '#2d5016',
    fontSize: 15,
    fontWeight: '600',
  },
});