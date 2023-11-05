'use client';

// Api & Core imports
import { useEffect, useState } from 'react';

// Types
type UnitsOptionTypes = {
  value: string;
  label: string;
  category: string;
};

const useUnitsFilter = (
  allUnits: UnitsOptionTypes[],
  baseUnit: UnitsOptionTypes
) => {
  const [filteredUnits, setFilteredUnits] =
    useState<UnitsOptionTypes[]>(allUnits);

  useEffect(() => {
    // If no base unit is selected, return all units
    if (!baseUnit.category) {
      setFilteredUnits(allUnits);
      return;
    }

    // Filter units by category and return filtered units
    const filteredOptions = allUnits
      .filter(
        (option) =>
          option.category.includes(baseUnit.category) &&
          option.value !== baseUnit.value
      )
      .sort();
    setFilteredUnits(filteredOptions);

    //! Disabled eslint rule because we want to run this effect only when baseUnit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUnit]);

  return filteredUnits;
};

export default useUnitsFilter;
