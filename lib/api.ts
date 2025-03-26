/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios"
import { USCIS_TOKEN } from "./constants";

export async function handleUSCISAuth(setLoading: (loading: boolean) => void, router: any) {
    try {
        setLoading(true);
        
        // const params = new URLSearchParams();
        // params.append("grant_type", "client_credentials");
        // params.append("client_id", process.env.NEXT_PUBLIC_USCIS_CLIENT_ID!);
        // params.append("client_secret", process.env.NEXT_PUBLIC_USCIS_CLIENT_SECRET!);
        
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/oauth/accesstoken`, params, {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        // });

        const response = await axios.post('/api/oauth', {})

        if(response.status === 200) {
            window.sessionStorage.setItem(USCIS_TOKEN, response.data.access_token);
            router.push("/case-tracker");
        }
        
    } catch (error) {
        console.log("Error during USCIS authentication:", error)
    }
}


export async function handleFetchCaseStatus(caseNumber: string, setLoading: (loading: boolean) => void, setData: (data: any) => void) {
    try {
        setLoading(true);
        const response = await axios.post(`/api/case-status`, {
            caseNumber: caseNumber
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.sessionStorage.getItem(USCIS_TOKEN)}`,
            }
        })
        if(response.status === 200) {
            setData(response.data);
            setLoading(false);
        } else if(response.status === 404) {
            setLoading(false);
            setData(response.data);
            // console.log('hi', response?.data?.response?.data)
        }
    } catch(err: any) {
        setLoading(false);
        setData(err?.response?.data);
        console.log(err?.response?.data)
    }
}