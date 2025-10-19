import "./_quote-selector.scss";

type Props = {
  userName: string;
  selectedOption?: string | null;
  onSelect: (option: "me" | "other") => void;
};

export default function QuoteSelector({ userName, selectedOption, onSelect }: Props) {
  return (
    <section className="quote-selector">
      <h2 className="quote-selector__title">
        {userName}, ¿Para quién deseas cotizar?
      </h2>
      <p className="quote-selector__subtitle">
        Selecciona la opción que se ajuste más a tus necesidades.
      </p>

      <div className="quote-selector__options">
        <div
          className={`quote-card ${
            selectedOption === "me" ? "quote-card--active" : ""
          }`}
          onClick={() => onSelect("me")}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => e.key === "Enter" && onSelect("me")}
        >
          <div className="quote-card__icon">👤</div>
          <h3 className="quote-card__title">Para mí</h3>
          <p className="quote-card__text">
            Cotiza tu seguro de salud y agrega familiares si así lo deseas.
          </p>
        </div>

        <div
          className={`quote-card ${
            selectedOption === "other" ? "quote-card--active" : ""
          }`}
          onClick={() => onSelect("other")}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => e.key === "Enter" && onSelect("other")}
        >
          <div className="quote-card__icon">➕</div>
          <h3 className="quote-card__title">Para alguien más</h3>
          <p className="quote-card__text">
            Realiza una cotización para uno de tus familiares o cualquier persona.
          </p>
        </div>
      </div>
    </section>
  );
}