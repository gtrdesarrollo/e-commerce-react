import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
import AuthScreen from './src/screens/Auth';
import jwtDecode from 'jwt-decode';
import AuthContext from './src/context/AuthContext';
import { setTokenApi, getTokenApi, removeTokenApi } from './src/api/token';


export default function App() {

  const [auth, setAuth] = useState(false);

  console.log("auth (App): " + auth);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(false);
      }
    })();
  }, []);

  const login = (user) => {
    console.log("User: " + user);

    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      id: user.user._id,
    });
  }

  const logout = () => {
    console.log('logout: ' + auth);

    if (auth) {
      removeTokenApi();
      setAuth(false);

    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (

    <AuthContext.Provider value={authData}>
      <PaperProvider>
        <View style={{ flex: 1, justifyContent: "center" }} >
          {auth ? (<AppNavigation />) : (<AuthScreen />)}
        </View>

      </PaperProvider >
    </AuthContext.Provider >

  );
}
