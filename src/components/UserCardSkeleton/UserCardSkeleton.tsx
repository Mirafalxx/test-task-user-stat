import React from "react";
import style from "./style.module.scss";

type UserCardSkeletonProps = {
  skeletonLength?: number;
};

const UserCardSkeleton: React.FC<UserCardSkeletonProps> = ({ skeletonLength = 100 }) => {
  return Array(skeletonLength)
    .fill(0)
    .map((_, idx) => (
      <div className={style.user_card_skeleton} key={idx}>
        <div className={style.name_details}>
          <div className={style.avatar}></div>
          <div>
            <p className={style.name}></p>
            <p></p>
          </div>
        </div>
        <div className={style.contact_details}>
          <div className={style.contact_details__item}>
            <span className={style.field_description}></span>
            <span></span>
          </div>
          <div className={style.contact_details__item}>
            <span className={style.field_description}></span>
            <span></span>
          </div>
          <div className={style.contact_details__item}>
            <span className={style.field_description}></span>
            <span className={style.location}></span>
          </div>
        </div>
      </div>
    ));
};

export default UserCardSkeleton;
