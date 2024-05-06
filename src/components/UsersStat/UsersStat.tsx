import React, { useMemo, memo } from "react";
import StatisticItem from "components/StatisticItem/StatisticItem";
import { IAgeGroupStats, IGenderGroupStats } from "store/types/userTypes";
import StatisticItemSkeleton from "components/StatisticItemSkeleton/StatisticItemSkeleton";

import style from "./style.module.scss";
type UserStatProps = {
  ageGroups: IAgeGroupStats;
  gengerGroups: IGenderGroupStats;
  totalUsers: number;
  loading: boolean;
};

export const UsersStat: React.FC<UserStatProps> = memo(({ ageGroups, gengerGroups, totalUsers, loading }) => {
  const ageGroupsItems = useMemo(() => {
    return Object.entries(ageGroups).map(([range, value]) => (
      <StatisticItem range={range} value={value} key={range} />
    ));
  }, [ageGroups]);

  const gengerGroupsItems = useMemo(() => {
    return Object.entries(gengerGroups).map(([range, value]) => (
      <StatisticItem range={range} value={value} key={range} />
    ));
  }, [gengerGroups]);

  return (
    <div className={style.users_stat_wrapper}>
      <div className={style.users_stat}>
        {loading ? (
          <div className={style.sekelton_total_users}></div>
        ) : (
          <p className={style.total_users}>{`${totalUsers} ${totalUsers === 1 ? "user" : "users"}`}</p>
        )}

        <div className={style.divider}></div>
        <div className={style.groups_wrapper}>
          <p className={style.subtitle}>Age Groups</p>
          {loading ? <StatisticItemSkeleton /> : <> {ageGroupsItems}</>}
        </div>
        <div className={style.divider}></div>
        <div className={style.groups_wrapper}>
          <p className={style.subtitle}>Gender Groups</p>

          {loading ? <StatisticItemSkeleton skeletonLength={2} /> : <> {gengerGroupsItems}</>}
        </div>
      </div>
    </div>
  );
});
