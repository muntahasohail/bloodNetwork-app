import { useState } from "react";
import SearchDonor from "./SearchDonor";
import DonorCard from "./DonorCard";
import dbDonors from "../../../db.json";

const DEFAULT_FILTERS = { city: "", bloodGroup: "" };

export default function DonorList({ donors = [] }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);

  const allDonors = [
    ...dbDonors.donors,
    ...donors.filter((d) => !dbDonors.donors.find((s) => s.id === d.id)),
  ];

  const handleSearch = () => {
    const filtered = allDonors.filter((d) => {
      const cityMatch = !filters.city || d.city?.toLowerCase().includes(filters.city.toLowerCase());
      const bgMatch = !filters.bloodGroup || d.bloodGroup === filters.bloodGroup;
      return cityMatch && bgMatch && d.availability === true;
    });
    setResults(filtered);
    setSearched(true);
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    setSearched(false);
    setResults([]);
  };

  return (
    <div>
      <SearchDonor filters={filters} onChange={setFilters} onSearch={handleSearch} />

      {searched && (
        <>
          <div className="donor-results-meta">
            <span>{results.length} available donor{results.length !== 1 ? "s" : ""} found</span>
            <button className="clear-filters-btn" onClick={handleClear}>Clear</button>
          </div>

          {results.length === 0 ? (
            <div className="donor-empty">
              <p>🩸</p>
              <p>No available donors match your search.</p>
            </div>
          ) : (
            <div className="donor-grid">
              {results.map((donor, i) => <DonorCard key={donor.id || i} donor={donor} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
