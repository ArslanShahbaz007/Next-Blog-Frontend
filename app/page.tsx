// import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { simpleBlogCard } from "./lib/interface";
import {client} from "./lib/sanity";
import {urlFor} from "./lib/sanity"
import Image from "next/image";
async function getData(){
  const query = `*[_type=='blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
}   `;

const data = await client.fetch(query);
return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  console.log(data);
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {data.map((post, idx) => (
        <Card key={idx} className="p-4">
          <Image
            src={urlFor(post.titleImage).url()}
            alt={post.title}
            height={500}
            width={500}
            className="rounded-md object-cover"
          />
      <CardContent className="mt-5">
        <h2 className="text-lg line-clamp-2">{post.title}</h2>
        <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
        <Button asChild className="w-full mt-7">
          <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
           </Button>
      </CardContent>
        </Card>
      ))}
    </div>
  );
}
