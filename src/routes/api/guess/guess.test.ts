import { POST } from './+server';
import { describe, it, expect, vi } from 'vitest';

const mockRandomResponse = {
    query: {
        random: [
            { title: 'Test' }
        ]
    }
};

const mockPageResponse = {
    parse: {
        title: 'Test',
        text: { '*': '<p>Test</p>' }
    }
};

describe('/POST guess', () => {
    it('Fetches a random Wikipedia page and returns parsed content', async () => {
        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(mockRandomResponse)
            })
            .mockResolvedValueOnce({
                json: vi.fn().mockResolvedValue(mockPageResponse)
            });

        const response = await POST();
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual(mockPageResponse);
    });
});