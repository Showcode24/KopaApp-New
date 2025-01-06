import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronRight,
  Download,
  DollarSign,
} from 'lucide-react-native';
import { COLORS, FONTS } from '../constants/theme';

const PaymentItem = ({ 
  amount, 
  date, 
  status, 
  description,
  studentName
}: { 
  amount: string; 
  date: string; 
  status: 'pending' | 'completed' | 'failed';
  description: string;
  studentName: string;
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return '#FFB800';
      case 'completed':
        return '#00C853';
      case 'failed':
        return '#FF3B30';
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color={getStatusColor()} />;
      case 'completed':
        return <CheckCircle2 size={20} color={getStatusColor()} />;
      case 'failed':
        return <XCircle size={20} color={getStatusColor()} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.paymentItem}>
      <View style={styles.paymentItemLeft}>
        <View style={[styles.statusIcon, { backgroundColor: `${getStatusColor()}15` }]}>
          {getStatusIcon()}
        </View>
        <View>
          <Text style={styles.paymentDescription}>{description}</Text>
          <Text style={styles.paymentStudent}>Student: {studentName}</Text>
          <Text style={styles.paymentDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.paymentItemRight}>
        <Text style={styles.paymentAmount}>{amount}</Text>
        <ChevronRight size={20} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const InvoiceItem = ({ 
  invoiceNo, 
  date, 
  amount,
  studentName
}: { 
  invoiceNo: string; 
  date: string; 
  amount: string;
  studentName: string;
}) => (
  <TouchableOpacity style={styles.invoiceItem}>
    <View style={styles.invoiceItemLeft}>
      <View style={styles.invoiceIcon}>
        <FileText size={20} color={COLORS.accent} />
      </View>
      <View>
        <Text style={styles.invoiceNo}>{invoiceNo}</Text>
        <Text style={styles.invoiceStudent}>Student: {studentName}</Text>
        <Text style={styles.invoiceDate}>{date}</Text>
      </View>
    </View>
    <View style={styles.invoiceItemRight}>
      <Text style={styles.invoiceAmount}>{amount}</Text>
      <TouchableOpacity style={styles.downloadButton}>
        <Download size={20} color={COLORS.accent} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function PaymentsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Earnings</Text>
        <Text style={styles.balanceAmount}>$2,459.00</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Payments</Text>
        <PaymentItem
          amount="$75.00"
          date="Jan 15, 2024"
          status="pending"
          description="Math Tutoring Session"
          studentName="John Doe"
        />
        <PaymentItem
          amount="$60.00"
          date="Jan 18, 2024"
          status="pending"
          description="Science Homework Help"
          studentName="Jane Smith"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        <PaymentItem
          amount="$90.00"
          date="Dec 15, 2023"
          status="completed"
          description="English Literature Session"
          studentName="Alice Johnson"
        />
        <PaymentItem
          amount="$45.00"
          date="Dec 10, 2023"
          status="failed"
          description="Chemistry Lab Assistance"
          studentName="Bob Williams"
        />
        <PaymentItem
          amount="$80.00"
          date="Nov 15, 2023"
          status="completed"
          description="Physics Exam Prep"
          studentName="Charlie Brown"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Invoices</Text>
        <InvoiceItem
          invoiceNo="INV-2024-001"
          date="Jan 2024"
          amount="$350.00"
          studentName="John Doe"
        />
        <InvoiceItem
          invoiceNo="INV-2023-012"
          date="Dec 2023"
          amount="$280.00"
          studentName="Jane Smith"
        />
        <InvoiceItem
          invoiceNo="INV-2023-011"
          date="Nov 2023"
          amount="$420.00"
          studentName="Alice Johnson"
        />
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: FONTS.bold,
    color: COLORS.accent,
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  withdrawButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textBlack,
    marginBottom: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  paymentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDescription: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textBlack,
    marginBottom: 4,
  },
  paymentStudent: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  paymentItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentAmount: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.accent,
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  invoiceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  invoiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.accent}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceNo: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.textBlack,
    marginBottom: 4,
  },
  invoiceStudent: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  invoiceItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  invoiceAmount: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.accent,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.accent}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

