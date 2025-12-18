import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import stylesShared from './../constants/styles';
import PageTransition from './../components/PageTransition';
import Gradient from './../components/Gradient';
import { useRouter } from 'expo-router';
import { AppStateContext } from './../context/state';

const getRiskColor = (level) => {
  if (level === 'faible') return '#2FAE78';
  if (level === 'modéré') return '#FBD45A';
  return '#EF4444';
};

const getRiskLabel = (level) => {
  if (level === 'faible') return 'Risque Faible';
  if (level === 'modéré') return 'Risque Modéré';
  return 'Risque Élevé';
};

const getRiskDescription = (level) => {
  if (level === 'faible') return 'Votre risque cardiovasculaire est faible. Continuez à adopter un mode de vie sain.';
  if (level === 'modéré') return 'Votre risque cardiovasculaire est modéré. Des changements sont recommandés.';
  return 'Votre risque cardiovasculaire est élevé. Consultez rapidement un médecin.';
};

const getRecommendations = (riskLevel) => {
  const baseRecommendations = [
    'Consultez un médecin pour un bilan cardiovasculaire complet',
    'Réduisez votre consommation de sel et d&apos;aliments gras',
    'Augmentez votre activité physique progressivement',
    'Surveillez régulièrement votre tension artérielle',
  ];

  if (riskLevel === 'faible') {
    return [
      ...baseRecommendations.slice(1),
      'Maintinez une alimentation équilibrée',
    ];
  }

  if (riskLevel === 'modéré') {
    return [
      ...baseRecommendations,
      'Si vous fumez, envisagez un sevrage tabagique',
    ];
  }

  return [
    'Consultez un médecin immédiatement',
    'Contrôlez régulièrement votre tension',
    'Suivez un régime alimentaire adapté',
    'Augmentez progressivement votre activité physique',
    'Si vous fumez, arrêtez immédiatement',
  ];
};

export default function PredictionResult() {
  const router = useRouter();
  const { predictionData } = useContext(AppStateContext);
  
  if (!predictionData) return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Aucun résultat</Text></View>
  );

  const color = getRiskColor(predictionData.riskLevel);
  const riskLabel = getRiskLabel(predictionData.riskLevel);
  const riskDescription = getRiskDescription(predictionData.riskLevel);
  const recommendations = getRecommendations(predictionData.riskLevel);

  // Use Framingham percentage or fallback to estimation
  const percentage = predictionData.riskPercentage 

  return (
    <PageTransition>
      <View style={stylesShared.container}>
        <Gradient style={styles.header}>
          <TouchableOpacity onPress={()=>router.replace('/(tabs)')} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Résultat de l&apos;évaluation</Text>
        </Gradient>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Risk Indicator Card */}
          <View style={styles.riskCard}>
            <View style={styles.circleContainer}>
              <View style={[styles.circleBg]}>
                <Animated.View style={[styles.circleProgress, { borderColor: color }]}>
                  <MaterialIcons name="warning" size={32} color={color} />
                  <Text style={[styles.percentage, { color }]}>{percentage}</Text>
                </Animated.View>
              </View>
            </View>

            <Text style={styles.riskLabel}>{riskLabel}</Text>
            <Text style={styles.riskDescription}>{riskDescription}</Text>
          </View>

          {/* Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>IMC</Text>
              <Text style={styles.metricValue}>{predictionData.bmi} kg/m²</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Tension</Text>
              <Text style={styles.metricValue}>{predictionData.systolic}/{predictionData.diastolic}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Score Framingham</Text>
              <Text style={styles.metricValue}>{predictionData.framinghamScore || 'N/A'} pts</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Âge</Text>
              <Text style={styles.metricValue}>{predictionData.age} ans</Text>
            </View>
          </View>

          {/* Recommendations Section */}
          <View style={styles.recommendationsSection}>
            <View style={styles.recommendationsHeader}>
              <MaterialIcons name="favorite" size={20} color="#FBD45A" />
              <Text style={styles.recommendationsTitle}>Recommandations OMS</Text>
            </View>
            <View style={styles.recommendationsList}>
              {recommendations.map((rec, idx) => (
                <View key={idx} style={styles.recommendationItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={[stylesShared.primaryBtn, styles.actionButton]} onPress={()=>router.push('/(tabs)/centers')}>
            <MaterialIcons name="location-on" size={20} color="#fff" />
            <Text style={[stylesShared.primaryBtnText, {marginLeft: 8}]}>Trouver un centre de santé</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={()=>router.push('/prediction-history')}>
            <MaterialIcons name="trending-up" size={20} color="#246EE9" />
            <Text style={[styles.secondaryButtonText, {marginLeft: 8}]}>Voir mon historique</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </PageTransition>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  riskCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
    elevation: 3,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  circleBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F0F8F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleProgress: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: '#FBD45A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251, 212, 90, 0.05)',
  },
  percentage: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  riskLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  riskDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#FAFAF6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recommendationsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FBD45A',
    marginTop: 6,
    flexShrink: 0,
  },
  recommendationText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#246EE9',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: '#246EE9',
    fontWeight: '600',
    fontSize: 16,
  },
});
