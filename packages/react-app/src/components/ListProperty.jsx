import { Button, Input } from "antd";
import React, { useState } from "react";
import { postProperty } from "../api";


function ListProperty(props) {
  const [url, setUrl] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const create = async () => {
    setLoading(true);
    try {
      const res = await postProperty(name);
      setData(res.data);
    } catch (e) {
      console.error("error creating stream", e);
      alert(e.toString());
    }
    setLoading(false);
  };
  return (
    <div className="content">

    </div>
  );
}

export default ListProperty;
