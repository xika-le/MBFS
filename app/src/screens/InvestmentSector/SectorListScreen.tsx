import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import * as theme from '../../theme';
import { Header, Card } from '../../components/shared';

export default function SectorListScreen({ navigation }: any) {
  const data = [
    { id: '1', title: 'Nông nghiệp công nghệ cao' },
    { id: '2', title: 'Chế biến thủy sản' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lĩnh vực đầu tư" onBack={() => navigation.goBack()} />
      <FlatList
        data={data}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SectorNews')}>
            <Card style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
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
  card: { padding: theme.spacing.md },
  title: { fontSize: theme.typography.fontSize.md, fontWeight: '600' },
});
