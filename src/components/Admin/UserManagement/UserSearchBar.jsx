import { useEffect, useState } from "react";
import TextInput from "../../inputs/TextInput";

function UserSearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    onSearch(searchInput);
  }, [searchInput, onSearch]);

  return (
    <div className="input-group mb-3">
      <TextInput
        type="text"
        vl={searchInput}
        chg={setSearchInput}
        placeholder="Search users..."
        className="form-control"
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onSearch(searchInput)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default UserSearchBar;
