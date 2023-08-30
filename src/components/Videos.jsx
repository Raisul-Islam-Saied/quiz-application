import { useState } from "react";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";
import style from "./styles/Videos.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
function Videos() {
  const [page, setPage] = useState(1);
  const { isloading, error, videos, hasMore } = useVideoList(page);

  return (
    <>
      {videos && !isloading && (
        <InfiniteScroll
          className={style.videos}
          dataLength={videos.length} //This is important field to render the next data
          next={() => setPage(page + 8)}
          hasMore={hasMore}
          loader={hasMore && <h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          // }
        >
          {videos.map((video) => (
            <Video
              key={video.youtubeID}
              noq={video.noq}
              title={video.title}
              id={video.youtubeID}
            />
          ))}
        </InfiniteScroll>
      )}
      {!isloading && videos.length === 0 && <div>no data found</div>}{" "}
      {isloading && <div>loading</div>} {error && <div>{error.message}</div>}
    </>
  );
}

export default Videos;
