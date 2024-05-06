import React, { useEffect } from "react";
import { useAppDispatch } from "./utils/hooks/redux-hooks";
import { fetchUsers } from "./store/api/usersApi";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Users from "./components/Users/Users";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="app">
      <Container>
        <Header />
        <Users />
      </Container>
    </div>
  );
};

export default App;
