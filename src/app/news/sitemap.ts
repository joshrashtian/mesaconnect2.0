import type { MetadataRoute } from 'next'
import {serverside} from "../../../config/serverside";


{/*
export default async function sitemap({
                                          id,
                                      }: {
    id: number
}): Promise<MetadataRoute.Sitemap> {

    const { data } = await serverside.from('newsposts').select("*").lt("id", 100)

    return [
        {
            url: 'http://mesaconnect.io/news'
        },
        data.map((product) => ({
        url: `https://mesaconnect.io/news/${id}`,
        lastModified: product.date,
    }))
    ]
}
*/}