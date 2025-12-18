import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import stylesShared from './../constants/styles';
import PageTransition from './../components/PageTransition';
import { useRouter } from 'expo-router';
import { AppStateContext } from './../context/state';
import { getArticleById } from './../data/sqlite';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ArticleDetail() {
  const router = useRouter();
  const { selectedArticle } = useContext(AppStateContext);
  const [article, setArticle] = useState(selectedArticle || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (selectedArticle && selectedArticle.id) {
        setLoading(true);
        try {
          const row = await getArticleById(selectedArticle.id);
          if (mounted && row) setArticle(row);
        } catch (e) {
          console.warn('getArticleById failed', e);
          if (mounted) setArticle(selectedArticle);
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        setArticle(selectedArticle);
      }
    })();
    return () => { mounted = false; };
  }, [selectedArticle]);

  if (!article) return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Aucun article sélectionné</Text></View>
  );

  return (
    <PageTransition>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={stylesShared.container}>
        {/* Header image */}
        <View style={{ overflow: 'hidden', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <ImageBackground
            source={ selectedArticle.image ? { uri: selectedArticle.image } : require('./../assets/images/articleimage.jpg') }
            style={{ width: '100%', height: 240 }}
            resizeMode="cover"
          >
            <LinearGradient colors={[ 'rgba(0,0,0,0.25)', 'transparent' ]} style={{ flex: 1 }} />
            <View style={{ position: 'absolute', top: 16, left: 12, right: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ padding: 8 }}>
                  <MaterialCommunityIcons name="bookmark-outline" size={22} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 8 }}>
                  <MaterialIcons name="share" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={stylesShared.pagePadding}>
          {/* Meta card over image (small) */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 12,
            marginTop: -40,
            marginBottom: 12,
            boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#FEECEC', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginBottom: 6 }}>
                  <Text style={{ color: '#EF4444', fontSize: 12, fontWeight: '600' }}>{selectedArticle.tag || 'Hypertension'}</Text>
                </View>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{article.title}</Text>
                  <Text style={{ color: '#666', marginTop: 8 }}>{article.date || article.published_at || '15 Nov 2024'}</Text>
              </View>
            </View>
          </View>

          {/* Summary */}
          { (selectedArticle.summary || selectedArticle.excerpt) && (
            <View style={{
              backgroundColor: '#EEF6FB',
              borderRadius: 12,
              padding: 14,
              marginBottom: 16,
            }}>
              <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Résumé</Text>
              <Text style={{ color: '#334', lineHeight: 20 }}>{article.summary || article.excerpt || article.resume}</Text>
            </View>
          )}

          {/* Content */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            oxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a'
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Contenu détaillé</Text>
            <Text style={{ color: '#444', lineHeight: 20 }}>{article.content}</Text>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            onPress={() => article?.source || article?.url ? Linking.openURL(article.source || article.url) : null}
            disabled={!(article?.source || article?.url)}
            style={{
              backgroundColor: article?.source || article?.url ? '#246EE9' : '#cbd5e1',
              borderRadius: 999,
              paddingVertical: 14,
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Lire l&apos;article complet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PageTransition>
  );
}
