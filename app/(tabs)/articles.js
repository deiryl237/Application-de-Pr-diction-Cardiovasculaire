import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AppStateContext } from '../../context/state';
import { fetchArticles as fetchArticlesFromDB } from '../../data/sqlite';


export default function Articles() {
  const router = useRouter();
  const { selectArticle } = useContext(AppStateContext);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  // Extract unique categories
  const CATEGORIES = ['Tous', ...new Set(articles.map(article => article.category))];


  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await fetchArticlesFromDB();
        if (mounted && Array.isArray(rows) && rows.length > 0) {
          // map DB fields to the article shape expected by the UI
          const mapped = rows.map(r => ({
            id: r.id?.toString?.() || String(Math.random()),
            title: r.title || r.name || 'Article',
            description: r.resume || r.description || r.content?.slice?.(0,120) || '',
            category: r.categories || 'Général',
            categoryColor: '#246EE9',
            categoryBgColor: '#EEF3FF',
            readTime: r.readTime || '5 min',
            date: r.published_at || r.date || r.createdAt || r.date_published || '—',
            recommended: false,
            raw: r,
          }));
          setArticles(mapped);
          return;
        }
      } catch (e) {
        // ignore DB errors and keep fallback
        console.warn('fetchArticlesFromDB failed', e);
      }
      // fallback to mock data if DB returned nothing
      setArticles([]);
    })();
    return () => { mounted = false; };
  }, []);

  const filteredArticles = articles.filter(article => {
    const categoryMatch = selectedCategory === 'Tous' || article.category === selectedCategory;
    const searchMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const open = (item) => {
    selectArticle(item);
    router.push('/article-detail');
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity 
      onPress={() => open(item)} 
      style={[
        styles.articleCard,
        item.recommended ? { borderWidth: 2, borderColor: '#246EE9' } : {}
      ]}
    >
      {item.recommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>Recommandé</Text>
        </View>
      )}
      
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      
      <View style={styles.articleFooter}>
        <View 
          style={[
            styles.categoryBadge, 
            { backgroundColor: item.categoryBgColor }
          ]}
        >
          <Text 
            style={[
              styles.categoryText, 
              { color: item.categoryColor }
            ]}
          >
            {item.category}
          </Text>
        </View>
        <Text style={styles.readTime}>{item.readTime}</Text>
        <Text style={styles.date}>{item.date}</Text>
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
          <Text style={styles.headerTitle}>Articles</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#fff" style={{ marginLeft: 12 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un article..."
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.filterBtn,
              selectedCategory === category && styles.filterBtnActive
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Articles List */}
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id}
        renderItem={renderArticle}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF6',
  },
  headerGradient: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 10px 15px -3px #0000001a , 0 4px 6px -4px #0000001a',
    elevation: 3,
  },
  recommendedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#246EE9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  readTime: {
    fontSize: 12,
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: '#CCC',
    marginLeft: 'auto',
  },
});

