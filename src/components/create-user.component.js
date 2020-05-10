import React, { Component } from "react";
import axios from "axios";
class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { username } = this.state;
    const user = {
      username,
    };

    console.log(user);
    axios
      .post("http://localhost:5000/users/add", user)
      .then(({ data }) => console.log(data));
    this.setState({
      username: "",
    });
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Username</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              id="username"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create user"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUsers;
