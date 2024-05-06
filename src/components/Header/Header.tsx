import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import style from "./style.module.scss";
import Button from "../Button/Button";
import { useAppDispatch } from "../../utils/hooks/redux-hooks";
import { fetchUsers } from "../../store/api/usersApi";
import { changeSearchTerm } from "../../store/slices/userSlice";
import useDebounce from "../../utils/hooks/useDebounce";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState("");
  const debouncedSearchValue = useDebounce(term, 500);
  const handleRefreshUsers = () => {
    dispatch(fetchUsers());
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
        <Input onChange={handleInputChange} />
      </div>
      <div className={style.header__button}>
        <Button onClick={handleRefreshUsers}>Refresh Users</Button>
      </div>
    </div>
  );
};

export default Header;
