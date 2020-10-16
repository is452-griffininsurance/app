import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "localhost:5000";

      try {
        const accessToken = await getAccessTokenSilently();
        const userDetails = `http://${domain}/users`;
        const metadataResponse = await fetch(userDetails, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(accessToken);

        // eslint-disable-next-line camelcase
        // const { user_metadata } = await metadataResponse.json();
        console.log(await metadataResponse.json());

        console.log(
          await fetch(`http://${domain}/users/scoped`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        );

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

export default Profile;
