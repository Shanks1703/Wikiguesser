import {describe, expect, it, test, vitest} from "vitest";
import {POST} from "../src/routes/api/login/+server";
import { database } from '$lib/database/database';

vitest.mock('$lib/database/database', () => ({
    database: {
        collection: vitest.fn(() => ({
            findOne: vitest.fn()
        }))
    }
}));

describe("Login with existing user", () => {
   it("should return 401", async () => {
       const mockUser = { email: "test@test.com", password: "password" };
       const mockFindOne = vitest.fn(() => Promise.resolve(null));
       (database.collection as any).mockReturnValue({ findOne: mockFindOne });
       const mockFormData = new Map([
           ['email', 'test@example.com'],
           ['password', 'password123']
       ]);
       const mockRequest = {
           formData: async () => mockFormData
       };
       const mockCookies = {
           set: vitest.fn()
       };

       const response = await POST({
           request: mockRequest,
           cookies: mockCookies
       } as any);

       expect(response.status).toBe(401);
   });
});
