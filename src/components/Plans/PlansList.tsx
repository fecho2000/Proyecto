import "./_plans.scss";
import type { Plan } from "../../types";

type Props = {
  plans: Plan[];
  selectedPlan?: string | null;
  onSelect?: (planName: string) => void;
};

export default function PlansList({ plans, selectedPlan, onSelect }: Props) {
  if (!plans || plans.length === 0) {
    return <div className="plans">No hay planes disponibles.</div>;
  }

  return (
    <section className="plans" aria-label="Lista de planes">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`plans__item ${selectedPlan === p.name ? "plans__item--selected" : ""}`}
        >
          <div className="plans__header">
            <h3 className="plans__title">{p.name}</h3>
            <div className="plans__price">
              <span className="plans__currency">$</span>
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
              onClick={() => onSelect?.(p.name)}
            >
              Seleccionar Plan
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}