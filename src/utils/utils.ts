import { IAgeGroupStats, IGenderGroupStats, IUser } from '../store/types/userTypes';

export const ageGroupStats = (users: IUser[]): IAgeGroupStats => {
  const ageGroups: IAgeGroupStats = {};

  const ageIntervals = [
    { min: 11, max: 20 },
    { min: 21, max: 30 },
    { min: 31, max: 40 },
    { min: 41, max: 50 },
    { min: 51, max: Infinity },
  ];

  ageIntervals.forEach((interval, index) => {
    const displayValue = index === ageIntervals.length - 1 ? '51 +' : `${interval.min} to ${interval.max}`;
    ageGroups[displayValue] = 0;
  });

  users.forEach((person) => {
    const age = person.dob.age;
    for (const interval of ageIntervals) {
      if (age >= interval.min && age <= interval.max) {
        const displayValue = interval.max === Infinity ? '51 +' : `${interval.min} to ${interval.max}`;
        ageGroups[displayValue]++;
        break;
      }
    }
  });

  return ageGroups;
};

export const genderGroupStats = (users: IUser[]): IGenderGroupStats => {
  const genderGroups: IGenderGroupStats = { male: 0, female: 0 };

  users.forEach((person) => {
    const gender = person.gender.toLowerCase();
    if (gender === 'male') {
      genderGroups['male']++;
    } else if (gender === 'female') {
      genderGroups['female']++;
    }
  });

  return genderGroups;
};

export const filterUsers = (users: IUser[] | [], term: string): IUser[] => {
  const lowerCaseSearchTerm = term.toLowerCase();

  if (users) {
    return users?.filter((person) => {
      return (
        person.name.first.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.name.last.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.location.city.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.location.country.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.location.state.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.dob.date.toLowerCase().includes(lowerCaseSearchTerm) ||
        person.phone
          .toLowerCase()
          .replace(/[\s()-]/g, '')
          .includes(lowerCaseSearchTerm.replace(/[\s()-]/g, ''))
      );
    });
  } else return [];
};
