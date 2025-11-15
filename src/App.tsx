import { useState, useEffect } from 'react'
import './App.css'

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
    songTitle: "Canción 1",
    composer: "Compositor A",
    backgroundImage: "./assets/back-1.jpeg",
    accentColor: "#FF6B35",
  },
  {
    id: 2,
    songTitle: "Canción 2",
    composer: "Compositor B",
    backgroundImage: "./assets/back-2.jpeg",
    accentColor: "#FFD23F",
  },
  {
    id: 3,
    songTitle: "Canción 3",
    composer: "Compositor C",
    backgroundImage: "./assets/back-3.jpeg",
    accentColor: "#B565D8",
  },
];

const FirstPage = () => (
  <div className="page first-page">
    <div className="first-page-content">
      <h1 className="neo-title">LUCAS DANGELIS</h1>
      <p className="neo-subtitle">Concierto de Guitarra</p>
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
}

const FormPage = ({ song, score, comment, onScoreChange, onCommentChange }: FormPageProps) => (
  <div className="page form-page" style={{ backgroundImage: `url(${song.backgroundImage})` }}>
    <div className="page-overlay"></div>
    <div className="page-content-top">
      {/* Space for composer picture */}
    </div>
    <div className="neo-form-container bottom">
      <div className="song-info">
        <h3 className="song-title">{song.songTitle}</h3>
        <p className="composer-name">{song.composer}</p>
      </div>
      <div className="form-fields">
        <div className="form-field">
          <label htmlFor={`score-${song.id}`}>Tu puntuación</label>
          <select
            id={`score-${song.id}`}
            className="neo-select"
            style={{ borderColor: song.accentColor }}
            value={score}
            onChange={(e) => onScoreChange(e.target.value)}
          >
            <option value="">Elegí del 1 al 10</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="form-field">
          <label htmlFor={`comment-${song.id}`}>Tu comentario</label>
          <textarea
            id={`comment-${song.id}`}
            className="neo-textarea"
            placeholder="Qué te pareció esta interpretación?"
            style={{ borderColor: song.accentColor }}
            rows={3}
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

interface LastPageProps {
  ratings: Record<number, { score: string; comment: string }>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const LastPage = ({ ratings, onSubmit, isSubmitting }: LastPageProps) => {
  const allRated = songs.every(song => ratings[song.id]?.score);
  
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
            opacity: allRated ? 1 : 0.5
          }}
          onClick={onSubmit}
          disabled={!allRated || isSubmitting}
        >
          <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR TODO"}</span>
        </button>
        
        {!allRated && (
          <p className="warning-message">Completá todas las puntuaciones primero</p>
        )}
        
        <div className="social-grid">
          <a href="https://instagram.com/lucasdangelis" className="neo-social-button" style={{ backgroundColor: "#E31B6D", borderColor: "#E31B6D" }}>
            <i className="fab fa-instagram"></i>
            <span>INSTAGRAM</span>
          </a>
          <a href="https://youtube.com/@lucasdangelis" className="neo-social-button" style={{ backgroundColor: "#FF6B35", borderColor: "#FF6B35" }}>
            <i className="fab fa-youtube"></i>
            <span>YOUTUBE</span>
          </a>
          <a href="https://open.spotify.com/artist/lucasdangelis" className="neo-social-button" style={{ backgroundColor: "#FFD23F", borderColor: "#FFD23F" }}>
            <i className="fab fa-spotify"></i>
            <span>SPOTIFY</span>
          </a>
          <a href="https://twitter.com/lucasdangelis" className="neo-social-button" style={{ backgroundColor: "#B565D8", borderColor: "#B565D8" }}>
            <i className="fab fa-twitter"></i>
            <span>TWITTER</span>
          </a>
        </div>
      </div>
      
      {/* Hidden form for FormSubmit */}
      <form
        id="rating-form"
        action="https://formsubmit.co/email@example.com"
        method="POST"
        style={{ display: "none" }}
      >
        <input type="hidden" name="_subject" value="Evaluaciones del Concierto de Lucas Dangelis" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="box" />
        {songs.map(song => (
          <div key={song.id}>
            <input type="hidden" name={`${song.songTitle} (${song.composer}) - Puntuación`} value={ratings[song.id]?.score || ""} />
            <input type="hidden" name={`${song.songTitle} (${song.composer}) - Comentario`} value={ratings[song.id]?.comment || "Sin comentario"} />
          </div>
        ))}
      </form>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [ratings, setRatings] = useState<Record<number, { score: string; comment: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPages = songs.length + 2; // First page + song pages + last page

  const updateRating = (songId: number, field: 'score' | 'comment', value: string) => {
    setRatings(prev => ({
      ...prev,
      [songId]: {
        score: field === 'score' ? value : prev[songId]?.score || '',
        comment: field === 'comment' ? value : prev[songId]?.comment || ''
      }
    }));
  };

  const handleSubmitAll = () => {
    setIsSubmitting(true);
    const form = document.getElementById('rating-form') as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe up - next page
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    }

    if (touchStart - touchEnd < -75) {
      // Swipe down - previous page
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

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

  return (
    <div
      className="app-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pages-wrapper" style={{ transform: `translateY(-${currentPage * 100}vh)` }}>
        <FirstPage />
        {songs.map((song) => (
          <FormPage
            key={song.id}
            song={song}
            score={ratings[song.id]?.score || ''}
            comment={ratings[song.id]?.comment || ''}
            onScoreChange={(score) => updateRating(song.id, 'score', score)}
            onCommentChange={(comment) => updateRating(song.id, 'comment', comment)}
          />
        ))}
        <LastPage ratings={ratings} onSubmit={handleSubmitAll} isSubmitting={isSubmitting} />
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

export default App
