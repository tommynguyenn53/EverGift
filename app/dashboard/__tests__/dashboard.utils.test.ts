import { describe, it, expect } from 'vitest'
import { formatAmount, formatDate} from "@/app/dashboard/utils";

describe('dashboard helpers', () => {
    it('formats cents into dollars', () => {
        expect(formatAmount(12345)).toBe('$123.45')
    })

    it('formats date string', () => {
        const date = '2025-01-01T10:00:00Z'
        const result = formatDate(date)
        expect(result).toContain('Jan')
    })
})
