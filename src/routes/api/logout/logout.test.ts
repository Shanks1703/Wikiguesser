import { POST } from "./+server";
import {beforeEach, describe, expect, it, vi} from "vitest";

describe("POST /logout", () => {
    let requestEvent: any;

    beforeEach(() => {
        requestEvent = {
            cookies: {
                delete: vi.fn(),
            },
        };
    });

    it("Should return 200", async () => {
        const response = await POST(requestEvent);
        expect(response.status).toBe(200);
    });
});