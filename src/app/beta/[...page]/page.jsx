import main_page from "./main_page"

export async function generateMetadata({params}) {
    let str = "";

    let page = params.page;

    page.map((text) => {
        str += `/${text}`
    })

    return {
        title: `Beta - ${str}`
    }

}

export default main_page;