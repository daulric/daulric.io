import { NextRequest, NextResponse } from "next/server";
import axios, { Axios } from "axios"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
        return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const api_key = process.env.API_NINJA_KEY;

    if (!api_key) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    try {
        const fetched = await axios.get("https://api.api-ninjas.com/v1/whois", {
            params: {
                domain: domain,
            },

            headers: {
                "X-Api-Key": api_key,
            }
        })

        if (fetched.status === 200) {
            const data = await fetched.data;
            return NextResponse.json(data, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to fetch WHOIS data' }, { status: fetched.status });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Request failed' }, { status: 500 });
    }
}
