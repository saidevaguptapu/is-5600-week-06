import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(data.slice(0, limit));

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  const handlePagination = (direction) => {
    setOffset((prevOffset) => prevOffset + direction * limit);
  };

  const filterTags = (tagQuery) => {
    const filtered = tagQuery
      ? data.filter((product) => product.tags.some(({ title }) => title === tagQuery))
      : data;

    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination(-1)} disabled={offset === 0} />
        <Button text="Next" handleClick={() => handlePagination(1)} disabled={offset + limit >= data.length} />
      </div>
    </div>
  );
};

export default CardList;