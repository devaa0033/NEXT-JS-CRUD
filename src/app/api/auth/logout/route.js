
export async function POST(req, res) {
    return new Response("Logout successful", {
        status: 200,
        headers: {
            "Set-cookie": "token=; HttpONly; Max-Age=0; Path=/",
        }
    });
}