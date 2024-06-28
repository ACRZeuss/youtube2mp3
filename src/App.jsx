import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    e.preventDefault();

    const options = {
      method: "get",
      url: "https://youtube-mp3-download1.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";

    document.getElementById(
      "video_embed"
    ).src = `https://youtube.com/embed/${youtubeID}`;
  };

  return (
    <div className="app">
      <span className="logo">
        youtube2mp3 by 
        <a
          href="https://erhanpolat.net"
          style={{ textDecoration: "none", color: "white" }}
        >
          erhan polat
        </a>
      </span>

      <section className="content">
        <h1 className="content_title">YouTube'tan MP3'e Dönüştürücü</h1>

        <h2 className="content_description">
          Saniyeler içinde YouTube videolarını ses dosyasına dönüştür!
        </h2>

        <p>
          Video olarak mı lazım? 
          <a style={{color: "yellow"}} href="https://yt2mp4.erhanpolat.net"> Video İndirme servisini</a>{" "}
          kullanabilirsiniz.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="Video linkini yapıştır..."
            className="form_input"
            type="text"
          />

          <button type="submit" className="form_button">
            Dönüştür
          </button>
        </form>

        <iframe
          id="video_embed"
          width="600"
          height="400"
          src=""
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          style={{ marginBottom: "50px" }}
        ></iframe>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="btn btn-success"
            style={{ marginBottom: "50px", width: "590px" }}
          >
            MP3 indir
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
