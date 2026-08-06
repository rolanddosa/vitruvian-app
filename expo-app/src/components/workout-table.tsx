import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

const COLUMN_COUNT = 7;
const ROW_COUNT = 21;

function TableCell({
  value,
  isHeader,
  isSelected,
}: {
  value: string;
  isHeader: boolean;
  isSelected: boolean;
}) {
  return (
    <ThemedView type={isSelected ? 'backgroundPressed' : 'backgroundSelected'} style={styles.cell}>
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
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (row: number, col: number) =>
    setSelected((prev) => {
      const key = `${row}:${col}`;
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.table, { transform: [{ scale: 0.65 }] }]}
    >
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((value, colIndex) => {
            const isSelected = selected.has(`${rowIndex}:${colIndex}`);
            return (
              <Pressable
                key={colIndex}
                onPress={() => toggle(rowIndex, colIndex)}
                style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
              >
                <TableCell value={value} isHeader={rowIndex === 0} isSelected={isSelected} />
              </Pressable>
            );
          })}
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
  pressable: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
});
