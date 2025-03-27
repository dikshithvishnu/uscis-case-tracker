/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios"
import { USCIS_TOKEN } from "./constants";

export async function handleUSCISAuth(setLoading: (loading: boolean) => void, router: any) {
    try {
        setLoading(true);
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
        }
    } catch(err: any) {
        setLoading(false);
        if(err?.response?.status === 401 || err?.response?.status === 403) {
            window.sessionStorage.removeItem(USCIS_TOKEN);
            window.location.href = '/';
            return;
        }
        setData(err?.response?.data);
        console.log(err?.response?.data);
    }
}