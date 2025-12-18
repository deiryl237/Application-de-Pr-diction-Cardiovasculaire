import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { calculateFraminghamScore } from './../utils/framighamRiskCalculator';
import stylesShared from './../constants/styles';
import PageTransition from './../components/PageTransition';
import Gradient from './../components/Gradient';
import { useRouter } from 'expo-router';
import { AppStateContext } from './../context/state';

export default function PredictionForm() {
  const router = useRouter();
  const { addPrediction } = useContext(AppStateContext);
  const [step, setStep] = useState(1);
  const [focusedInput, setFocusedInput] = useState(null);
  const [form, setForm] = useState({
    age: '',
    gender: '',
    systolic: '',
    diastolic: '',
    height: '',
    weight: '',
    diabetes: '',
    smoking: '',
    activity: '',
    totalCholesterol: '',
    hdlCholesterol: '',
    bpTreated: false,
  });

  const calculateBMI = (weight, height) => {
    const h = parseFloat(height) / 100;
    if (!h || !weight) return '';
    return (parseFloat(weight) / (h*h)).toFixed(1);
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return form.age && form.gender;
      case 2: return form.systolic && form.diastolic && form.totalCholesterol && form.hdlCholesterol;
      case 3: return form.height && form.weight;
      case 4: return form.diabetes && form.smoking && form.activity;
      default: return false;
    }
  };

  const onNext = () => {
    if (step < 4) setStep(step+1);
    else {
      const framinghamResult = calculateFraminghamScore({
        age: form.age,
        gender: form.gender,
        totalCholesterol: form.totalCholesterol,
        hdlCholesterol: form.hdlCholesterol,
        systolic: form.systolic,
        isSmoker: form.smoking,
        bpTreated: form.bpTreated,
      });

      const bmi = calculateBMI(form.weight, form.height);
      const data = {
        ...form,
        bmi,
        age: parseInt(form.age),
        systolic: parseInt(form.systolic),
        framinghamScore: framinghamResult.totalPoints,
        riskPercentage: framinghamResult.riskPercentage,
        riskLevel: framinghamResult.riskLevel,
      };

      addPrediction(data);
      router.replace('/prediction-result');
    }
  };

  const onBack = () => { if (step > 1) setStep(step-1); else router.back(); };

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4].map((s) => (
        <View
          key={s}
          style={[
            styles.progressSegment,
            s <= step && styles.progressSegmentActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <PageTransition>
      <View style={stylesShared.container}>
        <Gradient style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingBottom: 20, paddingHorizontal: 20, paddingTop: 16 }}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Évaluation du risque</Text>
          <ProgressBar />
          <Text style={styles.stepCounter}>Étape {step} sur 4</Text>
        </Gradient>
        <ScrollView contentContainerStyle={[stylesShared.pagePadding, { paddingBottom: 40 }]}>

        {step === 1 && (
          <>
            <Text style={styles.label}>Quel est votre âge ?</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 50'
              placeholderTextColor='#999'
              value={form.age}
              onChangeText={(t)=>setForm({...form,age:t})}
              onFocus={() => setFocusedInput('age')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'age' && styles.inputFocused]}
            />

            <Text style={styles.label}>Sexe</Text>
            <View style={{flexDirection:'row', gap:12}}>
              <TouchableOpacity onPress={()=>setForm({...form,gender:'homme'})} style={[styles.choice, form.gender==='homme' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.gender==='homme' && styles.choiceTextActive]}>Homme</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setForm({...form,gender:'femme'})} style={[styles.choice, form.gender==='femme' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.gender==='femme' && styles.choiceTextActive]}>Femme</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Pression artérielle systolique (mmHg)</Text>
            <Text style={styles.subLabel}>La valeur la plus élevée</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 120'
              placeholderTextColor='#999'
              value={form.systolic}
              onChangeText={(t)=>setForm({...form,systolic:t})}
              onFocus={() => setFocusedInput('systolic')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'systolic' && styles.inputFocused]}
            />
            
            <Text style={styles.label}>Pression artérielle diastolique (mmHg)</Text>
            <Text style={styles.subLabel}>La valeur la plus faible</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 80'
              placeholderTextColor='#999'
              value={form.diastolic}
              onChangeText={(t)=>setForm({...form,diastolic:t})}
              onFocus={() => setFocusedInput('diastolic')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'diastolic' && styles.inputFocused]}
            />

            <Text style={styles.label}>Cholestérol total (mg/dL)</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 200'
              placeholderTextColor='#999'
              value={form.totalCholesterol}
              onChangeText={(t)=>setForm({...form,totalCholesterol:t})}
              onFocus={() => setFocusedInput('totalCholesterol')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'totalCholesterol' && styles.inputFocused]}
            />

            <Text style={styles.label}>Cholestérol HDL (mg/dL)</Text>
            <Text style={styles.subLabel}>Le bon cholestérol</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 50'
              placeholderTextColor='#999'
              value={form.hdlCholesterol}
              onChangeText={(t)=>setForm({...form,hdlCholesterol:t})}
              onFocus={() => setFocusedInput('hdlCholesterol')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'hdlCholesterol' && styles.inputFocused]}
            />

            <Text style={styles.label}>Tension traitée ?</Text>
            <View style={{flexDirection:'row', gap:12}}>
              <TouchableOpacity onPress={()=>setForm({...form,bpTreated:true})} style={[styles.choice, form.bpTreated && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.bpTreated && styles.choiceTextActive]}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setForm({...form,bpTreated:false})} style={[styles.choice, !form.bpTreated && styles.choiceActive]}>
                <Text style={[styles.choiceText, !form.bpTreated && styles.choiceTextActive]}>Non</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.label}>Taille (cm)</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 170'
              placeholderTextColor='#999'
              value={form.height}
              onChangeText={(t)=>setForm({...form,height:t})}
              onFocus={() => setFocusedInput('height')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'height' && styles.inputFocused]}
            />
            
            <Text style={styles.label}>Poids (kg)</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Ex: 70'
              placeholderTextColor='#999'
              value={form.weight}
              onChangeText={(t)=>setForm({...form,weight:t})}
              onFocus={() => setFocusedInput('weight')}
              onBlur={() => setFocusedInput(null)}
              style={[styles.input, focusedInput === 'weight' && styles.inputFocused]}
            />
            
            {form.height && form.weight && (
              <View style={styles.imcBox}>
                <Text style={styles.imcLabel}>Votre IMC</Text>
                <Text style={styles.imcValue}>{calculateBMI(form.weight, form.height)} kg/m²</Text>
              </View>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.label}>Avez-vous du diabète ?</Text>
            <View style={{flexDirection:'row', gap:12}}>
              <TouchableOpacity onPress={()=>setForm({...form,diabetes:'oui'})} style={[styles.choice, form.diabetes==='oui' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.diabetes==='oui' && styles.choiceTextActive]}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setForm({...form,diabetes:'non'})} style={[styles.choice, form.diabetes==='non' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.diabetes==='non' && styles.choiceTextActive]}>Non</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.label}>Fumez-vous ?</Text>
            <View style={{flexDirection:'row', gap:12}}>
              <TouchableOpacity onPress={()=>setForm({...form,smoking:'oui'})} style={[styles.choice, form.smoking==='oui' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.smoking==='oui' && styles.choiceTextActive]}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setForm({...form,smoking:'non'})} style={[styles.choice, form.smoking==='non' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.smoking==='non' && styles.choiceTextActive]}>Non</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.label}>Activité physique</Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', gap:12}}>
              <TouchableOpacity onPress={()=>setForm({...form,activity:'régulière'})} style={[styles.choice, {flex: 0, minWidth: '48%'}, form.activity==='régulière' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.activity==='régulière' && styles.choiceTextActive]}>Régulière</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setForm({...form,activity:'modérée'})} style={[styles.choice, {flex: 0, minWidth: '48%'}, form.activity==='modérée' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.activity==='modérée' && styles.choiceTextActive]}>Modérée</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setForm({...form,activity:'faible'})} style={[styles.choice, {flex: 0, minWidth: '48%'}, form.activity==='faible' && styles.choiceActive]}>
                <Text style={[styles.choiceText, form.activity==='faible' && styles.choiceTextActive]}>Faible</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={onNext}
          disabled={!isStepValid()}
          style={[stylesShared.primaryBtn, {marginTop:32}, !isStepValid() && styles.buttonDisabled]}
        >
          <Text style={stylesShared.primaryBtnText}>
            {step===4 ? 'Calculer mon risque' : 'Suivant'}
          </Text>
          {step < 4 && <MaterialIcons name="arrow-forward" size={20} color="#fff" style={{marginLeft: 8}} />}
        </TouchableOpacity>
      </ScrollView>
    </View>
  </PageTransition>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressSegmentActive: {
    backgroundColor: '#fff',
  },
  stepCounter: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    marginTop: 18,
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  subLabel: {
    marginBottom: 8,
    color: '#999',
    fontSize: 13,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    fontSize: 16,
    color: '#333',
    minHeight: 48,
    outlineWidth: 0
  },
  inputFocused: {
    borderColor: '#2FAE78',
    backgroundColor: '#F5FDFB',
  },
  choice: {
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  choiceActive: {
    borderColor: '#2FAE78',
    backgroundColor: '#EAF7EF',
  },
  choiceText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  choiceTextActive: {
    color: '#2FAE78',
    fontWeight: '600',
  },
  imcBox: {
    backgroundColor: '#E8EEF5',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  imcLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  imcValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#246EE9',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
