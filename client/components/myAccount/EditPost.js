import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSinglePost } from "../../store/singlePost";
import { editPost } from "../../store/posts";

class EditPost extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singlePost.id !== this.props.singlePost.id) {
      this.setState({
        title: this.props.singlePost.title,
        description: this.props.singlePost.description,
        category: this.props.singlePost.category,
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updatePost({ ...this.props.singlePost, ...this.state });
  }
  render() {
    const { title, description, category } = this.state;
    return (
      <div className="form-container">
        <h2>Edit your post below</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Post Title</label>
            <input name="title" value={title} onChange={this.handleChange} />
            <label>Description</label>
            <input
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />

            <label>Category</label>
            <select
              name="category"
              value={category}
              onChange={this.handleChange}
            >
              <option value="books">Books</option>
              <option value="children's items">Children's Items</option>
              <option value="clothing">Clothing</option>
              <option value="decor">Decor</option>
              <option value="entertainment">Entertainment</option>
              <option value="food">Food</option>
              <option value="furniture">Furniture</option>
              <option value="kitchen">Kitchen</option>
              <option value="personal care">Personal Care</option>
              <option value="pet supplies">Pet Supplies</option>
            </select>
          </div>
          <Link to="/myposts">
            <button type="submit" className="submit">
              Save Changes
            </button>
          </Link>
          <Link to="/myposts">
            <button className="submit">Cancel</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (singlePost) => dispatch(setSinglePost(singlePost)),
    updatePost: (singlePost) => dispatch(editPost(singlePost)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
