import React from "react";
import { connect } from "react-redux";
import { destroyImage } from "../../store/singlePost";

class EditImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
  }
  handleDestroy(event) {
    //this is where to pick up!
    event.preventDefault();
    const imageId = event.target.value;
    this.props.destroyPostImage(this.props.postId, imageId);
  }
  render() {
    const { postImages, postId } = this.props;
    console.log("postId:", postId);
    return (
      <div>
        {postImages.map((image) => (
          <div className="photo-preview-div" key={image.id}>
            <img src={image.imageUrl} height={200} className="photo-preview" />
            <button onClick={this.handleDestroy} value={image.id}>
              x
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  destroyPostImage: (postId, imageId) =>
    dispatch(destroyImage(postId, imageId)),
});

export default connect(null, mapDispatchToProps)(EditImageForm);
