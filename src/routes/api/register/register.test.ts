import { POST } from './+server';
import { describe, it, expect, vi, beforeEach } from "vitest";
import type {HttpError} from "@sveltejs/kit";
import {database} from "$lib/database/database";

vi.mock("$lib/database/database", () => ({
    database: {
        collection: vi.fn(() => ({
            findOne: vi.fn(),
            insertOne: vi.fn(),
        })),
    },
}));

vi.mock("$lib/jwt/jwt", () => ({
    createToken: vi.fn(() => "mocked-token"),
}));

describe("POST /register", () => {
    let requestEvent: any;
    let usersCollection: any;

    beforeEach(() => {
        usersCollection = {
            findOne: vi.fn(),
            insertOne: vi.fn(),
        };
        (database.collection as any).mockReturnValue(usersCollection);

        requestEvent = {
            request: {
                formData: vi.fn(),
            },
            cookies: {
                set: vi.fn(),
            },
        };
    });

    it("Should return 400 for invalid email", async () => {
        const formData = new FormData();
        formData.append("email", "invalid-email");
        formData.append("password", "password");
        formData.append("password-repeat", "password");

        requestEvent.request.formData.mockResolvedValue(formData);

        try {
            await POST(requestEvent);
        } catch (e) {
            expect((e as HttpError).status).toBe(400);
        }
    });

    it("Should return 400 if passwords do not match", async () => {
        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "password1");
        formData.append("password-repeat", "password2");

        requestEvent.request.formData.mockResolvedValue(formData);

        try {
            await POST(requestEvent);
        } catch (e) {
            expect((e as HttpError).status).toBe(400);
        }
    });

    it("Should return 409 if email is already in use", async () => {
        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "password");
        formData.append("password-repeat", "password");

        requestEvent.request.formData.mockResolvedValue(formData);
        usersCollection.findOne.mockResolvedValue({ email: "test@test.com" });

        try {
            await POST(requestEvent);
        } catch (e) {
            expect((e as HttpError).status).toBe(409);
        }
    });

    it("Should return 400 if user creation fails", async () => {
        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "password");
        formData.append("password-repeat", "password");

        requestEvent.request.formData.mockResolvedValue(formData);
        usersCollection.findOne.mockResolvedValue(null);
        usersCollection.insertOne.mockResolvedValue({ insertedId: null });

        try {
            await POST(requestEvent);
        } catch (e) {
            expect((e as HttpError).status).toBe(400);
        }
    });

    it("Should return 201 and set auth cookie for successful registration", async () => {
        const formData = new FormData();
        formData.append("email", "test@test.com");
        formData.append("password", "password");
        formData.append("password-repeat", "password");

        requestEvent.request.formData.mockResolvedValue(formData);
        usersCollection.findOne.mockResolvedValue(null);
        usersCollection.insertOne.mockResolvedValue({ insertedId: "id" });

        const response = await POST(requestEvent);

        expect(response.status).toBe(201);
        expect(requestEvent.cookies.set).toHaveBeenCalledWith(
            "auth",
            "mocked-token",
            expect.objectContaining({ path: "/", maxAge: 60 * 60 * 24 * 15 })
        );
    });
});
