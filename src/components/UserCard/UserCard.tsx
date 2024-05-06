import React, { useState } from "react";
import style from "./style.module.scss";
import dayjs from "dayjs";
import { IDob, ILocation, IName, IPicture } from "store/types/userTypes";

type UserCardProps = {
  dob: IDob;
  name: IName;
  location: ILocation;
  picture: IPicture;
  email: string;
  phone: string;
  onClick: () => void;
};

const UserCard: React.FC<UserCardProps> = (props) => {
  const { dob, name, phone, picture, location, email, onClick } = props;

  const [displayDelete, setDisplayDelete] = useState(false);
  const date = dayjs(dob.date, { format: "YYYY-MM-DD" });
  const formattedDate = date.format("DD MMMM YYYY");
  const handleDisplayButton = () => {
    setDisplayDelete((prev) => !prev);
  };

  return (
    <div className={style.user_card} onClick={handleDisplayButton}>
      {displayDelete && <div onClick={onClick} className={style.delete_btn}></div>}

      <div className={style.name_details}>
        <img src={picture.thumbnail} alt="user_vatar" className={style.avatar} />
        <div>
          <p className={style.name}>{`${name.first} ${name.last}`}</p>
          <p className={style.overflow_text_data}>{email}</p>
        </div>
      </div>
      <div className={style.contact_details}>
        <div className={style.contact_details__item}>
          <span className={style.field_description}>Phone No</span>
          <span>{phone}</span>
        </div>
        <div className={style.contact_details__item}>
          <span className={style.field_description}>Birthday</span>
          <span>{formattedDate}</span>
        </div>
        <div className={style.contact_details__item}>
          <span className={style.field_description}>Address</span>
          <span
            className={style.overflow_text_data}
          >{`${location.city}, ${location.state}, ${location.country}`}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
