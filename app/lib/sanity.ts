import {createClient } from "next-sanity";
import  ImageUrlBuilder  from "@sanity/image-url";
export const client = createClient({ 
    apiVersion: '2023-12-01',
    dataset: 'production',
    projectId: '9sb6j9a6',
    useCdn: false,
})

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source);
}