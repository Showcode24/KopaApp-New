import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Book,
  Clock,
  Star,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { COLORS, FONTS } from '../constants/theme';
import { getAuth, signOut, User as FirebaseUser } from 'firebase/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  SignIn: undefined;
  EditProfile: undefined;
  HelpSupport: undefined;
};

type ProfileScreenNavigationProp = NavigationProp<RootStackParamList>;

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
  <View style={styles.statItem}>
    {icon}
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProfileItem = ({ icon, label, value, onPress }: { icon: React.ReactNode, label: string, value: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    <View style={styles.profileItemLeft}>
      {icon}
      <View>
        <Text style={styles.profileItemLabel}>{label}</Text>
        <Text style={styles.profileItemValue}>{value}</Text>
      </View>
    </View>
    <ChevronRight size={20} color={COLORS.textSecondary} />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error: unknown) {
      Alert.alert('Logout Error', (error as Error).message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.photoURL || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder.svg?height=150&width=150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.displayName || 'Tutor'}</Text>
        <Text style={styles.title}>Mathematics Tutor</Text>
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>Available for tutoring</Text>
          <Switch
            trackColor={{ false: COLORS.textSecondary, true: COLORS.accent }}
            thumbColor={isAvailable ? COLORS.background : COLORS.text}
            onValueChange={() => setIsAvailable(!isAvailable)}
            value={isAvailable}
          />
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatItem 
          icon={<Book size={24} color={COLORS.accent} />}
          value="120"
          label="Sessions"
        />
        <StatItem 
          icon={<Clock size={24} color={COLORS.accent} />}
          value="500"
          label="Hours"
        />
        <StatItem 
          icon={<Star size={24} color={COLORS.accent} />}
          value="4.9"
          label="Rating"
        />
        <StatItem 
          icon={<DollarSign size={24} color={COLORS.accent} />}
          value="$2.5k"
          label="Earnings"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <ProfileItem
          icon={<Mail size={20} color={COLORS.accent} />}
          label="Email"
          value={user.email || 'No email provided'}
        />
        <ProfileItem
          icon={<Phone size={20} color={COLORS.accent} />}
          label="Phone"
          value={user.phoneNumber || 'No phone number provided'}
        />
        <ProfileItem
          icon={<MapPin size={20} color={COLORS.accent} />}
          label="Location"
          value="New York, NY"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tutoring Subjects</Text>
        <View style={styles.subjectsContainer}>
          {['Algebra', 'Calculus', 'Geometry', 'Statistics'].map((subject, index) => (
            <View key={index} style={styles.subjectTag}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <ProfileItem
          icon={<Settings size={20} color={COLORS.accent} />}
          label="Edit Profile"
          value=""
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileItem
          icon={<HelpCircle size={20} color={COLORS.accent} />}
          label="Help & Support"
          value=""
          onPress={() => navigation.navigate('HelpSupport')}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  availabilityText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textBlack,
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
    marginBottom: 16,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileItemLabel: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textBlack,
    marginBottom: 4,
  },
  profileItemValue: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  subjectText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textBlack,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.error,
    marginLeft: 8,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.textBlack,
    textAlign: 'center',
    marginTop: 50,
  },
});

