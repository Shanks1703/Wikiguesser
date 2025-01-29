import { POST } from './+server';
import { describe, test, expect, vi, beforeEach } from "vitest";
import { database } from "$lib/database/database";
import type {HttpError} from "@sveltejs/kit";

vi.mock("$lib/database/database", () => ({
    database: {
        collection: vi.fn(() => ({
            findOne: vi.fn(),
        })),
    },
}));

vi.mock("$lib/jwt/jwt", () => ({
    createToken: vi.fn(() => "mocked-token"),
}));

describe("POST /login", () => {
    let requestEvent: any;
    let usersCollection: any;

    beforeEach(() => {
        usersCollection = {
            findOne: vi.fn(),
        };
        (database.collection as any).mockReturnValue(usersCollection);

        requestEvent = {
            request: {
                formData: vi.fn(async () => new FormData()),
            },
            cookies: {
                set: vi.fn(),
            },
        };
    });

    test("Should return 200 and set auth cookie for valid credentials", async () => {
        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "password");
        requestEvent.request.formData.mockResolvedValue(formData);

        usersCollection.findOne.mockResolvedValue({ email: "test@test.com", password: "password" });

        const response = await POST(requestEvent);

        expect(response.status).toBe(200);
        expect(requestEvent.cookies.set).toHaveBeenCalledWith(
            "auth",
            "mocked-token",
            expect.objectContaining({ path: "/", maxAge: 60 * 60 * 24 * 15 })
        );
    });

    test("Should return 401 for invalid credentials", async () => {
        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "password");
        requestEvent.request.formData.mockResolvedValue(formData);

        usersCollection.findOne.mockResolvedValue(null);

        try{
            await POST(requestEvent);
        } catch (e) {
            expect((e as HttpError).status).toBe(401);
        }
    });
});