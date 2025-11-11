import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData();

  // 연결한 ref 영역에 닿으면 inView: true 반환
  const { ref, inView } = useInView();

  useEffect(() => {
    // console.log("inView: ", inView);
    if (inView) {
      // 데이터 추가
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((post) => <PostItem key={post.id} {...post} />),
      )}

      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
