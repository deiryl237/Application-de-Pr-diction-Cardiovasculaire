import React, {useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet, ScrollView, CheckBox } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import stylesShared from './../../constants/styles';
import PageTransition from './../../components/PageTransition';
import Gradient from './../../components/Gradient';
import FormInput from '../../components/ui/FormInput';
import { Calendar, Mail, Phone, Ruler, User, Weight } from 'lucide-react-native';
import { useSession } from '../../context/authContext';

export default function Profile() {
  const router = useRouter();
  // const { user, setUser } = useContext(AppStateContext);
  const {session , setSession} = useSession();
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState('personal');
  
  const [form, setForm] = useState({
    username: session?.nom || 'Utilisateur',
    email: session?.email || 'carol@mail.com',
    phone: session?.phone || '',
    birthdate: session?.dateNaissance || '',
    gender: session?.sexe || '',
    height: session?.taille || '',
    weight: session?.poids || '',
  });

  const [consents, setConsents] = useState({
    healthData: session?.stockage ?? true,
    notifications: session?.notification ?? false,
    suggestions: session?.suggestion ?? false,
  });

  const save = () => {
    setSession( JSON.stringify({
      nom: form.username,
      email: form.email,
      phone: form.phone,
      dateNaissance : form.birthdate,
      sexe : form.gender,
      taille : form.height,
      poids: form.weight,
      stockage: consents.healthData,
      notification: consents.notifications,
      suggestion: consents.suggestions,
    }));
    setIsEditMode(false);
  };

  const cancel = () => {
    setForm({
      username: session?.nom || 'Utilisateur',
    email: session?.email || 'carol@mail.com',
    phone: session?.phone || '',
    birthdate: session?.dateNaissance || '',
    gender: session?.sexe || '',
    height: session?.taille || '',
    weight: session?.poids || '',
    });
    setConsents({
    healthData: session?.stockage ?? true,
    notifications: session?.notification ?? false,
    suggestions: session?.suggestion ?? false,
    });
    setIsEditMode(false);
  };

  const toggleConsent = (key) => {
    setConsents({ ...consents, [key]: !consents[key] });
  };

  return (
    <PageTransition>
      <View style={stylesShared.container}>
        <Gradient style={styles.headerGradient}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity onPress={() => setIsEditMode(!isEditMode)} style={styles.editButton}>
            <MaterialIcons name={isEditMode ? 'close' : 'edit'} size={24} color="#fff" />
          </TouchableOpacity>
        </Gradient>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={48} color="#2FAE78" />
          </View>
          <Text style={styles.userName}>{form.username}</Text>
          <Text style={styles.userEmail}>{form.email}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Personal Information Section */}
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => setExpandedSection(expandedSection === 'personal' ? null : 'personal')}
              style={styles.sectionHeader}
            >
              <View style={styles.sectionTitleContainer}>
                <MaterialIcons name="person-outline" size={20} color="#2FAE78" />
                <Text style={styles.sectionTitle}>Informations personnelles</Text>
              </View>
              <MaterialIcons
                name={expandedSection === 'personal' ? 'expand-less' : 'expand-more'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>

            {expandedSection === 'personal' && (
              <View style={styles.sectionContent}>
                {!isEditMode ? (
                  <>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Nom complet</Text>
                      <Text style={styles.infoValue}>{form.username}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Email</Text>
                      <Text style={styles.infoValue}>{form.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Téléphone</Text>
                      <Text style={styles.infoValue}>{form.phone || 'Non renseigné'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Date de naissance</Text>
                      <Text style={styles.infoValue}>{form.birthdate || 'Non renseigné'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Sexe</Text>
                      <Text style={styles.infoValue}>{form.gender || 'Non renseigné'}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Nom complet</Text>
                      <FormInput value={form.username} onChangeText={(v) => setForm({...form, username: v})} placeholder={"Utilisateur"} Icon={User}/>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Email</Text>
                      <FormInput value={form.email} onChangeText={(v) => setForm({...form, email: v})} placeholder={"email-address"} Icon={Mail} keyboardType="email@mail.com"/>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Téléphone</Text>
                      <FormInput value={form.phone} onChangeText={(v) => setForm({...form, phone: v})} placeholder={"+237 6XX XX XX XX"} Icon={Phone} keyboardType="phone-pad"/>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Date de naissance</Text>
                      <FormInput value={form.birthdate} onChangeText={(v) => setForm({...form, birthdate: v})} placeholder={"dd/mm/aaaa"} Icon={Calendar} />
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Sexe</Text>
                      <View style={styles.genderContainer}>
                        <TouchableOpacity
                          onPress={() => setForm({...form, gender: 'Homme'})}
                          style={[styles.genderButton, form.gender === 'Homme' && styles.genderButtonActive]}
                        >
                          <Text style={[styles.genderText, form.gender === 'Homme' && styles.genderTextActive]}>Homme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setForm({...form, gender: 'Femme'})}
                          style={[styles.genderButton, form.gender === 'Femme' && styles.genderButtonActive]}
                        >
                          <Text style={[styles.genderText, form.gender === 'Femme' && styles.genderTextActive]}>Femme</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>

          {/* Physical Characteristics Section */}
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => setExpandedSection(expandedSection === 'physical' ? null : 'physical')}
              style={styles.sectionHeader}
            >
              <View style={styles.sectionTitleContainer}>
                <MaterialIcons name="favorite-outline" size={20} color="#2FAE78" />
                <Text style={styles.sectionTitle}>Caractéristiques physiques</Text>
              </View>
              <MaterialIcons
                name={expandedSection === 'physical' ? 'expand-less' : 'expand-more'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>

            {expandedSection === 'physical' && (
              <View style={styles.sectionContent}>
                {!isEditMode ? (
                  <View style={styles.physicalRow}>
                    <View style={styles.physicalCol}>
                      <Text style={styles.physicalLabel}>Taille (cm)</Text>
                      <Text style={styles.physicalValue}>{form.height || 'Non renseigné'}</Text>
                    </View>
                    <View style={styles.physicalCol}>
                      <Text style={styles.physicalLabel}>Poids (kg)</Text>
                      <Text style={styles.physicalValue}>{form.weight || 'Non renseigné'}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.physicalRow}>
                    <View style={styles.physicalCol}>
                      <Text style={styles.formLabel}>Taille (cm)</Text>
                      <FormInput value={form.height} onChangeText={(v) => setForm({...form, height: v})} placeholder={"170"} Icon={Ruler} keyboardType="numeric"/>
                    </View>
                    <View style={styles.physicalCol}>
                      <Text style={styles.formLabel}>Poids (kg)</Text>
                      <FormInput value={form.weight} onChangeText={(v) => setForm({...form, weight: v})} placeholder={"70"} Icon={Weight} keyboardType="numeric"/>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Privacy & Consents Section */}
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => setExpandedSection(expandedSection === 'privacy' ? null : 'privacy')}
              style={styles.sectionHeader}
            >
              <View style={styles.sectionTitleContainer}>
                <MaterialIcons name="security" size={20} color="#2FAE78" />
                <Text style={styles.sectionTitle}>Confidentialité et consentements</Text>
              </View>
              <MaterialIcons
                name={expandedSection === 'privacy' ? 'expand-less' : 'expand-more'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>

            {expandedSection === 'privacy' && (
              <View style={styles.sectionContent}>
                <View style={styles.checkboxRow}>
                  <CheckBox
                    value={consents.healthData}
                    onValueChange={() => isEditMode && toggleConsent('healthData')}
                    disabled={!isEditMode}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>
                    J&apos;accepte que mes données de santé soient stockées localement sur mon appareil
                  </Text>
                </View>

                <View style={styles.checkboxRow}>
                  <CheckBox
                    value={consents.notifications}
                    onValueChange={() => isEditMode && toggleConsent('notifications')}
                    disabled={!isEditMode}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>
                    J&apos;accepte de recevoir des notifications de prévention santé
                  </Text>
                </View>

                <View style={styles.checkboxRow}>
                  <CheckBox
                    value={consents.suggestions}
                    onValueChange={() => isEditMode && toggleConsent('suggestions')}
                    disabled={!isEditMode}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>
                    J&apos;accepte de recevoir des suggestions d&apos;articles personnalisés
                  </Text>
                </View>

                <Text style={styles.gdprText}>
                  Conformément au RGPD, vos données personnelles sont protégées et ne sont jamais partagées avec des tiers. Vous pouvez demander leur suppression à tout moment.
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          {isEditMode && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[stylesShared.primaryBtn, {flex: 1}]}
                onPress={save}
              >
                <Text style={stylesShared.primaryBtnText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelBtn, {flex: 1}]}
                onPress={cancel}
              >
                <Text style={styles.cancelBtnText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </PageTransition>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    padding: 8,
  },
  editButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FAFAF6',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2FAE78',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAF6',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sectionContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  infoRow: {
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    outlineWidth: 0 
  },
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  formInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#333',
  },
  dateInputContainer: {
    position: 'relative',
  },
  calendarIcon: {
    position: 'absolute',
    right: 14,
    top: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonActive: {
    borderColor: '#2FAE78',
    backgroundColor: '#EAF7EF',
  },
  genderText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#2FAE78',
    fontWeight: '600',
  },
  physicalRow: {
    flexDirection: 'row',
    gap: 16,
  },
  physicalCol: {
    flex: 1,
  },
  physicalLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  physicalValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  checkbox: {
    marginTop: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  gdprText: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  cancelBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2FAE78',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#2FAE78',
    fontWeight: '600',
    fontSize: 16,
  },
});
