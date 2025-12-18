import { createContext, useContext } from 'react';

import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext({
  signIn: (value = {nom: null , email: null , phone : null , dateNaissance : null , sexe : null , taille : null , poids : null , stockage : true , notification : false , suggestion : false}) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  setSession: () => null,
});

// Use this hook to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (value) => {
          // Perform sign-in logic here
          setSession(JSON.stringify(value));
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        setSession
      }}>
      {children}
    </AuthContext.Provider>
  );
}
