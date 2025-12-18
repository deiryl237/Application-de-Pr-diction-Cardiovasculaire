import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import stylesShared from './../constants/styles';
import PageTransition from './../components/PageTransition';

export default function Settings() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [healthReminders, setHealthReminders] = useState(true);
  const [bpAlerts, setBpAlerts] = useState(true);
  const [articleSuggestions, setArticleSuggestions] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  return (
    <PageTransition>
      <View style={stylesShared.container}>
        {/* Header Gradient */}
        <LinearGradient
          colors={['#2FAE78', '#246EE9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: 'white' }}>
              Paramètres
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </LinearGradient>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
            {/* Notifications Section */}
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a', elevation: 3,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <MaterialIcons name="notifications" size={24} color="#2FAE78" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a' }}>Notifications</Text>
              </View>

              {/* Main notifications toggle */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>Activer les notifications</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Recevoir des rappels de santé</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#e0e0e0', true: '#a8e6c1' }}
                  thumbColor={notificationsEnabled ? '#2FAE78' : '#f0f0f0'}
                />
              </View>

              {/* Blood pressure alerts */}
              <View style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16, marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>Rappels de prise de tension</Text>
                    <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Tous les lundis à 9h00</Text>
                  </View>
                  <Switch
                    value={bpAlerts}
                    onValueChange={setBpAlerts}
                    trackColor={{ false: '#e0e0e0', true: '#a8e6c1' }}
                    thumbColor={bpAlerts ? '#2FAE78' : '#f0f0f0'}
                  />
                </View>
              </View>

              {/* Article suggestions */}
              <View style={{ borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>Suggestions d&apos;articles</Text>
                    <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Basées sur votre profil</Text>
                  </View>
                  <Switch
                    value={articleSuggestions}
                    onValueChange={setArticleSuggestions}
                    trackColor={{ false: '#e0e0e0', true: '#a8e6c1' }}
                    thumbColor={articleSuggestions ? '#2FAE78' : '#f0f0f0'}
                  />
                </View>
              </View>
            </View>

            {/* Appearance Section */}
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a', elevation: 3,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <MaterialCommunityIcons name="sun-moon" size={24} color="#FBD45A" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a' }}>Apparence</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>Mode sombre</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Réduire la fatigue oculaire</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#e0e0e0', true: '#a8e6c1' }}
                  thumbColor={darkMode ? '#2FAE78' : '#f0f0f0'}
                />
              </View>
            </View>

            {/* Language Section */}
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a', elevation: 3,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <MaterialCommunityIcons name="web" size={24} color="#246EE9" style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a' }}>Langue</Text>
              </View>

              <TouchableOpacity
                onPress={() => setSelectedLanguage('fr')}
                style={{
                  borderWidth: 1.5,
                  borderColor: selectedLanguage === 'fr' ? '#2FAE78' : '#e0e0e0',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: 12,
                  backgroundColor: selectedLanguage === 'fr' ? '#f0fdf8' : 'white',
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: selectedLanguage === 'fr' ? '600' : '500', color: selectedLanguage === 'fr' ? '#2FAE78' : '#1a1a1a' }}>
                  Français
                </Text>
              </TouchableOpacity>

              <Pressable
                onPress={() => setSelectedLanguage('en')}
                style={{
                  borderWidth: 1.5,
                  borderColor: selectedLanguage === 'en' ? '#2FAE78' : '#e0e0e0',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  marginBottom: 12,
                  backgroundColor: selectedLanguage === 'en' ? '#f0fdf8' : 'white',
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: selectedLanguage === 'en' ? '600' : '500', color: selectedLanguage === 'en' ? '#2FAE78' : '#1a1a1a' }}>
                  English
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedLanguage('ar')}
                style={{
                  borderWidth: 1.5,
                  borderColor: selectedLanguage === 'ar' ? '#2FAE78' : '#e0e0e0',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: selectedLanguage === 'ar' ? '#f0fdf8' : 'white',
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: selectedLanguage === 'ar' ? '600' : '500', color: selectedLanguage === 'ar' ? '#2FAE78' : '#1a1a1a' }}>
                  العربية
                </Text>
              </Pressable>
            </View>

            {/* Help & About Section */}
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              marginBottom: 16,
              paddingHorizontal: 16,
              paddingVertical: 16,
              boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a', elevation: 3,
            }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 16 }}>Aide & À propos</Text>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingVertical: 8 }}>
                <MaterialCommunityIcons name="help-circle-outline" size={24} color="#246EE9" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>Centre d&apos;aide</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>FAQ et tutoriels</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16 }}>
                <MaterialCommunityIcons name="shield-account-outline" size={24} color="#246EE9" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>Confidentialité & Données</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>Politique RGPD</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 16 }}>
                <MaterialCommunityIcons name="information-outline" size={24} color="#246EE9" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#1a1a1a' }}>À propos</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>Version 1.0.0</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
              </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#fff5f5',
                borderWidth: 1.5,
                borderColor: '#EF4444',
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="logout" size={20} color="#EF4444" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#EF4444' }}>Se déconnecter</Text>
              </View>
            </TouchableOpacity>

            {/* Footer */}
            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#1a1a1a' }}>CardioGuard v1.0.0</Text>
              <Text style={{ fontSize: 12, color: '#999', marginTop: 4, textAlign: 'center' }}>
                Développé pour la santé cardiovasculaire en Afrique
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </PageTransition>
  );
}

