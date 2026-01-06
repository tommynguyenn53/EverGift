import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components'

type GiftReceivedEmailProps = {
    coupleNames: string
    guestName?: string | null
    message?: string | null
    amount: string
    fees: string
    total: string
    feesCovered: boolean
    imageUrl?: string | null
    dashboardUrl: string
}

export default function GiftReceivedEmail({
                                              coupleNames,
                                              guestName,
                                              message,
                                              amount,
                                              fees,
                                              total,
                                              feesCovered,
                                              imageUrl,
                                              dashboardUrl,
                                          }: GiftReceivedEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>🎁 You’ve received a new wedding gift</Preview>

            <Body style={styles.body}>
                <Container style={styles.container}>
                    {/* Header */}
                    <Heading style={styles.heading}>
                        You’ve received a new wedding gift 🎉
                    </Heading>

                    <Text style={styles.subtext}>
                        A guest has just sent a gift to celebrate your special day.
                    </Text>

                    <Hr style={styles.divider} />

                    {/* Guest info */}
                    <Section>
                        <Text style={styles.label}>From</Text>
                        <Text style={styles.value}>
                            {guestName || 'A guest'}
                        </Text>

                        {message && (
                            <>
                                <Text style={styles.label}>Message</Text>
                                <Text style={styles.message}>
                                    “{message}”
                                </Text>
                            </>
                        )}
                    </Section>

                    {/* Image */}
                    {imageUrl && (
                        <Section style={{ marginTop: 20 }}>
                            <Img
                                src={imageUrl}
                                alt="Gift photo"
                                style={styles.image}
                            />
                        </Section>
                    )}

                    <Hr style={styles.divider} />

                    {/* Summary */}
                    <Section>
                        <Text style={styles.summaryTitle}>
                            Gift Summary
                        </Text>

                        <SummaryRow label="Gift amount" value={amount} />
                        <SummaryRow
                            label={`Fees ${feesCovered ? '(covered)' : '(deducted)'}`}
                            value={fees}
                        />

                        <Hr style={styles.lightDivider} />

                        <SummaryRow
                            label="Total received"
                            value={total}
                            bold
                        />
                    </Section>

                    {/* CTA */}
                    <Section style={{ marginTop: 32 }}>
                        <a href={dashboardUrl} style={styles.button}>
                            View all gifts
                        </a>
                    </Section>

                    {/* Footer */}
                    <Text style={styles.footer}>
                        You’re receiving this email because you’re connected to EverGift.
                        <br />
                        If you have questions, contact us at support@evergift.com.au
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

/* ---------------------------------------
   Small helper component
---------------------------------------- */

function SummaryRow({
                        label,
                        value,
                        bold = false,
                    }: {
    label: string
    value: string
    bold?: boolean
}) {
    return (
        <Section style={styles.row}>
            <Text style={{ ...styles.rowLabel, fontWeight: bold ? 600 : 400 }}>
                {label}
            </Text>
            <Text style={{ ...styles.rowValue, fontWeight: bold ? 600 : 400 }}>
                {value}
            </Text>
        </Section>
    )
}

/* ---------------------------------------
   Styles
---------------------------------------- */

const styles = {
    body: {
        backgroundColor: '#F6EEDC',
        fontFamily: 'Inter, Arial, sans-serif',
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 32,
        marginTop: 40,
    },
    heading: {
        fontSize: 26,
        fontWeight: 500,
        color: '#3A3A3A',
        textAlign: 'center' as const,
    },
    subtext: {
        textAlign: 'center' as const,
        color: '#5A5A5A',
        fontSize: 16,
        marginTop: 8,
    },
    divider: {
        margin: '24px 0',
        borderColor: '#E5E5E5',
    },
    lightDivider: {
        margin: '12px 0',
        borderColor: '#F0F0F0',
    },
    label: {
        fontSize: 12,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.04em',
        color: '#8A8A8A',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#3A3A3A',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: '#3A3A3A',
        fontStyle: 'italic',
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 12,
        color: '#3A3A3A',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    rowLabel: {
        fontSize: 14,
        color: '#3A3A3A',
    },
    rowValue: {
        fontSize: 14,
        color: '#3A3A3A',
    },
    image: {
        width: '100%',
        borderRadius: 10,
        objectFit: 'cover' as const,
    },
    button: {
        display: 'block',
        width: '100%',
        backgroundColor: '#D8C9A6',
        color: '#ffffff',
        textDecoration: 'none',
        textAlign: 'center' as const,
        padding: '14px 0',
        borderRadius: 14,
        fontSize: 16,
        fontWeight: 500,
    },
    footer: {
        marginTop: 32,
        fontSize: 12,
        color: '#8A8A8A',
        textAlign: 'center' as const,
    },
}
