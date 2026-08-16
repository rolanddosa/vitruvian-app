import * as Device from 'expo-device';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
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
    ['Occlusal GPT', 'No Bias', 'Ideally Left Bias', 'Left but possibly Right Bias', 'Right but possibly Left Bias', 'Ideally Right Bias', 'No Bias'],
    ['Occipital-Atlanto GPT', 'Firm Bilaterally', 'Unlimited Right','Ø Motion B. Unl. Motion B. Ø Motion Right/Left', 'Ø Motion B. Unl. Motion B. Ø Motion Right/Left', 'Unlimited Left', 'Firm Bilaterally'],
    ['*Mid-Cerv. Rotation', 'No Limit', 'Limited Right', 'Limited Right and/or Left', 'Limited Left and/or Right', 'Limited Left', 'No Limit'],
    ['Mid-Cerv. Lateral Flex.', 'No Limit', 'Limited Left', 'Limited Left and/or Right', 'Limited Right and/or Left', 'Limited Right', 'No Limit'],
    ['*Shld. Horiz Abduction', 'No Limit', 'Limited Right', 'Limited Right (possibly Left)', 'Limited Left (possibly Right)', 'Limited Left', 'No Limit'],
    ['Shld. Internal Rotation', 'No Limit', 'Limited Left', 'Limited Left and Right', 'Limited Right and Left', 'Limited Right', 'No Limit'],
    ['Anterior Rib Angle', 'Even', 'Right Wider', 'Right Wider and/or Left Wider', 'Left Wider and/or Right Wider', 'Left Wider', 'Even'],
    ['Lower Cage Expansion', 'Even Compr/Expan', 'Right Expanded', 'Right Expanded or Both', 'Left Expanded or Both', 'Left Expanded', 'Even Compr/Expan'],
    ['Upper GPT', 'Non-Biased Power', 'Left Biased Power', 'Left (possibly Right) Biased Power or No Power', 'Right (possibly Left) Biased Power or No Power', 'Right Biased Power', 'Non-Biased Power'],
    ['*Lower Trunk Rotation', 'No Limit', 'Limited Knees Right', 'Limited Knees Right (possibly Left)', 'Limited Knees Left (possibly Right)', 'Limited Knees Left', 'No Limit'],
    ['Hip Adduction', 'No Limit', 'Limited Right', 'Limited Right (possibly Left)', 'Limited Left (possibly Right)', 'Limited Left', 'No Limit'],
    ['Hip Abduction', 'No Limit', 'Limited Left', 'Limited Left (possibly Right)', 'Limited Right (possibly Left)', 'Limited Right', 'No Limit'],
    ['Hip Internal Rotation', 'No Limit', 'Limited Right', 'Limited Right (possibly Left)', 'Limited Left (possibly Right)', 'Limited Left', 'No Limit'],
    ['Hip External Rotation', 'No Limit', 'Limited Left', 'Unlimited Right (possibly Left)', 'Unlimited Left (possibly Right)', 'Limited Right', 'No Limit'],
    ['Straight Leg Raise', 'Balanced', 'Limited Right', 'Limited Right (possibly Both)', 'Limited Left (possibly Both)', 'Limited Left', 'Balanced'],
    ['Foot & Ankle Pattern', 'Balanced Inversion', 'Left Inversion', 'Left (possibly Right) Inversion', 'Right (possibly Left) Inversion', 'Right Inversion', 'Balanced Inversion'],
    ['*Ankle Rotation', 'No Bias', 'Left Bias', 'Left (possibly Right) Bias', 'Right (possibly Left) Bias', 'Right Bias', 'No Bias'],
    ['Lower GPT', 'Non-Biased Power', 'Left Biased Power', 'Left (possibly Right) Biased Power or No Power', 'Right (possibly Left) Biased Power or No Power', 'Right Biased Power', 'Non-Biased Power']
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
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
