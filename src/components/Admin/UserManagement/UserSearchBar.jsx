import { useEffect, useState } from "react";
import TextInput from '../../inputs/TextInput';

function UserSearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        onSearch(searchInput);
    }, [searchInput, onSearch]);

    return (
        <div>
              <TextInput 
                type="text" 
                vl={searchInput} 
                chg={setSearchInput} 
                placeholder="Search users..."
                />
        </div>
    )
}

export default UserSearchBar;