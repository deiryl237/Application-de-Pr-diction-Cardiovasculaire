import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSession } from '../../context/authContext';

export default function TabLayout() {

  const { session } = useSession();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="articles"
        options={{
          title: 'Articles',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="article" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="centers"
        options={{
          title: 'Centres',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="location-on" size={size} color={color} />,
        }}
      />

    <Tabs.Protected guard={!!session}>
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        }}
      />
    </Tabs.Protected>
    </Tabs>
  );
}
