// lib/payments/format.ts
export function formatCents(cents: number) {
    return `$${(cents / 100).toFixed(2)}`
}
