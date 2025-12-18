import React, { useContext, useState } from 'react';
import { View, Text,  TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppStateContext } from './../context/state';
import { Mail, Lock, User, } from 'lucide-react-native';
import { useSession } from '../context/authContext';
import FormInput from '../components/ui/FormInput';

export default function Auth() {
  const router = useRouter();
  // const { setUser } = useContext(AppStateContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { signIn } = useSession();

  // a modifier plutard pour gerer l'authentification reelle
  const submit = () => {
    if (!form.email || !form.password) return;
    // setUser({ name: form.name || 'Utilisateur', email: form.email });
    signIn({ nom: form.name || 'Utilisateur', email: form.email});
    router.replace('/(tabs)');
  };

  const isFormValid = form.email && form.password && (isLogin || form.name);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Gradient Header */}
      <LinearGradient colors={['#2FAE78', '#246EE9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="heart" size={40} color="#2FAE78" />
          </View>
          <Text style={styles.brandName}>CardioGuard</Text>
          <Text style={styles.brandSubtitle}>Votre santé cardiovasculaire à portée de main</Text>
        </View>
      </LinearGradient>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Toggle Connexion / Inscription */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setIsLogin(true)}
            style={[styles.toggleBtn, isLogin && styles.toggleBtnActive]}
          >
            <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogin(false)}
            style={[styles.toggleBtn, !isLogin && styles.toggleBtnActive]}
          >
            <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Inscription</Text>
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <View style={styles.inputsWrapper}>
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom complet</Text>
              <FormInput value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} placeholder={"Entrez votre nom"} Icon={User}/>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <FormInput value={form.email} onChangeText={(t) => setForm({ ...form, email: t  })} placeholder={"exemple@email.com"} Icon={Mail}/>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <FormInput value={form.password} onChangeText={(t) => setForm({ ...form, password: t  })} placeholder={"••••••••"} Icon={Lock}/>
          </View>

          {isLogin && (
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, ]}
            onPress={submit}
            disabled={!isFormValid}
          >
            <Text style={styles.submitBtnText}>{isLogin ? 'Se connecter' : "S'inscrire"}</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* Toggle Auth Mode */}
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleAuthMode}>
            <Text style={styles.toggleAuthModeText}>
              {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà inscrit ? Se connecter'}
            </Text>
          </TouchableOpacity>

          {/* Continue without account */}
          <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.continueWithoutAccount}>
            <Text style={styles.continueWithoutAccountText}>Continuer sans compte</Text>
          </TouchableOpacity>

          {!isLogin && (
            <Text style={styles.gdprNote}>
              En créant un compte, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité (RGPD).
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF6',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8EEF5',
    borderRadius: 999,
    padding: 4,
    marginBottom: 32,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#fff',
    boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
    elevation: 3,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  toggleTextActive: {
    color: '#333',
  },
  inputsWrapper: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#364153',
    marginBottom: 8,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#246EE9',
    fontSize: 12,
    fontWeight: '500',
    marginTop: -8,
    marginBottom: 24,
  },
  submitBtn: {
    backgroundColor: '#2FAE78',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  submitBtnDisabled: {
    backgroundColor: '#CCC',
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  toggleAuthMode: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleAuthModeText: {
    color: '#246EE9',
    fontSize: 13,
    fontWeight: '500',
  },
  continueWithoutAccount: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueWithoutAccountText: {
    color: '#666',
    fontSize: 13,
  },
  gdprNote: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
});
