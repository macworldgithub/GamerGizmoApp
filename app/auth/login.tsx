import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
//import RegisterScreen from './RegisterScreen';
import RegisterScreen from './create';
 


const API_BASE = 'https://backend.gamergizmo.com/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('PK');
  const [platform, setPlatform] = useState('mobile');
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/signin`, {
        name: username,
        password,
        region,
        platform,
      });

      if (response.status === 200 || response.status === 201) {
        alert('Login successful!');
  router.replace("/(tabs)/home");
        // navigate or store token
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      const sessions = error?.response?.data?.accounts || [];

      if (message === 'You have reached max account logins') {
        setSessions(sessions);
        setModalVisible(true);
      } else if (
        message === 'User is not Verified, Email is sent to the registerd email'
      ) {
        alert(message);
        navigation.navigate('OtpScreen', { email: username });
      } else {
        alert(message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutSession = async (session: any) => {
    try {
      const response = await axios.post(`${API_BASE}/logoutOtherAccounts`, {
        token: session.token,
      });
      if (response.status === 200 || response.status === 201) {
        alert('Confirmation sent to registered email');
        setModalVisible(false);
      } else {
        alert('Logout failed');
      }
    } catch (err) {
      alert('Error logging out session');
    }
  };

  const renderSession = ({ item }: { item: any }) => (
    <View style={styles.sessionItem}>
      <Text>{`${item.region}, ${item.platform}`}</Text>
      <Text>{new Date(item.created_at).toLocaleString()}</Text>
      <TouchableOpacity
        onPress={() => handleLogoutSession(item)}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Your Account</Text>

      <TextInput
        placeholder="Email or Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.loginButton, loading && { opacity: 0.5 }]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Log In</Text>
        )}
      </TouchableOpacity>




        <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
        <Text className="text-center text-fuchsia-500">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showRegisterModal}
        onRequestClose={() => setShowRegisterModal(false)}
        animationType="slide"
        animationType="slide"
      >
        <RegisterScreen onClose={() => setShowRegisterModal(false)} />
      </Modal>
    
      {/* Max Login Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Max Account Login Reached</Text>
            <Text style={styles.modalSubTitle}>
              Following Accounts are currently logged in
            </Text>
            <FlatList
              data={sessions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSession}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.logoutText}>Close</Text>
            </TouchableOpacity>
r
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1.2,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#DC39FC',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    backgroundColor: '#00000099',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  sessionItem: {
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 8,
    marginTop: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
});
