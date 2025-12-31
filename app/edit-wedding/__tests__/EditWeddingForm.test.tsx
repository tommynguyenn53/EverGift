import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup,
} from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import EditWeddingForm from '../EditWeddingForm'

afterEach(() => {
    cleanup()
})

// ─────────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────────

const pushMock = vi.fn()
const eqMock = vi.fn()
const updateMock = vi.fn(() => ({ eq: eqMock }))
const singleMock = vi.fn()

const uploadMock = vi.fn()
const removeMock = vi.fn()
const getPublicUrlMock = vi.fn()

vi.mock('@/lib/supabase/client', () => ({
    supabaseBrowser: () => ({
        from: () => ({
            update: updateMock,
            select: () => ({
                eq: () => ({
                    single: singleMock,
                }),
            }),
            insert: vi.fn(),
        }),
        storage: {
            from: () => ({
                upload: uploadMock,
                remove: removeMock,
                getPublicUrl: getPublicUrlMock,
            }),
        },
    }),
}))

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}))

vi.mock('@/components/PageBackground', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

vi.mock('@/components/ImageRecommendationModal', () => ({
    default: ({ open }: { open: boolean }) =>
        open ? <div>Image Help Modal</div> : null,
}))

vi.mock('@/components/PortraitUploadTile', () => ({
    default: ({ onUpload }: { onUpload: (file: File) => void }) => (
        <button
            onClick={() =>
                onUpload(
                    new File(['img'], 'photo.jpg', { type: 'image/jpeg' })
                )
            }
        >
            Upload Image
        </button>
    ),
}))

vi.mock('@/components/FinalStepChecklist', () => ({
    default: () => <div>Checklist</div>,
}))

// ─────────────────────────────────────────────
// Test Data
// ─────────────────────────────────────────────

const wedding = {
    id: 'wedding-1',
    partner_one_name: 'Alex',
    partner_two_name: 'Sam',
    wedding_date: '2025-12-01',
    header_text: 'Our Wedding',
    welcome_message: 'Thanks for celebrating with us!',
    slug: 'alex-and-sam',
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function renderPage() {
    render(<EditWeddingForm wedding={wedding} />)
}

function fillRequiredFields() {
    fireEvent.change(screen.getByLabelText(/partner 1 name/i), {
        target: { value: 'Alex' },
    })
    fireEvent.change(screen.getByLabelText(/partner 2 name/i), {
        target: { value: 'Sam' },
    })
    fireEvent.change(screen.getByLabelText(/wedding date/i), {
        target: { value: '2025-12-02' },
    })
    fireEvent.change(screen.getByLabelText(/header text/i), {
        target: { value: 'A beautiful day' },
    })
    fireEvent.change(screen.getByLabelText(/welcome message/i), {
        target: { value: 'Welcome everyone!' },
    })
}

async function waitForSaveEnabled() {
    await waitFor(() =>
        expect(
            screen.getByRole('button', {
                name: /update my wedding page/i,
            })
        ).toBeEnabled()
    )
}

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────

describe('EditWeddingForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        singleMock.mockResolvedValue({ data: null, error: null })
        uploadMock.mockResolvedValue({ error: null })
        removeMock.mockResolvedValue({})
        getPublicUrlMock.mockReturnValue({
            data: { publicUrl: 'https://image.url/test.jpg' },
        })
    })

    it('renders existing wedding data', () => {
        renderPage()

        expect(screen.getByDisplayValue('Alex')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Sam')).toBeInTheDocument()
        expect(screen.getByDisplayValue('2025-12-01')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Our Wedding')).toBeInTheDocument()
    })

    it('disables save button initially (no collage image)', () => {
        renderPage()

        expect(
            screen.getByRole('button', {
                name: /update my wedding page/i,
            })
        ).toBeDisabled()
    })

    it('uploads collage image and enables save button', async () => {
        renderPage()

        fireEvent.click(screen.getByText(/upload image/i))
        fillRequiredFields()

        await waitForSaveEnabled()
    })

    it('updates wedding and redirects to dashboard', async () => {
        eqMock.mockResolvedValue({ error: null })

        renderPage()

        fireEvent.click(screen.getByText(/upload image/i))
        fillRequiredFields()
        await waitForSaveEnabled()

        fireEvent.click(
            screen.getByRole('button', {
                name: /update my wedding page/i,
            })
        )

        await waitFor(() => {
            expect(updateMock).toHaveBeenCalled()
            expect(pushMock).toHaveBeenCalledWith('/dashboard')
        })
    })

    it('shows error message when update fails', async () => {
        eqMock.mockResolvedValue({
            error: { message: 'Update failed' },
        })

        renderPage()

        fireEvent.click(screen.getByText(/upload image/i))
        fillRequiredFields()
        await waitForSaveEnabled()

        fireEvent.click(
            screen.getByRole('button', {
                name: /update my wedding page/i,
            })
        )

        expect(
            await screen.findByText(/update failed/i)
        ).toBeInTheDocument()
    })

    it('opens image recommendation modal', () => {
        renderPage()

        fireEvent.click(
            screen.getByText(/what images should i upload/i)
        )

        expect(
            screen.getByText(/image help modal/i)
        ).toBeInTheDocument()
    })
})
