import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.delete(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);
class ExercisesList extends Component {
  state = {
    exercises: [],
  };
  constructor(props) {
    super(props);
  }

  exerciseList = () => {
    return this.state.exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          delete={this.handleDelete}
          key={currentExercise._id}
        />
      );
    });
  };

  handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          exercises: this.state.exercises.filter((ex) => ex._id !== id),
        });
      })
      .catch((err) => console.log("err"));
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then(({ data }) => {
        this.setState({ exercises: data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
