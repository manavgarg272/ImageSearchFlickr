import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fragment } from "react";
import "./images.css";
import history from "./history";

function ImagesRecommended() {
  // e.preventDefault();

  const [Images, setImages] = useState([]);
  const [inputText, setinputText] = useState("");
  const getImages = async (e) => {
    const response = await fetch(
      "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=dd827c3760347fb602ec6d5c79882d75&format=json&nojsoncallback=1"
    );
    const data = await response.json();
    setImages(data.photos.photo);
  };

  const inputEvent = async (e) => {
    await setinputText(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd827c3760347fb602ec6d5c79882d75&text=${inputText}&format=json&nojsoncallback=1`;
      await axios.get(url).then((response) => {
        setImages(response.data.photos.photo);
      });
    } catch {
      history.push("/");
    }
  };

  useEffect((e) => {
    getImages(e);
  }, []);

  return (
    <Fragment>
      <div className="ImagesRecommended">
        <div className="header">
          <p>ImageSearch</p>
          <input
            type="text"
            className="inputBar"
            onChange={inputEvent}
            placeholder="Search Images"
          />
          <button onClick={onSubmit} className="Button">
            Search
          </button>
        </div>

        <div className="showimages">
          {Images.map((i, key) => {
            console.log(i);
            return (
              <img
                key={key}
                src={
                  "https://farm" +
                  i.farm +
                  ".staticflickr.com/" +
                  i.server +
                  "/" +
                  i.id +
                  "_" +
                  i.secret +
                  ".jpg"
                }
                alt=""
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
export default ImagesRecommended;
