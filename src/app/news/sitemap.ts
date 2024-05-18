import type { MetadataRoute } from 'next'
import {serverside} from "../../../config/serverside";

export default async function sitemap({
                                          id,
                                      }: {
    id: number
}): Promise<MetadataRoute.Sitemap> {

    const { data, error } = await serverside.from('newsposts').select("*").lt("id", 100)

    //@ts-ignore
    return data?.map((product) => ({
        url: `https://mesaconnect.io/news?arid=${id}`,
        lastModified: product.date,
    }))

}