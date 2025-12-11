import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import type { RootState } from "../../store";
import { setSearchQuery } from "../../store/contactsSlice";
import searchIcon from "../../assets/searchIcon.png";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.contacts.searchQuery
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(event.target.value));
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by Name, Contact, Email, State..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <img src={searchIcon} alt="search icon" className="search-icon" />
    </div>
  );
}
