import type {RequestEvent} from "@sveltejs/kit";

export async function POST({ request, cookies }: RequestEvent): Promise<Response> {
    return new Response("OK", { status: 200 });
}