import type { MetadataRoute } from 'next'
import {serverside} from "../../../config/serverside";

export default async function sitemap({
                                          id,
                                      }: {
    id: number
}): Promise<MetadataRoute.Sitemap> {



    const { data, error } = await serverside.from('newsposts').select("*").lt("id", 100)

    const newsArticles: MetadataRoute.Sitemap = data ? data.map((article) => ({
        url: `https://mesaconnect.io/news?arid=${article.id}`,
        lastModified: new Date(article.created_at)
    })) : [{ url: 'http://mesaconnect.io/news'}]

    return [
            ...newsArticles
    ]

}