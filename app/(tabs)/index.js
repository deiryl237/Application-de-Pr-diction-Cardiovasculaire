import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import { Heart, FileText, MapPin, User, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppStateContext } from '../../context/state';
import PageTransition from './../../components/PageTransition';
import { useSession } from '../../context/authContext';

export default function Dashboard() {
  const router = useRouter();
  // const { user } = useContext(AppStateContext);
  const {session} = useSession();

  return (
    <PageTransition>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Gradient Header */}
      <LinearGradient 
        colors={['#2FAE78', '#246EE9']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.hello}>Bonjour,</Text>
            <Text style={styles.name}>{session?.nom || 'Utilisateur'}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/settings')}>
              <Settings size={24} color={'#fff'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/profile')}>
              <User size={24} color={'#fff'}/>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Action Cards - Two columns */}
        <View style={styles.cardsGrid}>
          <TouchableOpacity 
            style={[styles.card, styles.cardSmall]} 
            onPress={() => router.push('/prediction-form')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5F0' }]}>
              <Heart size={32} color={'#2FAE78'} />
            </View>
            <Text style={styles.cardTitle}>Évaluation</Text>
            <Text style={styles.cardSubtitle}>Nouveau test</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.cardSmall]} 
            onPress={() => router.push('/articles')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#EEF3FF' }]}>
              <FileText size={32} color={'#246EE9'}/>
            </View>
            <Text style={styles.cardTitle}>Articles</Text>
            <Text style={styles.cardSubtitle}>Informations</Text>
          </TouchableOpacity>
        </View>

        {/* Centers Card */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => router.push('/centers')}
        >
          <View style={styles.centerCardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#fbd45a1a' }]}>
              <MapPin size={28} color={'#FBD45A'}/>
            </View>
            <View>
              <Text style={styles.cardTitle}>Centres de santé</Text>
              <Text style={styles.cardSubtitle}>Trouver un centre à proximité</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Map Container */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <MapPin size={48} color={'#99a1af'}/>
          </View>
          <View style={styles.nearbyBadge}>
            <Text style={styles.nearbyText}>12 centres à proximité</Text>
          </View>
        </View>

        {/* Recommended Articles Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Articles recommandés</Text>
          <TouchableOpacity onPress={() => router.push('/articles')}>
            <Text style={styles.seeAllLink}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended Articles */}
        <TouchableOpacity 
          style={styles.articleCard}
          onPress={() => router.push('/articles')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EEF3FF' }]}>
            <MaterialIcons name="description" size={24} color="#246EE9" />
          </View>
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>L&apos;hypertension en milieu tropical</Text>
            <View style={styles.articleTags}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Hypertension</Text>
              </View>
              <Text style={styles.articleDuration}>5 min</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.articleCard}
          onPress={() => router.push('/articles')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EEF3FF' }]}>
            <MaterialIcons name="description" size={24} color="#246EE9" />
          </View>
          <View style={styles.articleContent}>
            <Text style={styles.articleTitle}>Prévention cardiovasculaire : les bons gestes</Text>
            <View style={styles.articleTags}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Prévention</Text>
              </View>
              <Text style={styles.articleDuration}>7 min</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </PageTransition>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF6',
  },
  headerGradient: {
    paddingTop: 48,
    paddingBottom: 96,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom : 32
  },
  hello: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 24,
    gap: 16,
    marginTop: -64 ,
    position : 'relative',
    marginBottom : 32 ,
    zIndex : 20
  },
  cardsGrid: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
    elevation: 3,
  },
  cardSmall: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'left',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6a7282',
    marginTop: 4,
    textAlign: 'left',
  },
  centerCardContent: {
    flexDirection: 'row',
    gap: 16 ,
    alignItems: 'center',
  },
  mapContainer: {
    backgroundColor: '#EEF3FF',
    borderRadius: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: ' 0 10px 15px -3px #0000001a , 4px 6px -4px #0000001a',
    elevation: 3,
  },
  mapPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyBadge: {
    position: 'absolute',
    top: 12,
    left: 12 ,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    boxShadow: '0 4px 6px -1px #0000001a ,2px 4px -2px #0000001a',
    elevation: 3,
  },
  nearbyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#246EE9',
    fontWeight: '600',
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
    elevation: 3,
  },
  articleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  articleTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    backgroundColor: '#EEF3FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#246EE9',
    fontWeight: '600',
  },
  articleDuration: {
    fontSize: 12,
    color: '#6a7282',
  },
});
