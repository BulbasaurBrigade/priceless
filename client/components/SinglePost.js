import React from "react";

class SinglePost extends React.Component {
  render() {
    const post = this.props.post;
    const images = post.postImages || [];

    return (
      <div>
        <div>
          {images.map((image) => (
            <img src={image.imageUrl} key={image.id} />
          ))}
        </div>
        <h1>{post.title}</h1>
        <h3>location</h3>
        <h3>{post.status}</h3>
      </div>
    );
  }
}

export default SinglePost;
