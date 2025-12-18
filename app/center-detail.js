import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import stylesShared, { colors } from './../constants/styles';
import PageTransition from './../components/PageTransition';
import { useRouter } from 'expo-router';
import { AppStateContext } from './../context/state';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CenterDetail() {
  const router = useRouter();
  // const { selectedCenter } = useContext(AppStateContext);
  const DUMMY_CENTER = {
    id: 'dummy-1',
    name: 'Pharmacie du Plateau',
    address: "Boulevard de la Liberté",
    phone: '+237 6XX XX XX XX',
    hours: 'Lun-Dim 7h-21h',
    equipments: ['Tensiomètre', 'Glycémie'],
    latitude: 4.048, // example
    longitude: 9.709, // example
    image: require('./../assets/images/illusn.png'),
  };

  const  selectedCenter = DUMMY_CENTER;

  return (
    <PageTransition>
      <View style={stylesShared.container}>
        {/* Header gradient */}
        <LinearGradient colors={[colors.primary, colors.accent]} start={{x:0,y:0}} end={{x:1,y:1}} style={{ paddingVertical: 18, paddingHorizontal: 18, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>router.back()} style={{ padding: 6 }}>
              <MaterialIcons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>
            <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>{'Centre'}</Text>
            <TouchableOpacity onPress={() => {}} style={{ padding: 6 }}>
              <MaterialIcons name="share" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={stylesShared.pagePadding} showsVerticalScrollIndicator={false}>
          {/* Title */}
          <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>{selectedCenter.name}</Text>

          {/* Info card */}
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 12, shadowColor: '#000', shadowOffset: { width:0, height:4 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialCommunityIcons name="map-marker-radius" size={20} color={colors.primary} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 14, color: '#666' }}>Adresse</Text>
            </View>
            <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 12 }}>{selectedCenter.address}</Text>

            <View style={{ height: 1, backgroundColor: '#f3f3f3', marginVertical: 8 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialIcons name="access-time" size={18} color='#246EE9' style={{ marginRight: 10 }} />
              <View>
                <Text style={{ fontSize: 14, color: '#666' }}>Horaires</Text>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>{selectedCenter.hours || 'Lun-Dim 7h-21h'}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="phone" size={18} color='#2FAE78' style={{ marginRight: 10 }} />
              <View>
                <Text style={{ fontSize: 14, color: '#666' }}>Téléphone</Text>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>{selectedCenter.phone || '+237 6XX XX XX XX'}</Text>
              </View>
            </View>
          </View>

          {/* Equipment card */}
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 16, shadowColor: '#000', shadowOffset: { width:0, height:4 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Équipements disponibles</Text>
            { (selectedCenter.equipments && selectedCenter.equipments.length>0) ? (
              selectedCenter.equipments.map((eq, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ width: 28, height: 28, borderRadius: 20, backgroundColor: '#F0FFF6', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <MaterialIcons name="check" size={18} color={colors.primary} />
                  </View>
                  <Text style={{ fontSize: 14 }}>{eq}</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: '#666' }}>Aucun équipement listé</Text>
            )}
          </View>

          {/* Map placeholder */}
          <View style={{ backgroundColor: '#EEF6FB', borderRadius: 12, height: 140, alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
            <MaterialCommunityIcons name="map-marker" size={36} color={colors.primary} />
            <Text style={{ color: '#666', marginTop: 8 }}>Carte de localisation</Text>
          </View>

          {/* Action buttons */}
          <TouchableOpacity
            onPress={() => {
              const lat = selectedCenter.latitude; const lng = selectedCenter.longitude;
              if (lat && lng) {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                Linking.openURL(url);
              }
            }}
            style={{ backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 999, alignItems: 'center', marginTop: 16 }}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Obtenir l&apos;itinéraire</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (selectedCenter.phone) Linking.openURL(`tel:${selectedCenter.phone}`);
            }}
            style={{ borderWidth: 1, borderColor: '#E6EEF8', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 }}
          >
            <Text style={{ color: '#246EE9', fontSize: 15, fontWeight: '600' }}>Appeler</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </PageTransition>
  );
}
