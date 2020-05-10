import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class EditExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  handleDate = (date) => {
    this.setState({
      date,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { username, description, duration, date } = this.state;
    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .put(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then(({ data }) => console.log(data));
    this.props.history.push("/");
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      });

    axios.get("http://localhost:5000/users/").then(({ data }) => {
      if (data.length > 0) {
        this.setState({
          users: data.map((user) => user.username),
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Username:</label>
            <select
              required
              className="form-control"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
            >
              {this.state.users.map((user, i) => {
                return (
                  <option key={i} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Description: </label>
            <input
              required
              type="text"
              className="form-control"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Duration (in minutes): </label>
            <input
              required
              onChange={this.handleChange}
              type="text"
              className="form-control"
              value={this.state.duration}
              name="duration"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Date: </label>
            <DatePicker
              name="date"
              onChange={this.handleDate}
              selected={this.state.date}
            />
          </div>

          <div className="form-group">
            <input
              required
              type="submit"
              className="form-control btn btn-primary"
              value="Edit Exercise Log"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercises;
