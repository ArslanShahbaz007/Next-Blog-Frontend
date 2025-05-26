import {createClient } from "next-sanity";

export const client = createClient({ 
    apiVersion: '2023-12-01',
    dataset: 'production',
    projectId: '9sb6j9a6',
    useCdn: false,
})