import NotFound from "@/components/NotFound"
import { cookies } from "next/headers";

import YoutubeDownloader from "./downloader/youtube"
import NotificationsPage from "./notification/notification";
import WhoIs from "./whois/main"

export default function BetaComponentPage({params}: {params: {page: [string]}}) {
    let page = params ? params.page : [];
    let cookieStore = cookies()
    let authorizationCookie = cookieStore.get("beta_access")

    let main_index = page[0];

    if (typeof (authorizationCookie?.value) === "undefined") {
        return <NotFound status="Access Denied" text="Bruh You Think You Slick! Click Here" link="/beta" linkText="Click to Login for Beta Access" />
    }
    console.log(params.page)

    switch (main_index) {
        case "downloader":
            if (!page[1]) return <NotFound status="Not Found" text="Page Not Found. Return To Beta Home Page" link="/beta" linkText="Return Beta" />
            if (page[1].toLowerCase() === "youtube") return <YoutubeDownloader />
        
        case "notification":
            if (!page[1]) return <NotificationsPage />
        
        case "whois":
            if (!page[1]) return <WhoIs />

        default:
            return <NotFound status="Not Found" text="Page Not Found. Return To Beta Home Page" link="/beta" linkText="Return Beta" />
    }

    
}