import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const COLUMN_COUNT = 7;
const ROW_COUNT = 21;

function TableCell({ column, row }: { column: number; row: number }) {
  const isHeader = row === 0;
  return (
    <ThemedView type="backgroundSelected" style={styles.cell}>
      <ThemedText type={isHeader ? 'smallBold' : 'small'} themeColor={isHeader ? 'textSecondary' : 'text'}>
        {isHeader ? `Col ${column}` : `R${row}C${column}`}
      </ThemedText>
    </ThemedView>
  );
}

export function WorkoutTable() {
  return (
    <ThemedView type="backgroundElement" style={styles.table}>
      {Array.from({ length: ROW_COUNT }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: COLUMN_COUNT }, (_, col) => (
            <TableCell key={col} row={row} column={col + 1} />
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
