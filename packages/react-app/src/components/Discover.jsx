import React, { useState, useEffect } from "react";
import { DEMO_PROPERTIES } from "../util";
import PropertyCard from "./PropertyCard";

function Discover({ setProperty, history }) {
  const [properties, setProperties] = useState();

  useEffect(() => {
    setProperties(DEMO_PROPERTIES);
  }, []);
  
  return (
    <div>
      {properties?.map((p, i) => {
        return (
          <span
            key={i}
            onClick={() => {
              setProperty(p);
              history.push(`/property/${p.id}`);
            }}
          >
            <PropertyCard {...p} />
          </span>
        );
      })}
    </div>
  );
}

export default Discover;
