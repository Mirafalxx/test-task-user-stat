import React from "react";
import style from "./style.module.scss";

type StatisticItemSkeletonProps = {
  skeletonLength?: number;
};

const StatisticItemSkeleton: React.FC<StatisticItemSkeletonProps> = ({ skeletonLength = 4 }) => {
  return (
    <div className={style.statistic_skeleton}>
      {Array(skeletonLength)
        .fill(0)
        .map((_, idx) => {
          return <div key={idx} className={style.skeleton_age_group}></div>;
        })}
    </div>
  );
};

export default StatisticItemSkeleton;
