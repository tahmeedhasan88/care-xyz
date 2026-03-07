
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from '@react-email/components';

export default function BookingConfirmedEmail({ booking, confirmedByEmail }) {
  const createdDate = new Date(booking.createdAt).toLocaleString();

  return (
    <Html>
      <Head />
      <Preview>Care.xyz - Your Booking Has Been Confirmed!</Preview>
      <Body style={{ fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: '#f6f6f6', margin: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading style={{ color: '#0abde3', textAlign: 'center', marginBottom: '10px' }}>
            Invoice of Care.xyz
          </Heading>

          <Text style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
            Booking Confirmed by: {confirmedByEmail}
          </Text>

          <Hr style={{ borderColor: '#e0e0e0', margin: '20px 0' }} />

          <Section>
            <Row>
              <Column>
                <Text style={{ fontWeight: 'bold' }}>Service:</Text>
                <Text>{booking.serviceName}</Text>
              </Column>
              <Column>
                <Text style={{ fontWeight: 'bold' }}>Duration:</Text>
                <Text>{booking.durationValue} {booking.durationType}</Text>
              </Column>
            </Row>

            <Row style={{ marginTop: '15px' }}>
              <Column>
                <Text style={{ fontWeight: 'bold' }}>Customer:</Text>
                <Text>{booking.senderName}</Text>
                <Text>{booking.senderEmail}</Text>
              </Column>
              <Column>
                <Text style={{ fontWeight: 'bold' }}>Total Cost:</Text>
                <Text>৳{booking.totalCost.toLocaleString()}</Text>
              </Column>
            </Row>

            <Row style={{ marginTop: '15px' }}>
              <Column>
                <Text style={{ fontWeight: 'bold' }}>Location:</Text>
                <Text>
                  {booking.city}, {booking.address} <br />
                  Division: {booking.senderDivision} <br />
                  District: {booking.senderDistrict}
                </Text>
              </Column>
            </Row>

            {booking.note && (
              <Row style={{ marginTop: '15px' }}>
                <Column>
                  <Text style={{ fontWeight: 'bold' }}>Special Note:</Text>
                  <Text>{booking.note}</Text>
                </Column>
              </Row>
            )}
          </Section>

          <Hr style={{ borderColor: '#e0e0e0', margin: '20px 0' }} />

          <Text style={{ textAlign: 'center', color: '#888', fontSize: '12px' }}>
            Booking ID: {booking._id} <br />
            Created: {createdDate} <br />
            Thank you for using Care.xyz!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}