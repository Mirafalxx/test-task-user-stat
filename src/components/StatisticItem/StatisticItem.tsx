import React from "react";
import style from "./style.module.scss";

type StatisticItemProps = {
  range: string;
  value: number | string;
};

const StatisticItem: React.FC<StatisticItemProps> = ({ range, value }) => {
  return (
    <div key={range} className={style.age_group}>
      <div className={style.age_title}>{range}</div>
      <div className={style.age_count}>{`${value} ${value === 1 ? "user" : "users"}`}</div>
    </div>
  );
};

export default StatisticItem;
