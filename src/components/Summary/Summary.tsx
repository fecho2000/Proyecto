import "./_summary.scss";
import type { User, Plan } from "../../types";

type Props = {
  user: User;
  plan: Plan;
  onBack: () => void;
};

export default function Summary({ user, plan, onBack }: Props) {
  return (
    <section className="summary">
      <button className="summary__back" type="button" onClick={onBack}>
        <span className="summary__back-icon">◀</span>
        <span className="summary__back-text">Volver</span>
      </button>

      <h1 className="summary__title">Resumen del seguro</h1>

      <div className="summary__card">
        <p className="summary__label">Precios calculados para:</p>

        <div className="summary__user">
          <span className="summary__user-icon" aria-hidden>👤</span>
          <h2 className="summary__user-name">{user.name} {user.lastName}</h2>
        </div>

        <hr className="summary__divider" />

        <div className="summary__section">
          <p className="summary__section-title">Responsable de pago</p>
          <p className="summary__info"><span className="summary__info-label">DNI:</span> 444888888</p>
          <p className="summary__info"><span className="summary__info-label">Celular:</span> 5130216147</p>
        </div>

        <hr className="summary__divider" />

        <div className="summary__section">
          <p className="summary__section-title">Plan elegido</p>
          <p className="summary__plan-name">{plan.name}</p>
          <p className="summary__plan-price">Costo del Plan: S/ {Number(plan.price).toFixed(2)} al mes</p>
        </div>
      </div>
    </section>
  );
}