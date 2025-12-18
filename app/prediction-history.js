import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AppStateContext } from './../context/state';
import stylesShared, { colors } from './../constants/styles';
import { fetchPredictionHistory as fetchPredictionHistoryFromDB } from './../data/sqlite';
import PageTransition from './../components/PageTransition';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function PredictionHistory() {
  const { history } = useContext(AppStateContext);
  const router = useRouter();

  const [data, setData] = useState(history || []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await fetchPredictionHistoryFromDB();
        if (mounted && Array.isArray(rows) && rows.length > 0) {
          // Map DB rows to UI shape
          const mapped = rows.map(r => {
            // tension may be stored as a single number or string like '120/80'
            let systolic = r.tension || null;
            let diastolic = '';
            if (typeof r.tension === 'string' && r.tension.includes('/')) {
              const parts = r.tension.split('/'); systolic = parts[0]; diastolic = parts[1];
            }
            return {
              id: r.id,
              date: r.date,
              age: r.age,
              bmi: r.imc,
              systolic: systolic,
              diastolic: diastolic || '',
              riskPercentage: r.risk_score != null ? `${Math.round(r.risk_score)}%` : null,
              riskFactors: r.risk_factors ? JSON.parse(r.risk_factors) : [],
            };
          });
          setData(mapped);
          return;
        }
      } catch (e) {
        console.warn('fetchPredictionHistoryFromDB failed', e);
      }
      // fallback dummy data if DB empty
      const fallback = [
        { id: '1', date: '09/12/2025', bmi: 27.7, systolic: 135, diastolic: 80, age: 20, riskPercentage: '25%', riskFactors: [] },
        { id: '2', date: '09/12/2025', bmi: 88.9, systolic: 200, diastolic: 100, age: 30, riskPercentage: '90%', riskFactors: ['Diabète','Tabac'] },
        { id: '3', date: '09/12/2025', bmi: 31.1, systolic: 160, diastolic: 90, age: 20, riskPercentage: '60%', riskFactors: ['Tabac'] },
      ];
      setData(fallback);
    })();
    return () => { mounted = false; };
  }, []);

  const getRiskProps = (item) => {
    // accept both string riskLevel ('faible','modéré','élevé') or numeric percentage
    const level = (item.riskLevel || '').toString().toLowerCase();
    const pct = item.riskPercentage != null ? (typeof item.riskPercentage === 'string' ? parseInt(item.riskPercentage,10) : item.riskPercentage) : null;

    if (level.includes('élev') || level.includes('eleve') || (pct != null && pct >= 20)) return { color: colors.danger, label: 'Risque élevé' };
    if (level.includes('mod') || (pct != null && pct >= 5 && pct < 20)) return { color: colors.warn, label: 'Risque modéré' };
    return { color: colors.primary, label: 'Risque faible' };
  };

  const renderCard = (item, idx) => {
    const risk = getRiskProps(item);
    const percent = item.riskPercentage != null ? (typeof item.riskPercentage === 'string' ? item.riskPercentage : `${item.riskPercentage}%`) : 'N/A';
    const date = item.date || item.createdAt || '—';
    const factors = item.riskFactors || item.factors || [];

    return (
      <View key={idx} style={{
        backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16,boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
        elevation: 3,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#666', fontSize: 12 }}>{date}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 6, borderWidth: 1, borderColor: '#f3f3f3', marginRight: 8 }}>
                <Text style={{ color: risk.color, fontWeight: '700', fontSize: 12 }}>{risk.label}</Text>
              </View>
              <Text style={{ marginLeft: 4, color: '#999', fontSize: 12 }}>{/* optional trend icon */}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <View>
                <Text style={{ fontSize: 12, color: '#999' }}>IMC</Text>
                <Text style={{ fontWeight: '700', marginTop: 6 }}>{item.bmi ?? '—'}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#999' }}>Tension</Text>
                <Text style={{ fontWeight: '700', marginTop: 6 }}>{item.systolic}/{item.diastolic}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#999' }}>Âge</Text>
                <Text style={{ fontWeight: '700', marginTop: 6 }}>{item.age ? `${item.age} ans` : '—'}</Text>
              </View>
            </View>

            { (factors && factors.length>0) && (
              <View style={{ borderTopWidth: 1, borderTopColor: '#f3f3f3', marginTop: 12, paddingTop: 12 }}>
                <Text style={{ fontSize: 13, color: '#999', marginBottom: 8 }}>Facteurs de risque</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {factors.map((f, i) => (
                    <View key={i} style={{ backgroundColor: '#fff0f0', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8, marginBottom: 8, borderWidth:1, borderColor:'#fee' }}>
                      <Text style={{ color: colors.danger, fontSize: 13 }}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Percentage bubble */}
          <View style={{ marginLeft: 12, alignItems: 'center' }}>
            <View style={{ backgroundColor: risk.color+'20', padding: 10, borderRadius: 12, minWidth: 64, alignItems: 'center' }}>
              <Text style={{ color: risk.color, fontWeight: '700', fontSize: 16 }}>{percent}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <PageTransition>
      <View style={stylesShared.container}>
        {/* Header gradient */}
        <LinearGradient colors={[colors.primary, colors.accent]} start={{x:0,y:0}} end={{x:1,y:0}} style={{ paddingVertical: 18, paddingHorizontal: 18, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>router.back()} style={{ padding: 6 }}>
              <MaterialIcons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>
            <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '700' }}>Historique</Text>
            <View style={{ width: 28 }} />
          </View>
        </LinearGradient>

        <FlatList
          contentContainerStyle={[stylesShared.pagePadding, { paddingTop: 18 }]}
          data={data || []}
          keyExtractor={(i,idx)=> (i.id ? i.id.toString() : idx.toString())}
          renderItem={({item, index})=> renderCard(item, index)}
          ListEmptyComponent={<Text style={{color:'#666', marginTop:12}}>Aucun historique pour l&apos;instant.</Text>}
        />
      </View>
    </PageTransition>
  );
}

