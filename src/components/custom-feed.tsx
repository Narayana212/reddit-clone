import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { prisma } from "@/lib/db";
import PostFeed from "./post-feed";
import { getAuthSession } from "@/lib/auth";

const CustomFeed = async () => {
  const session = await getAuthSession();
  const followedCommunties = await prisma.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunties.map(({ subreddit }) => subreddit.id),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
