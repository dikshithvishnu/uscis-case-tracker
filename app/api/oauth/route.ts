import axios from "axios";

export async function POST() {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", process.env.USCIS_CLIENT_ID!);
        params.append("client_secret", process.env.USCIS_CLIENT_SECRET!);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/oauth/accesstoken`, params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        if(response.status === 200) {
            return new Response(JSON.stringify({ access_token: response.data.access_token }), { status: 200 });
        }
    } catch (error) {
        console.error("Error in POST request:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}