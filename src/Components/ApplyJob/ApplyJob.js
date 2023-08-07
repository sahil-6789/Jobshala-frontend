import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styles from "../../CSS/ApplyJob.module.css";
import { withTranslation } from "react-i18next";

class ApplyJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aadharNumber: "",
    };
  }

  handleChange = (event) => {
    let itemValue = event.target.value;
    this.setState({
      [event.target.name]: itemValue,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("From handleSubmit", this.state.aadharNumber);
    // instead of axios we can also use fetch() method of javascript to fetch api
    axios
      .post(   // This post method is used to insert data in mongoDB
        `http://localhost:3030/jobs/${this.props.jobId}/apply`,
        {
          aadharNumber: this.state.aadharNumber,
        }
      )
      .then((response) => {   // response is what we got by axios method
        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          //   console.log(data);
          this.setState({ data });
          alert(`Your application has been sent.`);
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 2000);
        }
      })
      .catch((error) => {
        alert(`Please register before applying!`);
        console.log(error);
        // setTimeout(() => {
        //   window.location.href = "/user/register";
        // }, 2000);
      });

    this.setState({
      aadharNumber: "",
    });
  };

  render() {
    const { aadharNumber } = this.state;
    const { handleClose, t } = this.props;

    return (
      <div className={styles.PopUpBox}>
        <div className={styles.Box}>
          <span className={styles.CloseIcon} onClick={handleClose}>
            x
          </span>
          <p>
            {" "}
            {t("If you haven't registered yet, please ")}
            <Link to={"/user/register"}>{t("register")} </Link>
            {t("before applying.")}
          </p>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="aadharNumber"
                value={aadharNumber}
                placeholder="Enter your AADHAR Number"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className={styles.Button} type="submit">
              {t("Submit")}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ApplyJob);
