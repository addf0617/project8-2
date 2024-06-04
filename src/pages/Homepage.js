import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Search from "../components/Search";
import Pictures from "../components/Pictures";

const Homepage = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const initURL = "https://api.pexels.com/v1/curated";
  let [data, setData] = useState([]);

  //管理所有圖片請求
  const search = async () => {
    let result = await axios.get(initURL, {
      headers: {
        Authorization: API_KEY,
      },
    });
    setData(result.data.photos);
  };
  // 測試用console.log(data);

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Search />
      <main>
        <div className="pictures">
          {data.map((item) => (
            <Pictures
              key={item.id}
              photographer={item.photographer}
              src={item.src}
              alt={item.alt}
            />
          ))}
        </div>
      </main>
      <div className="morePicture">
        <button type="button">more picture</button>
      </div>
    </div>
  );
};

export default Homepage;
