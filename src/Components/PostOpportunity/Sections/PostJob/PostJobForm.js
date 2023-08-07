import React, { Component } from "react";
import axios from "axios";

// Axios is an HTTP client library that allows you to make requests to a given endpoint
// In React communicating with the backend server is done via HTTP protocol. If you’re a developer, then you might have been familiar with the XML Http Request interface and Fetch API. It allows you to fetch data and make HTTP requests.This one is the common method to communicate with the database in React. In React there is another method to communicate with the backend server and that requires the installation of a popular library Axios. 
// Using Axios we make API requests in our application. Once the request is made we get the data in Return, and then we use this data in our project. 
// Axios provide you more functionality and features and that helps you in building your application quickly. 
// Axios: https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/
// When we use fecth api to get the data of any site then using fetch() method we first get the response and then we convert that response to json. But with axios we directly get the data in the form of json
import { Button, Form } from "react-bootstrap";
import styles from "../../../../CSS/Form.module.css";
import { withTranslation } from "react-i18next";

class PostJobForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      recruiterEmailId: "",
      recruiterPhoneNumber: "",
      category: "",
      description: "",
      location: "",
      offeredSalary: "",
      numberOfPositions: "",
    };
  }

  handleChange = (event) => {
    let itemValue = event.target.value;
    let itemName = event.target.name;
    this.setState({
      [event.target.name]: itemValue,
    });

    if(itemName == "recruiterPhoneNumber" && itemValue.length < 10) {
      document.getElementById('recruiterPhoneNumber').style.display = "block";
    } else {
      document.getElementById('recruiterPhoneNumber').style.display = "none";
    }
  };
 
  handleSubmit = (event) => {
    event.preventDefault();   //stop the default function of button and provide validation before the link or a form get submitted.
// The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
// For example, this can be useful when:
// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL
    // const role = this.state.category;
    // console.log("From handleSubmit", this.state.category);
    let englishCategory = "OTHERS";
    if (this.state.category === "बिजली कारीगर") englishCategory = "ELECTRICIAN";
    else if (this.state.category === "नलकार") englishCategory = "PLUMBER";
    else if (this.state.category === "क्रियाविधि") englishCategory = "MECHANIC";
    else if (this.state.category === "बावरची") englishCategory = "COOK";
    else if (this.state.category === "चपरासी") englishCategory = "PEON";
    else if (this.state.category === "चालक") englishCategory = "DRIVER";
    else if (this.state.category === "नौकरानी") englishCategory = "MAID";
    else if (this.state.category === "श्रम") englishCategory = "LABOUR";
    else if (this.state.category === "सुरक्षा गार्ड") englishCategory = "SECURITY GUARD";
    else englishCategory = this.state.category;
    axios
      .post("http://localhost:3030/jobs", {
        title: this.state.title,
        recruiterEmailId: this.state.recruiterEmailId,
        recruiterPhoneNumber: this.state.recruiterPhoneNumber,
        category: englishCategory,
        description: this.state.description,
        location: this.state.location,
        offeredSalary: this.state.offeredSalary,
        numberOfPositions: this.state.numberOfPositions,
      })
      .then((response) => {   //.then() is promises
        console.log(response);
        const data = response.data;
        this.setState({ data });
        alert("Job Posted");

        this.setState({
          title: "",
          recruiterEmailId: "",
          recruiterPhoneNumber: "",
          category: "",
          description: "",
          location: "",
          offeredSalary: "",
          numberOfPositions: "",
        });
      })
      .catch((error) => {   //Error handling
        console.log(error);
        // alert("Invalid Input");
      });
      // async await is used in place of complex axios code+error-handling
    // setTimeout(() => {
    //   window.location.href = `/jobs/${role.toLowerCase()}`;
    // }, 1000);
  };

  render() {
    const { t } = this.props;
    const {
      title,
      recruiterEmailId,
      recruiterPhoneNumber,
      category,
      description,
      location,
      offeredSalary,
      numberOfPositions,
    } = this.state;

    return (
      <div style={{ marginBottom: "80px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label className={styles.CardTitle}>
            {t("Let job seekers know you need them")}
          </Form.Label>

          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="title"
              value={title}
              placeholder={t("Your Name / Company Name")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="email"
              name="recruiterEmailId"
              value={recruiterEmailId}
              placeholder={t("Email")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
           {/* The <FormGroup> component wraps a form control with proper spacing, along with support for a label, help text, and validation state.  */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="recruiterPhoneNumber"
              value={recruiterPhoneNumber}
              placeholder={t("Contact Number")}
              maxLength="10"
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <p id="recruiterPhoneNumber" className={styles.ErrorMessage}>* Enter a 10 digit number</p>

          <Form.Group>
            <Form.Control
              as="select"
              className={styles.Input}
              name="category"
              value={category}
              defaultValue="Choose Category"
              style={{ marginTop: "30px", marginLeft: "40px" }}
              onChange={this.handleChange}
              required
            >
              <option> {t("Choose Category")} </option>
              <option> {t("ELECTRICIAN")} </option>
              <option> {t("PLUMBER")} </option>
              <option> {t("MECHANIC")} </option>
              <option> {t("COOK")} </option>
              <option> {t("PEON")} </option>
              <option> {t("DRIVER")} </option>
              <option> {t("MAID")} </option>
              <option> {t("LABOUR")} </option>
              <option> {t("SECURITY GUARD")} </option>
              <option> {t("OTHERS")} </option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={description}
              placeholder={t("Short Description")}
              style={{ marginTop: "35px", marginLeft: "40px" }}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="location"
              value={location}
              placeholder={t("Location")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="offeredSalary"
              value={offeredSalary}
              placeholder={t("Offered Salary (Per Month)")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="numberOfPositions"
              value={numberOfPositions}
              placeholder={t("No. of Positions")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Button className={styles.Button} type="submit">
              {t("Submit")}
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withTranslation()(PostJobForm);
