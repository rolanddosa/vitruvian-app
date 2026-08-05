import * as Device from 'expo-device';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { WorkoutTable } from '@/components/workout-table';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const tableData = [
    ['Pattern Description', '1. [Functional Left Occupancy]', '2. Intact Left Lateralized Pattern', '3. Non-Intact Left Lateralized Pattern', '4. Non-Intact Right Lateralized Pattern', '5. Intact Right Lateralized Pattern', '6. [Functional Right Occupancy]'],
    ['Cranial Strain', 'Mobile Right Sidebend', 'Likely Restricted Right Sidebend', 'Restricted Right Sidebend', 'Restricted Left Sidebend', 'Likely Restricted Left Sidebend', 'Mobile Left Sidebend'],
    ['Complex Cranial Strain', 'Mobile Left Torsion', 'Unlikely Left Torsion', 'Possible Left Torsion', 'Possible Right Torsion','Unlikely Right Torsion', 'Mobile Right Torsion'],
    ['Occlusal GPT', 'No Bias', 'Ideally Left Bias', 'Left but possibly Right Bias', 'Right but possibly Left Bias', 'Ideally Right Bias', 'No Bias']
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={styles.safeArea}>
          <WorkoutTable data={tableData} />
          {Platform.OS === 'web' && <WebBadge />}
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
});
