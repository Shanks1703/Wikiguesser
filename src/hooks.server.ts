import {type Handle, redirect} from '@sveltejs/kit';
import {connect} from "$lib/database/database";
import {verifyToken} from "$lib/jwt/jwt";

await connect().then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.error(`Failed to connect to database : ${error.message}`);
});

export const handle: Handle = async ({ event, resolve }) => {
    if (!verifyToken(event.cookies.get("auth") as string)){
        if (event.url.pathname.startsWith("/") && !event.url.pathname.startsWith("/auth") && !event.url.pathname.startsWith("/api"))
            throw redirect(303, "/auth/login");
    }
    else
        if (event.url.pathname.startsWith("/auth"))
            throw redirect(303, "/");

    return resolve(event);
};