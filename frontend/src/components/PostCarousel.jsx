import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopPostsQuery } from "../slices/postsSlice";

const PostCarousel = () => {
  const { data: posts, isLoading, error } = useGetTopPostsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {posts.map((post) => (
        <Carousel.Item key={post._id}>
          <Link to={`/post/${post._id}`}>
            <Image src={post.image} alt={post.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2 className="text-white text-right">
                {post.name} (${post.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PostCarousel;
