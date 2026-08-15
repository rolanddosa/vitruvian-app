import { useState } from 'react';
import { Platform, Pressable, Share, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

function buildSelectedExport(
  selected: Set<string>,
  data: string[][],
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  for (const key of selected) {
    const [rowStr, colStr] = key.split(':');
    const row = Number(rowStr);
    const col = Number(colStr);

    if (row === 0 || col === 0) continue;

    const rowLabel = data[row][0];
    const colLabel = data[0][col];
    const value = data[row][col];

    result[rowLabel] ??= {};
    result[rowLabel][colLabel] = value;
  }

  return result;
}

function downloadJson(filename: string, payload: unknown) {
  const json = JSON.stringify(payload, null, 2);

  if (Platform.OS === 'web') {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  Share.share({ message: json, title: filename });
}

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

  const toggle = (row: number, col: number) => {
    if (row === 0 || col === 0) return;

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
  };

  const handleDownload = () => {
    const payload = buildSelectedExport(selected, data);
    if (Object.keys(payload).length === 0) return;
    downloadJson('spectrum-selections.json', payload);
  };

  return (
    <View style={styles.container}>
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

      {selected.size > 0 && (
        <Pressable
          onPress={handleDownload}
          style={({ pressed }) => [styles.downloadButton, pressed && styles.pressed]}
        >
          <ThemedView type="backgroundElement" style={styles.downloadButtonInner}>
            <ThemedText type="smallBold">Download selections</ThemedText>
          </ThemedView>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: Spacing.three,
  },
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
  downloadButton: {
    alignSelf: 'stretch',
  },
  downloadButtonInner: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
  },
});
