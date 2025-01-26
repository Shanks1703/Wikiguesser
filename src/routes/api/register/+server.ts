import {error, type RequestEvent} from "@sveltejs/kit";
import {database} from "$lib/database/database";
import type {User} from "$lib/models/user";
import {createToken} from "$lib/jwt/jwt";

export async function POST({ request, cookies }: RequestEvent): Promise<Response> {
    const collection = database.collection("users");

    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const passwordRepeat = data.get("password-repeat") as string;

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        error(400, "Invalid email");
    }

    if (password !== passwordRepeat) {
        error(400, "Passwords do not match");
    }

    let user: User | null = await collection.findOne<User>({ email });

    if (user) {
        error(409, "User already exists");
    }

    user = {
        email,
        password
    };
    const result = await collection.insertOne(user);

    if (!result.insertedId) {
        error(400, "Failed to create user");
    }

    cookies.set("auth", createToken(email), {
        path: "/",
        maxAge: 60 * 60 * 24 * 15,
    })

    return new Response(null, { status: 201 });
}
