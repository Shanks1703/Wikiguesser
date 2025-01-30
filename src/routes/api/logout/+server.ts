import {type RequestEvent} from "@sveltejs/kit";

export async function POST({ cookies }: RequestEvent): Promise<Response> {
    cookies.delete("auth", { path: "/" });
    return new Response(null, { status: 200 });
}