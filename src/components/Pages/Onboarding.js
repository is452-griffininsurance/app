import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import JWTDecode from "jwt-decode";

const initialFormData = Object.freeze({
  name: "",
});

function Onboarding() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const jwtClaims = JWTDecode(token);
  // console.log(jwtClaims);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    // Set final post data to include email, not very secure but ok
    // Should send bearer token instead
    const data = { ...formData, email: jwtClaims.email };

    // Post to API
    console.log(data);
    fetch("https://api.is452.cloud/users/onboarding", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => console.log(response));
    const state = params.get("state");
    window.location.href = `https://is452.us.auth0.com/continue?state=${state}`;
  };

  return (
    <div>
      <section className="hero is-dark mb-4">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Signup</h1>
            <h2 className="subtitle">Fill in your profile information</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label" htmlFor="name">
                Name
              </label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  type="text"
                  placeholder="Johnny Appleseed"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox" id="checkbox">
                  <input type="checkbox" /> I agree to the{" "}
                  <a
                    href="https://is452.cloud/terms-and-conditions"
                    target="noopener noreferrer"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <span
                  role="button"
                  className="button is-link"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </span>
              </div>
              <div className="control">
                <button type="button" className="button is-link is-light">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
