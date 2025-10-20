import "./_plans.scss";
import type { Plan } from "../../types";

type Props = {
  plans: Plan[];
  selectedOption?: string | null; // "me" | "other"
  userAge?: number | null;
  onSelectPlan?: (plan: Plan) => void;
};

export default function PlansList({ plans, selectedOption, userAge, onSelectPlan }: Props) {
  // Si selectedOption === "other", mostrar todos los planes con 5% off
  const isOther = selectedOption === "other";

  const displayPlans = plans
    .map((p) => {
      if (isOther) {
        // no mutamos el original: creamos una copia con precio con descuento
        return { ...p, price: Number((p.price * 0.95).toFixed(2)) };
      }
      return p;
    })
    .filter((p) => {
      if (!selectedOption) return false;
      if (isOther) return true; // todos los planes
      // opción "me": filtrar por edad
      if (userAge === null) return false;
      return userAge <= p.age;
    });

  if (!displayPlans || displayPlans.length === 0) {
    return <div className="plans">No hay planes disponibles.</div>;
  }

  return (
    <section className="plans" aria-label="Lista de planes">
      {displayPlans.map((p) => (
        <article
          key={p.name}
          className={`plans__item ${/* modifier when selected not needed, selection handled in App if required */ ""}`}
        >
          <div className="plans__header">
            <h3 className="plans__title">{p.name}</h3>
            <div className="plans__price">
              <span className="plans__currency">S/</span>
              <span className="plans__amount">{p.price} al mes</span>
            </div>
          </div>

          <ul className="plans__features">
            {p.description.map((desc, i) => (
              <li key={i} className="plans__feature">
                {desc}
              </li>
            ))}
          </ul>

          <div className="plans__footer">
            <button
              type="button"
              className="plans__button"
              onClick={() => onSelectPlan?.(p)}
            >
              Seleccionar plan
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}