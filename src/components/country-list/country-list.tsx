import { useMemo } from 'react';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = countries.filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(query);
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    });

    if (sortField === 'name') {
      return [...filtered].sort((a, b) =>
        sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      );
    }

    return filtered
      .map((country) => ({
        country,
        population: country.data.find((d) => d.year === selectedYear)?.population ?? 0,
      }))
      .sort((a, b) =>
        sortOrder === 'asc' ? a.population - b.population : b.population - a.population
      )
      .map((entry) => entry.country);
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  return (
    <div className={styles.countryList}>
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
};
