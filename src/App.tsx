import { useState, useEffect } from "react";
import "./App.css";

// Add splash image import (you'll need to add this image to your assets)
import splashImage from "./assets/lucas.jpg";

import l1 from "./assets/l1.jpg";
import l2 from "./assets/l2.jpg";
import l3 from "./assets/l3.jpg";
import l4 from "./assets/l4.jpg";
import l5 from "./assets/l5.jpg";
import l6 from "./assets/l6.jpg";
import l7 from "./assets/l7.jpg";

interface SongData {
  id: number;
  songTitle: string;
  composer: string;
  backgroundImage: string;
  accentColor: string;
}

const songs: SongData[] = [
  {
    id: 1,
    songTitle: "Suite para laúd n°2 (preludio)",
    composer: "J. S. Bach",
    backgroundImage: l1,
    accentColor: "#FF6B35",
  },
  {
    id: 2,
    songTitle: "Caprice n°24",
    composer: "N. Paganini (arr. John Williams)",
    backgroundImage: l2,
    accentColor: "#FFD23F",
  },
  {
    id: 3,
    songTitle: "Sonata Clásica (Allegro)",
    composer: "M. M. Ponce",
    backgroundImage: l3,
    accentColor: "#B565D8",
  },
  {
    id: 4,
    songTitle:
      "La Catedral (tres movimientos: Lento, Andante Religioso, Allegro solemne)",
    composer: "A. Barrios Mangore",
    backgroundImage: l4,
    accentColor: "#FF6B35",
  },
  {
    id: 5,
    songTitle: "Fuoco (3er movimiento)",
    composer: "R. Dyens",
    backgroundImage: l5,
    accentColor: "#FFD23F",
  },
  {
    id: 6,
    songTitle: "Romántico (Moderato ad libitum)",
    composer: "A. Piazzolla",
    backgroundImage: l6,
    accentColor: "#B565D8",
  },
  {
    id: 7,
    songTitle: "Concierto de Aranjuez",
    composer: "J. Rodrigo",
    backgroundImage: l7,
    accentColor: "#FF6B35",
  },
];

interface FirstPageProps {
  onStart: () => void;
}

const FirstPage = ({ onStart }: FirstPageProps) => (
  <div className="page first-page" onClick={onStart}>
    <div className="first-page-content">
      <h1 className="neo-title">LUCAS DANGELIS</h1>
      <p className="neo-subtitle">Concierto de Guitarra</p>
      <button
        className="start-button"
        onClick={(e) => {
          e.stopPropagation();
          onStart();
        }}
        style={{
          backgroundColor: "#FF6B35",
          color: "#000",
          border: "none",
          padding: "12px 32px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          fontFamily: '"Courier New", monospace',
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "2rem",
          boxShadow: "4px 4px 0 #000",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "6px 6px 0 #000";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "4px 4px 0 #000";
        }}
      >
        EMPEZAR
      </button>
      <div className="swipe-indicator">
        <span>↓</span>
        <p>Evaluá cada interpretación</p>
      </div>
    </div>
  </div>
);

interface FormPageProps {
  song: SongData;
  score: string;
  comment: string;
  onScoreChange: (score: string) => void;
  onCommentChange: (comment: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const FormPage = ({
  song,
  score,
  comment,
  onScoreChange,
  onCommentChange,
  onNext,
  onBack,
}: FormPageProps) => {
  return (
    <div
      className="page form-page"
      style={{ backgroundImage: `url(${song.backgroundImage})` }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "rgba(0, 0, 0, 0.7)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 20,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div className="page-overlay"></div>
      <div className="page-content-top">{/* Space for composer picture */}</div>
      <div className="neo-form-container bottom">
        <div className="song-info">
          <h3 className="song-title">{song.songTitle}</h3>
          <p className="composer-name">{song.composer}</p>
        </div>
        <div className="form-fields">
          <div className="form-field">
            <label>Tu puntuación</label>
            <div
              className="score-buttons"
              style={{
                display: "flex",
                gap: "4px",
                flexWrap: "wrap",
                marginTop: "8px",
              }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onScoreChange(num.toString());
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
                  style={{
                    flex: "1 0 calc(10% - 4px)",
                    minWidth: "24px",
                    height: "32px",
                    borderRadius: "4px",
                    border: `1px solid ${song.accentColor}`,
                    background:
                      score === num.toString()
                        ? song.accentColor
                        : "transparent",
                    color: score === num.toString() ? "#000" : "#fff",
                    fontFamily: '"Courier New", monospace',
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor={`comment-${song.id}`}>Tu comentario</label>
            <textarea
              id={`comment-${song.id}`}
              className="neo-textarea"
              placeholder="Qué te pareció esta interpretación?"
              style={{
                borderColor: song.accentColor,
              }}
              rows={3}
              value={comment}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onChange={(e) => onCommentChange(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: song.accentColor,
              color: "#000",
              border: "none",
              borderRadius: "4px",
              fontFamily: '"Courier New", monospace',
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginTop: "8px",
            }}
            onTouchStart={(e) => e.stopPropagation()}
          >
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
};

interface LastPageProps {
  ratings: Record<number, { score: string; comment: string }>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const LastPage = ({ ratings, onSubmit, isSubmitting }: LastPageProps) => {
  const allRated = songs.every((song) => ratings[song.id]?.score);

  return (
    <div className="page last-page">
      <div className="last-page-content">
        <h2 className="neo-title-small">LISTO!</h2>
        <p className="thanks-message">Enviá todas tus evaluaciones</p>

        <button
          className="neo-button submit-all"
          style={{
            backgroundColor: allRated ? "#FF6B35" : "#666",
            borderColor: allRated ? "#FF6B35" : "#666",
            cursor: allRated ? "pointer" : "not-allowed",
            opacity: allRated ? 1 : 0.5,
          }}
          onClick={onSubmit}
          disabled={!allRated || isSubmitting}
        >
          <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR TODO"}</span>
        </button>

        {!allRated && (
          <p className="warning-message">
            Completá todas las puntuaciones primero
          </p>
        )}

        <div className="social-grid">
          <a
            href="https://www.instagram.com/lucasmdangelis/"
            className="neo-social-button"
            style={{ backgroundColor: "#E31B6D", borderColor: "#E31B6D" }}
          >
            <i className="fab fa-instagram"></i>
            <span>INSTAGRAM</span>
          </a>
          <a
            href="https://www.youtube.com/channel/UCTK1H_ri7HJD9gCDlkB8OfQ/videos"
            className="neo-social-button"
            style={{ backgroundColor: "#FF6B35", borderColor: "#FF6B35" }}
          >
            <i className="fab fa-youtube"></i>
            <span>YOUTUBE</span>
          </a>
          <a
            href="https://open.spotify.com/artist/2rQzyDggOzP9SCyfzCAARr"
            className="neo-social-button"
            style={{ backgroundColor: "#FFD23F", borderColor: "#FFD23F" }}
          >
            <i className="fab fa-spotify"></i>
            <span>SPOTIFY</span>
          </a>
          <a
            href="https://soundcloud.com/lucas-dangelis"
            className="neo-social-button"
            style={{ backgroundColor: "#B565D8", borderColor: "#B565D8" }}
          >
            <i className="fab fa-soundcloud"></i>
            <span>SOUNDCLOUD</span>
          </a>
        </div>
      </div>

      {/* Hidden form for FormSubmit */}
      <form
        id="rating-form"
        action="https://formsubmit.co/luciernaga115@hotmail.com"
        method="POST"
        style={{ display: "none" }}
      >
        <input
          type="hidden"
          name="_subject"
          value="Evaluaciones del Concierto de Lucas Dangelis"
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="box" />
        {songs.map((song) => (
          <div key={song.id}>
            <input
              type="hidden"
              name={`${song.songTitle} (${song.composer}) - Puntuación`}
              value={ratings[song.id]?.score || ""}
            />
            <input
              type="hidden"
              name={`${song.songTitle} (${song.composer}) - Comentario`}
              value={ratings[song.id]?.comment || "Sin comentario"}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

// SplashScreen Component
const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <img
        src={splashImage}
        alt="Lucas D'Angelis Guitar Concert"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [ratings, setRatings] = useState<
    Record<number, { score: string; comment: string }>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPages = songs.length + 2; // First page + song pages + last page

  const updateRating = (
    songId: number,
    field: "score" | "comment",
    value: string
  ) => {
    setRatings((prev) => ({
      ...prev,
      [songId]: {
        score: field === "score" ? value : prev[songId]?.score || "",
        comment: field === "comment" ? value : prev[songId]?.comment || "",
      },
    }));
  };

  const handleSubmitAll = () => {
    setIsSubmitting(true);
    const form = document.getElementById("rating-form") as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  // Touch handlers removed as swipe navigation is disabled

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === "ArrowUp") {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  // Show splash screen if showSplash is true
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="app-container">
      <div
        className="pages-wrapper"
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}
      >
        <FirstPage onStart={() => setCurrentPage(1)} />
        {songs.map((song) => (
          <FormPage
            key={song.id}
            song={song}
            score={ratings[song.id]?.score || ""}
            comment={ratings[song.id]?.comment || ""}
            onScoreChange={(score) => updateRating(song.id, "score", score)}
            onCommentChange={(comment) =>
              updateRating(song.id, "comment", comment)
            }
            onNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            onBack={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          />
        ))}
        <LastPage
          ratings={ratings}
          onSubmit={handleSubmitAll}
          isSubmitting={isSubmitting}
        />
      </div>

      <div className="page-indicators">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentPage === index ? "active" : ""}`}
            onClick={() => setCurrentPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
