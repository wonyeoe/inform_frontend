import React, { useState } from "react";
import SearchBar from "../../components/common/SearchBar";

const SearchBarPage = () => {
  const [text, setText] = useState("");

  return (
    <div className="p-8">
      <SearchBar
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default SearchBarPage;