import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Container, ListGroup } from "reactstrap";
import Project from "./components/Project";

class App extends Component {
  state = {
    projects: []
  };
  async componentDidMount() {
    try {
      const projects = await axios.get("http://localhost:6500/api/projects");
      console.log(projects);
      this.setState({ projects: projects.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state.projects);
    if (this.state.projects) {
      console.log("here");
      return (
        <section className="App bg-light min-vh-100">
          <Container>
            <Row>
              <Col
                xs={{ size: 12 }}
                md={{ size: 8, offset: 2 }}
                lg={{ size: 6, offset: 3 }}
              >
                <h2>Projects</h2>
                <ListGroup className="my-3">
                  {this.state.projects.map(project => (
                    <Project project={project} key={project.id} />
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </section>
      );
    }
    return <div />;
  }
}

export default App;
