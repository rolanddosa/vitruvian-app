import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const COLUMN_COUNT = 7;
const ROW_COUNT = 21;

function TableCell({ value, isHeader }: { value: string; isHeader: boolean }) {
  return (
    <ThemedView type="backgroundSelected" style={styles.cell}>
      <ThemedText type={isHeader ? 'smallBold' : 'small'} themeColor={isHeader ? 'textSecondary' : 'text'}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}

const DEFAULT_DATA = Array.from({ length: ROW_COUNT }, (_, row) =>
  Array.from({ length: COLUMN_COUNT }, (_, col) => (row === 0 ? `Col ${col + 1}` : `R${row}C${col + 1}`)),
);

export function WorkoutTable({ data = DEFAULT_DATA }: { data?: string[][] }) {
  return (
    <ThemedView type="backgroundElement" style={styles.table}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((value, colIndex) => (
            <TableCell key={colIndex} value={value} isHeader={rowIndex === 0} />
          ))}
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  table: {
    alignSelf: 'stretch',
    padding: Spacing.half,
    gap: Spacing.half,
    borderRadius: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.half,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
});
