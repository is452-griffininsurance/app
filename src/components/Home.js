import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "api.is452.cloud";

      try {
        const accessToken = await getAccessTokenSilently();
        const userDetails = `https://${domain}/users`;
        const metadataResponse = await fetch(userDetails, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // eslint-disable-next-line camelcase
        // const { user_metadata } = await metadataResponse.json();
        console.log(await metadataResponse.json());

        // setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <p>{user.email}</p>
        <p>{userMetadata}</p>
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
