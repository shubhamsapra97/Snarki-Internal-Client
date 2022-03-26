import React, { useEffect, useState } from "react";
import NavRoutes from "./NavRoutes";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import {ME_QUERY} from "./components/queries/meQuery";
import {UserContextProvider} from "./providers/User/UserProvider";

const App = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ME_QUERY, {
    fetchPolicy: 'network-only'
  });
  if (error) console.log("failed to fetch me data");

  const [user, setUser] = useState(null);
  const updateUser = (userData) => setUser(userData);

  useEffect(() => {
    if (!loading && !error) {
      if (data.me.code !== 200) {
        navigate("/");
      }
      setUser(data.me.meData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <UserContextProvider value={{
      user,
      updateUser
    }}>
      <div className="App">
        {/* {
          user && location.pathname.includes("/dashboard") ?
            <DashHeader /> :
            <Header navbarRefs={navbarRefs} />
        } */}
        <Header />
        <NavRoutes />
      </div>
    </UserContextProvider>
  );
}

export default App;