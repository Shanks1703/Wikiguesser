import {error, type RequestEvent} from "@sveltejs/kit";
import {database} from "$lib/database/database";
import type {User} from "$lib/models/user";
import {createToken} from "$lib/jwt/jwt";

export async function POST({ request, cookies }: RequestEvent): Promise<Response> {
    const collection = database.collection("users");

    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const user: User | null = await collection.findOne<User>({ email, password });

    if (!user)
        error(401, "Invalid email or password");

    cookies.set("auth", createToken(email), {
        path: "/",
        maxAge: 60 * 60 * 24 * 15,
    })

    return new Response(null, { status: 200 });
}
