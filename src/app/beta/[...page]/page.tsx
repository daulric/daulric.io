import NotFound from "@/components/NotFound"
import { cookies } from "next/headers";

import YoutubeDownloader from "./downloader/youtube"

export default function BetaComponentPage({params}: {params: {page: [string]}}) {
    let page = params ? params.page : [];
    let cookieStore = cookies()
    let authorizationCookie = cookieStore.get("beta_access")

    if (typeof (authorizationCookie?.value) === "undefined") {
        return <NotFound status="Access Denied" text="Bruh You Think You Slick!" />
    }

    if (page[0].toLowerCase() === "downloader" && page[1].toLowerCase() === "youtube") {
        return <YoutubeDownloader />
    }

    return <NotFound status="Not Found" text="Page Not Found. Try again when released!" />
}