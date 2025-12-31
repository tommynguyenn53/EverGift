export function formatAmount(cents: number) {
    return `$${(cents / 100).toFixed(2)}`
}

export function formatDate(date: string) {
    return new Date(date).toLocaleString('en-AU', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}
