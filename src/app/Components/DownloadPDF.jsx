// components/BookingPDF.jsx
'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 22,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0abde3',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 140,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  footer: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    fontSize: 11,
    textAlign: 'center',
  },
});

export default function BookingPDF({ booking }) {
  const createdDate = new Date(booking.createdAt).toLocaleString('en-GB');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Booking Details</Text>

        <View style={styles.section}>
          <Text style={styles.title}>Service Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Service:</Text>
            <Text style={styles.value}>{booking.serviceName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>
              {booking.durationValue} {booking.durationType}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Cost:</Text>
            <Text style={styles.value}>{booking.totalCost.toLocaleString()} TK</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Sender / Customer</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{booking.senderName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{booking.senderEmail}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Service Location</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Division:</Text>
            <Text style={styles.value}>{booking.senderDivision}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>District:</Text>
            <Text style={styles.value}>{booking.senderDistrict}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{booking.city}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{booking.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Booking Status</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>
              {booking.status === 'pending' ? 'Pending' : 'Active'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created:</Text>
            <Text style={styles.value}>{createdDate}</Text>
          </View>
        </View>

        {booking.note && (
          <View style={styles.section}>
            <Text style={styles.title}>Special Note</Text>
            <Text>{booking.note}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Booking ID: {booking._id.toString()}</Text>
          <Text>Thank you for using our service!</Text>
        </View>
      </Page>
    </Document>
  );
}