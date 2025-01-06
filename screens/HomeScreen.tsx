import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { COLORS, FONTS } from '../constants/theme';
import { LineChart } from 'react-native-chart-kit';
import { ChevronDown, Search, TrendingUp } from 'lucide-react-native';


const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [10, 15, 8, 12, 20, 25],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Welcome</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#3e9392" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for jobs..."
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>All Subjects</Text>
          <ChevronDown size={20} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, styles.secondaryButton]}>
          <Text style={styles.filterButtonText2}>Nearby Jobs</Text>
          <ChevronDown size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionSubTitle}>Tutoring Job Trends</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <TrendingUp size={20} color={COLORS.accent} />
            <Text style={styles.statsLabel}>Active Jobs</Text>
          </View>
          <Text style={styles.statsValue}>25</Text>
          <Text style={styles.statsChange}>+5 Today</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <TrendingUp size={20} color={COLORS.accent} />
            <Text style={styles.statsLabel}>Applications</Text>
          </View>
          <Text style={styles.statsValue}>10</Text>
          <Text style={styles.statsChange}>+2 Today</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Job Postings Per Day</Text>
        <Text style={styles.chartSubtitle}>Last 6 Days</Text>
        <LineChart
          data={chartData}
          width={width - 80}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.background,
            backgroundGradientFrom: COLORS.background,
            backgroundGradientTo: COLORS.background,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(197, 245, 93, ${opacity})`,
            labelColor: () => COLORS.textSecondary,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: COLORS.accent,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
          </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  filterSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  filterButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  filterButtonText2: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  sectionTitle: {
    fontSize: 26,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionSubTitle: {
    fontSize: 22,
    fontFamily: FONTS.semiBold,
    color: COLORS.textBlack,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  statsCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 15,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statsLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  statsValue: {
    color: COLORS.textSecondary,
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  statsChange: {
    color: COLORS.accent,
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  chartCard: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    padding: 20,
  },
  chartTitle: {
    color: COLORS.accent,
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  chartSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontFamily: FONTS.regular,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

