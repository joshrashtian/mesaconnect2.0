import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://mesaconnect.io/',
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: 'https://mesaconnect.io/news',
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: 'https://mesaconnect.io/sign-in',
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        }

    ]
}