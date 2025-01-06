import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { COLORS, FONTS } from '../constants/theme';
import { MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react-native';

const initialLayout = { width: Dimensions.get('window').width };

// Mock data for applied jobs
const appliedJobs = [
  { id: '1', title: 'Math Tutor', location: 'New York, NY', rate: '$25/hr', date: '2024-01-20' },
  { id: '2', title: 'Science Teacher', location: 'Los Angeles, CA', rate: '$30/hr', date: '2024-01-22' },
  { id: '3', title: 'English Tutor', location: 'Chicago, IL', rate: '$22/hr', date: '2024-01-25' },
];

// Mock data for appointments
const appointments = [
  { id: '1', title: 'Math Tutoring', location: 'Online', time: '2:00 PM - 3:00 PM', date: '2024-01-21' },
  { id: '2', title: 'Science Class', location: '123 School St, LA', time: '4:00 PM - 5:30 PM', date: '2024-01-23' },
];

const JobItem = ({ job }: { job: typeof appliedJobs[0] }) => (
  <TouchableOpacity style={styles.jobItem}>
    <View>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <View style={styles.jobDetails}>
        <MapPin size={16} color={COLORS.textSecondary} />
        <Text style={styles.jobDetailText}>{job.location}</Text>
      </View>
      <View style={styles.jobDetails}>
        <DollarSign size={16} color={COLORS.textSecondary} />
        <Text style={styles.jobDetailText}>{job.rate}</Text>
      </View>
    </View>
    <View style={styles.jobRight}>
      <Text style={styles.jobDate}>{job.date}</Text>
      <ChevronRight size={20} color={COLORS.accent} />
    </View>
  </TouchableOpacity>
);

const AppointmentItem = ({ appointment }: { appointment: typeof appointments[0] }) => (
  <TouchableOpacity style={styles.appointmentItem}>
    <View>
      <Text style={styles.appointmentTitle}>{appointment.title}</Text>
      <View style={styles.appointmentDetails}>
        <MapPin size={16} color={COLORS.textSecondary} />
        <Text style={styles.appointmentDetailText}>{appointment.location}</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Clock size={16} color={COLORS.textSecondary} />
        <Text style={styles.appointmentDetailText}>{appointment.time}</Text>
      </View>
    </View>
    <View style={styles.appointmentRight}>
      <Text style={styles.appointmentDate}>{appointment.date}</Text>
      <ChevronRight size={20} color={COLORS.accent} />
    </View>
  </TouchableOpacity>
);

// Request Tab Component
const RequestTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabTitle}>Applied Jobs</Text>
    {appliedJobs.length > 0 ? (
      <FlatList
        data={appliedJobs}
        renderItem={({ item }) => <JobItem job={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    ) : (
      <Text style={styles.emptyText}>You haven't applied to any jobs yet.</Text>
    )}
  </View>
);

// Appointment Tab Component
const AppointmentTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabTitle}>Upcoming Appointments</Text>
    {appointments.length > 0 ? (
      <FlatList
        data={appointments}
        renderItem={({ item }) => <AppointmentItem appointment={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    ) : (
      <Text style={styles.emptyText}>No job appointments scheduled.</Text>
    )}
  </View>
);

// Main Dashboard Screen
const DashboardScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'request', title: 'Applied Jobs' },
    { key: 'appointment', title: 'Appointments' },
  ]);

  const renderScene = SceneMap({
    request: RequestTab,
    appointment: AppointmentTab,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.accent }}
            style={{ backgroundColor: COLORS.background }}
            tabStyle={styles.tabLabel}
            activeColor={COLORS.accent}
            inactiveColor={COLORS.textSecondary}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    padding: 20,
    paddingTop: 60,
  },
  tabContent: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  tabTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.accent,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  jobItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
    marginBottom: 8,
  },
  jobDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobDetailText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  jobRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  jobDate: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.accent,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  appointmentTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  appointmentDetailText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  appointmentRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  appointmentDate: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.accent,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  tabLabel: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    textTransform: 'capitalize',
  },
});

export default DashboardScreen;

