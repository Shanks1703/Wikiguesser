import jwt from 'jsonwebtoken';

export function createToken(email: string): string {
    return jwt.sign({
        email: email
    }, "ABC", {
        expiresIn: "15d"
    });
}

export function verifyToken(token: string) {
    let result;

    try {
        result = jwt.verify(token, "ABC");
    } catch (error) {
        result = false;
    }

    return result;
}
