import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const payload = await req.json()

    // Basic safety check
    if (!payload?.from || !payload?.subject || !payload?.html) {
        return NextResponse.json({ ok: true })
    }

    const forwardTo = 'evergift.team@gmail.com'

    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'EverGift Support <support@evergift.com.au>',
            to: forwardTo,
            subject: `Support: ${payload.subject}`,
            html: `
        <p><strong>From:</strong> ${payload.from}</p>
        <p><strong>To:</strong> support@evergift.com.au</p>
        <hr />
        ${payload.html}
      `,
        }),
    })

    return NextResponse.json({ received: true })
}