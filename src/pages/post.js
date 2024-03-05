import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Post = ({ post }) => {
  // Function to generate random color
  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF9E', '#3384FF', '#E833FF', '#FF3384'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <div>
          {post.tags.map((tag, index) => (
            <span key={index} style={{ marginRight: '5px', color: getRandomColor() }}>{`#${tag}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const BetterPostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/user/posts?page=${page}&limit=5`);
        const newPosts = response.data.blogs;
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
        setHasMore(response.data.currentPage < response.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMorePosts(); // Initial fetch when component mounts
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Blogs...</h2> {/* Changed the name of the header */}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        scrollThreshold={0.9} // Fetch more posts when user has scrolled 90% down
      >
        <div className="row">
          {posts.map(post => (
            <div key={post.id} className="col-md-12">
              <Post post={post} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BetterPostList;
