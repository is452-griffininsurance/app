import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <p>{user.email}</p>
      </div>
    )
  );
}

function Home() {
  return (
    <>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Home</h1>
          </div>
        </div>
      </section>
      <div className="container is-fluid">
        <Profile />
      </div>
    </>
  );
}

export default Home;
