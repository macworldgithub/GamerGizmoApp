// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Modal,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { useRouter } from "expo-router";
// //import RegisterScreen from './RegisterScreen';
// import RegisterScreen from './create';



// const API_BASE = 'https://backend.gamergizmo.com/auth';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [region, setRegion] = useState('PK');
//   const [platform, setPlatform] = useState('mobile');
//   const [loading, setLoading] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [sessions, setSessions] = useState<any[]>([]);
//   const router = useRouter();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       alert('Please fill in both fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_BASE}/signin`, {
//         name: username,
//         password,
//         region,
//         platform,
//       });

//       if (response.status === 200 || response.status === 201) {
//         alert('Login successful!');
//         router.replace("/(tabs)/home");
//         // navigate or store token
//       }
//     } catch (error: any) {
//       const message = error?.response?.data?.message;
//       const sessions = error?.response?.data?.accounts || [];

//       if (message === 'You have reached max account logins') {
//         setSessions(sessions);
//         setModalVisible(true);
//       } else if (
//         message === 'User is not Verified, Email is sent to the registerd email'
//       ) {
//         alert(message);
//         navigation.navigate('OtpScreen', { email: username });
//       } else {
//         alert(message || 'Login failed');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogoutSession = async (session: any) => {
//     try {
//       // Retrieve the stored token
//       const token = await AsyncStorage.getItem('auth_token');

//       if (!token) {
//         alert('No token found');
//         return;
//       }

//       const response = await axios.post(`${API_BASE}/logoutOtherAccounts`, {
//         token: session.token,
//       });

//       if (response.status === 200 || response.status === 201) {
//         alert('Confirmation sent to registered email');
//         setModalVisible(false);
//       } else {
//         alert('Logout failed');
//       }
//     } catch (err) {
//       alert('Error logging out session');
//     }
//   };


//   const renderSession = ({ item }: { item: any }) => (
//     <View style={styles.sessionItem}>
//       <Text>{`${item.region}, ${item.platform}`}</Text>
//       <Text>{new Date(item.created_at).toLocaleString()}</Text>
//       <TouchableOpacity
//         onPress={() => handleLogoutSession(item)}
//         style={styles.logoutButton}
//       >
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login Your Account</Text>

//       <TextInput
//         placeholder="Email or Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         style={[styles.loginButton, loading && { opacity: 0.5 }]}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.loginText}>Log In</Text>
//         )}
//       </TouchableOpacity>




//       <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
//         <Text className="text-center text-fuchsia-500">
//           Don't have an account? Sign up
//         </Text>
//       </TouchableOpacity>

//       <Modal
//         visible={showRegisterModal}
//         onRequestClose={() => setShowRegisterModal(false)}
//         animationType="slide"
//         animationType="slide"
//       >
//         <RegisterScreen onClose={() => setShowRegisterModal(false)} />
//       </Modal>

//       {/* Max Login Modal */}
//       <Modal visible={modalVisible} transparent animationType="fade">
//         <View style={styles.modalBackdrop}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Max Account Login Reached</Text>
//             <Text style={styles.modalSubTitle}>
//               Following Accounts are currently logged in
//             </Text>
//             <FlatList
//               data={sessions}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={renderSession}
//             />
//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={styles.closeButton}
//             >
//               <Text style={styles.logoutText}>Close</Text>
//             </TouchableOpacity>
//             r
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 24,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1.2,
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//   },
//   loginButton: {
//     backgroundColor: '#DC39FC',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   loginText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   modalBackdrop: {
//     backgroundColor: '#00000099',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalSubTitle: {
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   sessionItem: {
//     marginBottom: 10,
//     paddingVertical: 10,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   logoutButton: {
//     backgroundColor: 'red',
//     padding: 8,
//     marginTop: 5,
//     borderRadius: 6,
//     alignSelf: 'flex-start',
//   },
//   logoutText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     marginTop: 15,
//     backgroundColor: '#555',
//     padding: 10,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
// });



import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { InitializeUserData } from "../../store/slice/loginSlice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./create";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
import MaxLimitModal from "./MaxLimitModal";
import { API_BASE_URL } from "@/utils/config";

type Props = {
  onClose: () => void;
};

const Login = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [maxLimitModalVisible, setMaxLimitModalVisible] = useState(false);
  const [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://backend.gamergizmo.com/auth/signin",
        {
          name: email,
          password,
          platform: "mobile",
          region: "PK",
        }
      );

      if (response.status === 200 || response.status === 201) {
        const user = response.data;

        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            name: user?.name || email,
            createdAt: user?.createdAt,
          })
        );

        await AsyncStorage.setItem("token", user?.token || "");
        await AsyncStorage.setItem("userId", String(user?.id));

        dispatch(InitializeUserData(user));
        alert("Login successful!");
        router.replace("/(tabs)/home");
      } else {
        alert(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const data = error.response?.data;
      console.log(data || error.message);

      if (
        data?.message === "You have reached max account logins" &&
        Array.isArray(data?.accounts)
      ) {
        setSessions(
          data.accounts.map((acc: any) => ({
            platform: acc.platform,
            timestamp: acc.created_at,
            location: acc.region || "Unknown",
            token: acc.token,
          }))
        );
        setMaxLimitModalVisible(true);
      } else {
        alert(data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

 

  const handleLogoutSession = async (index: number) => {
    const session = sessions[index];
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/logoutOtherAccounts`,
        //@ts-ignore
        { token: session.token }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Confirmation sent to registered email");
        const updatedSessions = [...sessions];
        updatedSessions.splice(index, 1);
        setSessions(updatedSessions);
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      alert("Error logging out session");
      console.error(err);
    }
  };


  return (
    <View className="flex-1 bg-white justify-center px-5">
      <TouchableOpacity onPress={onClose} className="absolute top-10 left-5">
        <Text className="text-2xl">✕</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-center mb-6">Login</Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Email or Username"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-fuchsia-500 rounded-lg py-3 mb-5 items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowForgotModal(true)} className="mb-4">
        <Text className="text-center text-blue-600 font-semibold">Forgot Password?</Text>
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
      >
        <RegisterScreen onClose={() => setShowRegisterModal(false)} />
      </Modal>

      <ForgotPasswordModal
        visible={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        onOTPSent={(email) => {
          setResetEmail(email);
          setShowForgotModal(false);
          setShowResetModal(true);
        }}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        visible={showResetModal}
        onClose={() => setShowResetModal(false)}
        email={resetEmail}
      />

      <MaxLimitModal
        visible={maxLimitModalVisible}
        onClose={() => setMaxLimitModalVisible(false)}
        sessions={sessions}
        handleLogoutSession={handleLogoutSession}
      />

    </View>
  );
};

export default Login;