// src/utils/loadOptions.ts
import { State, City, IState, ICity } from 'country-state-city';
interface Option {
    value: string;
    label: string;
  }
const INDIA_COUNTRY_CODE = 'IN';

export const getIndianStates = (): Option[] => {
    const states = State.getStatesOfCountry(INDIA_COUNTRY_CODE);
    const transformedOptions = states.map((state) => ({
        value: `${state.isoCode}`,
        label: `${state.name}`,
      }));
  return transformedOptions;
};

export const getCitiesByState = (stateCode: string): Option[] => {
  if (!stateCode) return [];
  const cities = City.getCitiesOfState(INDIA_COUNTRY_CODE, stateCode);
    const transformedOptions = cities.map((city) => ({
        value: `${city.name}`,
        label: `${city.name}`,
      }));
  return transformedOptions;
};