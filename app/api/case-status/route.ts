import axios from "axios";

export async function POST(request: Request) {
    try {
        const { caseNumber } = await request.json();
        const userToken = await request.headers.get("Authorization");

        console.log("User Token:", userToken);
        console.log("Case Number:", caseNumber);

        if (!caseNumber) {
            return new Response(JSON.stringify({ message: "Case number is required" }), { status: 400 });
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/case-status/${caseNumber}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${userToken}`, 
            }
        })

        if (response.status === 200) {
            return new Response(JSON.stringify(response.data), { status: 200 });
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
        console.error("Error in GET request:", err);
        return new Response(JSON.stringify(err?.response?.data), { status: err?.response?.status || 500 });
    }
}