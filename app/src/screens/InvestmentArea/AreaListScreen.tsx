import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as theme from '../../theme';
import { Header, Card, Badge } from '../../components/shared';

export default function AreaListScreen({ navigation }: any) {
  const data = [
    { id: '1', title: 'An Giang', badge: 'Đang hoạt động' },
    { id: '2', title: 'Bình Dương', badge: 'Sẵn sàng' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Khu vực đầu tư" onBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AreaDetail')}>
            <Card style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Badge label={item.badge} variant="success" />
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  list: { padding: theme.spacing.lg, gap: theme.spacing.sm },
  card: { gap: theme.spacing.sm },
  title: { fontSize: theme.typography.fontSize.md, fontWeight: '600' },
});
