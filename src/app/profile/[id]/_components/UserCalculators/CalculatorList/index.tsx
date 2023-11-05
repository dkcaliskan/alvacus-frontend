// Api & Core imports
import React, { FunctionComponent } from 'react';
import CreatedCalculatorsList from './CreatedCalculators';
import UserSavedCalculatorList from './SavedCalculatorList';

// Types
type UserCalculatorListTypes = {
  selectedList: string;
  selectedSort: string;
};

const UserCalculatorList: FunctionComponent<UserCalculatorListTypes> = ({
  selectedList,
  selectedSort,
}) => {
  if (selectedList === 'saved') {
    return <UserSavedCalculatorList selectedSort={selectedSort} />;
  }

  return <CreatedCalculatorsList selectedSort={selectedSort} />;
};

export default UserCalculatorList;
