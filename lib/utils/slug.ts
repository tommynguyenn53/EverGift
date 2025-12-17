export function generateWeddingSlug(
    partnerOne: string,
    partnerTwo: string
) {
    const base = `${partnerOne}-${partnerTwo}`
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const random = Math.random().toString(36).slice(2, 7)

    return `${base}-${random}`
}
