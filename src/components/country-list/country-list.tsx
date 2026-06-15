import { useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';
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

const CARD_BASE_HEIGHT = 140;
const TABLE_ROW_HEIGHT = 38;

type CountryRowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const CountryRow = ({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<CountryRowProps>) => (
  <div style={style}>
    <CountryCard
      country={countries[index]}
      selectedYear={selectedYear}
      selectedColumns={selectedColumns}
    />
  </div>
);

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

  const rowHeight = CARD_BASE_HEIGHT + selectedColumns.length * TABLE_ROW_HEIGHT;

  return (
    <div className={styles.countryList}>
      <List
        style={{ height: '75vh', width: '100%' }}
        rowCount={filteredCountries.length}
        rowHeight={rowHeight}
        rowComponent={CountryRow}
        rowProps={{ countries: filteredCountries, selectedYear, selectedColumns }}
      />
    </div>
  );
};
