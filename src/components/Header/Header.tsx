import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useAppDispatch } from "utils/hooks/redux-hooks";
import useDebounce from "utils/hooks/useDebounce";
import { fetchUsers } from "store/api/usersApi";
import Button from "components/Button/Button";
import { changeSearchTerm } from "store/slices/userSlice";
import Input from "components/Input/Input";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState("");
  const debouncedSearchValue = useDebounce(term, 500);
  const handleRefreshUsers = () => {
    dispatch(fetchUsers());
    setTerm("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value.trim());
  };

  useEffect(() => {
    dispatch(changeSearchTerm(debouncedSearchValue));
  }, [dispatch, debouncedSearchValue]);
  return (
    <div className={style.header}>
      <div className={style.header__input}>
        <Input onChange={handleInputChange} value={term} />
      </div>
      <div className={style.header__button}>
        <Button onClick={handleRefreshUsers}>Refresh Users</Button>
      </div>
    </div>
  );
};

export default Header;
