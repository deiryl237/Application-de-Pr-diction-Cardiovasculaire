import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppStateContext } from '../../context/state';

const MOCK_CENTERS = [
  {
    id: 'c1',
    name: 'Centre Médical Saint-Joseph',
    type: 'Centre de santé',
    typeBgColor: '#E8F5F0',
    typeColor: '#2FAE78',
    address: 'Avenue de la Paix, Quartier Akwa',
    hours: 'Lun-Sam 8h-18h',
    distance: '0.8 km',
    services: ['Tensiomètre', 'Glycémie', 'ECG', 'Dépistage MCV'],
  },
  {
    id: 'c2',
    name: 'Pharmacie du Plateau',
    type: 'Pharmacie',
    typeBgColor: '#EEF3FF',
    typeColor: '#246EE9',
    address: 'Boulevard de la Liberté',
    hours: 'Lun-Dim 7h-21h',
    distance: '1.2 km',
    services: ['Tensiomètre', 'Glycémie'],
  },
  {
    id: 'c3',
    name: 'Hôpital Général de Référence',
    type: 'Hôpital',
    typeBgColor: '#FFE8E8',
    typeColor: '#FF6B6B',
    address: 'Route de Bonabéri',
    hours: '24h/24 - 7j/7',
    distance: '2.5 km',
    services: ['Tensiomètre', 'Glycémie', 'ECG', 'Dépistage MCV'],
  },
  {
    id: 'c4',
    name: 'Clinique du Cœur',
    type: 'Centre de santé',
    typeBgColor: '#E8F5F0',
    typeColor: '#2FAE78',
    address: 'Avenue Foch, Centre-Ville',
    hours: 'Lun-Ven 8h-17h',
    distance: '1.5 km',
    services: ['ECG', 'Dépistage MCV'],
  },
];

// Extract unique services
const SERVICES = ['Tous', ...new Set(MOCK_CENTERS.flatMap(center => center.services))];

export default function Centers() {
  const router = useRouter();
  const { selectCenter } = useContext(AppStateContext);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedService, setSelectedService] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCenters = MOCK_CENTERS.filter(center => {
    const serviceMatch = selectedService === 'Tous' || center.services.includes(selectedService);
    const searchMatch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return serviceMatch && searchMatch;
  });

  const open = (item) => {
    selectCenter(item);
    router.push('/center-detail');
  };

  const renderCenter = ({ item }) => (
    <TouchableOpacity 
      onPress={() => open(item)} 
      style={styles.centerCard}
    >
      <View style={styles.centerHeader}>
        <View>
          <Text style={styles.centerName}>{item.name}</Text>
          <View style={[styles.typeBadge, { backgroundColor: item.typeBgColor }]}>
            <Text style={[styles.typeText, { color: item.typeColor }]}>
              {item.type}
            </Text>
          </View>
        </View>
        <Text style={styles.distance}>
          <MaterialIcons name="near-me" size={16} color="#2FAE78" /> {item.distance}
        </Text>
      </View>

      <View style={styles.centerInfo}>
        <MaterialIcons name="location-on" size={16} color="#666" />
        <Text style={styles.infoText}>{item.address}</Text>
      </View>

      <View style={styles.centerInfo}>
        <MaterialIcons name="schedule" size={16} color="#666" />
        <Text style={styles.infoText}>{item.hours}</Text>
      </View>

      <View style={styles.servicesContainer}>
        {item.services.map((service, idx) => (
          <View key={idx} style={styles.serviceBadge}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <LinearGradient
        colors={['#2FAE78', '#246EE9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Centres de santé</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#fff" style={{ marginLeft: 12 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un centre..."
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* View Mode Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setViewMode('map')}
            style={[styles.toggleBtn, viewMode === 'map' && styles.toggleBtnActive]}
          >
            <MaterialCommunityIcons 
              name="map" 
              size={18} 
              color={viewMode === 'map' ? '#2FAE78' : '#fff'} 
            />
            <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>
              Carte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode('list')}
            style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
          >
            <MaterialIcons 
              name="location-on" 
              size={18} 
              color={viewMode === 'list' ? '#2FAE78' : '#fff'} 
            />
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>
              Liste
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {SERVICES.map((service) => (
          <TouchableOpacity
            key={service}
            onPress={() => setSelectedService(service)}
            style={[
              styles.filterBtn,
              selectedService === service && styles.filterBtnActive
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedService === service && styles.filterTextActive
              ]}
            >
              {service}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* View Content */}
      {viewMode === 'list' ? (
        <FlatList
          data={filteredCenters}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderCenter}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Carte interactive</Text>
            <Text style={styles.mapSubText}>{filteredCenters.length} centres à proximité</Text>
            {filteredCenters.map((center) => (
              <TouchableOpacity 
                key={center.id}
                style={styles.mapPin}
                onPress={() => open(center)}
              >
                <MaterialIcons name="location-on" size={32} color="#2FAE78" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF6',
  },
  headerGradient: {
    display : 'flex',
    flexDirection: 'column',
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    gap: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#101828',
    fontSize: 14,
    outlineWidth: 0
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50 ,
    padding: 4 ,
    gap: 8,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  toggleTextActive: {
    color: '#2FAE78',
  },
   filterScroll: {
    backgroundColor: '#FAFAF6',
    minHeight : '10%' ,
    maxHeight: '10%',
    paddingVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    height: 40 ,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterBtnActive: {
    backgroundColor: '#2FAE78',
    borderColor: '#2FAE78',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  centerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
    elevation: 3,
  },
  centerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  centerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2FAE78',
  },
  centerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  serviceBadge: {
    backgroundColor: '#EEF3FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#246EE9',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#EEF3FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  mapSubText: {
    fontSize: 13,
    color: '#CCC',
    marginBottom: 20,
  },
  mapPin: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2FAE78',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
