import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { filterUsers } from 'utils/utils';
import { getAgeGroups, getGengerGroups, getLoading, getSearchTerm, getTotalUsers, getUsers } from 'store/slices/userSlice';
import { IUser } from 'store/types/userTypes';
import UserCard from 'components/UserCard/UserCard';
import { UsersStat } from 'components/UsersStat/UsersStat';
import UserCardSkeleton from 'components/UserCardSkeleton/UserCardSkeleton';
import style from './style.module.scss';
const Users = () => {
  const users = useSelector(getUsers);
  const searchTerm = useSelector(getSearchTerm);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [filteredUsersLoading, setFilteredUsersLoading] = useState<boolean>(true);
  const ageGroups = useSelector(getAgeGroups);
  const gengerGroups = useSelector(getGengerGroups);
  const totalUsers = useSelector(getTotalUsers);
  const loading = useSelector(getLoading);

  const handleDeleteUser = (id: string) => {
    setFilteredUsers((prevItems) => prevItems.filter((p) => p.login.uuid !== id));
  };

  useEffect(() => {
    setFilteredUsersLoading(true);
    if (users.length > 0) {
      setFilteredUsers(filterUsers(users, searchTerm));
      setFilteredUsersLoading(false);
    }
  }, [users, searchTerm]);

  return (
    <div className={style.users_screen}>
      <div className={style.users_screen_wrapper}>
        <div className={style.user_cards}>
          {filteredUsersLoading ? (
            <UserCardSkeleton skeletonLength={20} />
          ) : (
            <>
              {filteredUsers.length > 0 ? (
                filteredUsers?.map((person) => (
                  <UserCard
                    {...person}
                    key={person.login.uuid}
                    onClick={() => {
                      handleDeleteUser(person.login.uuid);
                    }}
                  />
                ))
              ) : (
                <div className={style.users_not_found}>no data</div>
              )}
            </>
          )}
        </div>
      </div>

      <UsersStat ageGroups={ageGroups} gengerGroups={gengerGroups} loading={loading} totalUsers={totalUsers} />
    </div>
  );
};

export default Users;
