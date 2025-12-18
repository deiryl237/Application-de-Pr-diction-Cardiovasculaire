import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import stylesShared from './../constants/styles';
import PageTransition from './../components/PageTransition';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import {  FileText, MapPin, ChevronRight } from 'lucide-react-native';
import Gradient from '../components/Gradient';
const image = require('./../assets/images/illusn.png');

const slides = [
  {
    image: image,
    title: 'Protégez votre cœur',
    description: "Évaluez votre risque cardiovasculaire en quelques minutes avec notre outil intelligent basé sur les recommandations OMS.",
    color: '#2FAE78',
  },
  {
    icon : FileText,
    title: 'Informations fiables',
    description: "Accédez à des articles scientifiques vulgarisés sur les maladies cardiovasculaires adaptés à votre profil.",
    color: '#246EE9',
  },
  {
    icon : MapPin,
    title: 'Centres de santé à proximité',
    description: "Trouvez facilement les pharmacies et centres équipés pour le dépistage et le suivi cardiovasculaire.",
    color: '#FBD45A',
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else router.replace('/auth');
  };

  const skip = () => router.replace('/auth');

  const s = slides[index];

  return (
    <PageTransition>
     <Gradient colors={['#FFFFFF', '#E8EEF5']} style={[stylesShared.container, stylesShared.pagePadding]}>
        <TouchableOpacity onPress={skip} style={styles.skip}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={[styles.circle, { backgroundColor: s.color + '20' }]}>
            {s.image ? (
              <Image source={s.image} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            ) : (
              <s.icon size={80} color={s.color} />
            )}
          </View>
          <Text style={styles.title}>{s.title}</Text>
          <Text style={styles.desc}>{s.description}</Text>
        </View>

        <View style={{paddingBottom:32}}>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View key={i} style={[styles.dot, i === index ? styles.dotActive : null]} />
            ))}
          </View>
          <TouchableOpacity style={stylesShared.primaryBtn} onPress={next}>
            <Text style={stylesShared.primaryBtnText}>{index === slides.length - 1 ? 'Commencer' : 'Suivant'}</Text>
            <ChevronRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>
     </Gradient>
    </PageTransition>
  );
} 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF6', padding: 24 },
  skip: { position: 'absolute', right: 20, top: 40 },
  skipText: { color: '#666' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: {  marginBottom: 12, textAlign: 'center' , color: '#101828'},
  desc: { textAlign: 'center', color: '#4a5565', maxWidth: 320 },
  footer: { paddingBottom: 32 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#DDD', marginHorizontal: 6 },
  dotActive: { width: 32, backgroundColor: '#2FAE78' },
  nextBtn: { backgroundColor: '#2FAE78', padding: 14, borderRadius: 999, alignItems: 'center' },
  nextText: { color: '#fff', fontWeight: '600' },
});
