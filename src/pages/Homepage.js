import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Search from "../components/Search";
import Pictures from "../components/Pictures";

const Homepage = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  let [data, setData] = useState([]);
  let [query, setQuery] = useState("");
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const initURL = "https://api.pexels.com/v1/curated";
  const searchURL = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;

  //管理所有圖片請求，除了更多圖片請求QQ
  const search = async (url) => {
    try {
      //如果沒有輸入url就用initURL
      console.log(url);
      if (!query) url = initURL;
      let result = await axios.get(url, {
        headers: {
          Authorization: API_KEY,
        },
      });
      //由於非同步操作原因，如果不先清空data，可能會出現舊的圖片資料
      setData([]);
      setData(result.data.photos);
      setPage(1);
      setCurrentSearch(query);
    } catch (error) {
      console.log(error.name + ": " + error.message);
    }
  };

  const morePicture = async () => {
    try {
      setPage(page + 1);
      let newURL;
      //如果有執行過搜尋，就使用過暫存的搜尋詞。
      if (currentSearch === "") {
        //由於closure的緣故，setPage(page+1)時，page的值仍為1，但確實有被更改。
        newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
          page + 1
        }`;
      } else {
        newURL = `https://api.pexels.com/v1/curated?per_page=15&page=${
          page + 1
        }`;
      }
      let result = await axios.get(newURL, {
        headers: {
          Authorization: API_KEY,
        },
      });
      //記得要加[]，不然他就不是陣列了QQ
      setData([...data, ...result.data.photos]);
    } catch (error) {
      console.log(error.name + ": " + error.message);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Search setQuery={setQuery} search={() => search(searchURL)} />
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
        <button type="button" onClick={morePicture}>
          more picture
        </button>
      </div>
    </div>
  );
};

export default Homepage;
