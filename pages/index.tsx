import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  console.log("Random post", posts[0].author.image);

  return (
    <div className="">
      <Head>
        <title>Medium Page</title>
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0 max-w-7xl mx-auto">
        <div className="px-10 space-x-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>
            &nbsp;is a place to write, read, and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of renders.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-2 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs ">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    description,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
