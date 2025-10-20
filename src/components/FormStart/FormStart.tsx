import { useState } from "react";
import type { FormData } from "../../types";
import "./_form-start.scss";

type Props = {
  onNext: (data: FormData) => void;
  initial?: Partial<FormData>;
};

export default function FormStart({ onNext, initial = {} }: Props) {
  const [tipoDocumento, setTipoDocumento] = useState(initial.tipoDocumento ?? "DNI");
  const [numeroDocumento, setNumeroDocumento] = useState(initial.numeroDocumento ?? "");
  const [numeroCelular, setNumeroCelular] = useState(initial.numeroCelular ?? "");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "tipoDocumento":
        return value ? "" : "Selecciona un tipo de documento";
      case "numeroDocumento":
        if (!/^\d+$/.test(value)) return "Solo se permiten números";
        if (value.length < 8) return "Debe tener al menos 8 dígitos";
        return "";
      case "numeroCelular":
        if (!/^\d+$/.test(value)) return "Solo se permiten números";
        if (value.length < 9) return "Debe tener 9 dígitos";
        return "";
      default:
        return "";
    }
  };

  const validateAll = (): boolean => {
    const newErrors: { [k: string]: string } = {};
    const docErr = validateField("numeroDocumento", numeroDocumento);
    const celErr = validateField("numeroCelular", numeroCelular);
    const tipoErr = validateField("tipoDocumento", tipoDocumento);

    if (docErr) newErrors.numeroDocumento = docErr;
    if (celErr) newErrors.numeroCelular = celErr;
    if (tipoErr) newErrors.tipoDocumento = tipoErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    onNext({ tipoDocumento, numeroDocumento, numeroCelular });
  };

  // validación inline + solo números
  const handleNumberInput = (field: "numeroDocumento" | "numeroCelular", value: string) => {
    // Solo permitir dígitos
    if (!/^\d*$/.test(value)) return;

    if (field === "numeroDocumento") setNumeroDocumento(value);
    else setNumeroCelular(value);

    // Validación en tiempo real
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <section className="form-start" aria-label="Formulario de cotización">
      <div className="form-start__inner container">
        <div className="form-start__media" role="img" aria-label="Imagen familia">
          <div className="form-start__image" />
        </div>

        <div className="form-start__panel">
          <span className="form-start__badge">Seguro Salud Flexible</span>

          <h1 className="form-start__title">Creado para ti y tu familia</h1>
          <p className="form-start__lead">
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
          </p>

          <form className="form-start__form" onSubmit={handleSubmit} noValidate>
            {/* Tipo de documento */}
            <div className="form-start__row">
              <label className="form-start__label" htmlFor="tipoDocumento">Tipo de documento</label>
              <select
                id="tipoDocumento"
                className={`form-start__select ${errors.tipoDocumento ? "form-start__input--error" : ""}`}
                value={tipoDocumento}
                onChange={(e) => {
                  setTipoDocumento(e.target.value);
                  const err = validateField("tipoDocumento", e.target.value);
                  setErrors((prev) => ({ ...prev, tipoDocumento: err }));
                }}
              >
                <option value="DNI">DNI</option>
                <option value="CE">Carnet Extranjería</option>
                <option value="PAS">Pasaporte</option>
              </select>
              {errors.tipoDocumento && <div className="form-start__error">{errors.tipoDocumento}</div>}
            </div>

            {/* Número de documento */}
            <div className="form-start__row">
              <label className="form-start__label" htmlFor="numeroDocumento">Nro. de documento</label>
              <input
                id="numeroDocumento"
                className={`form-start__input ${errors.numeroDocumento ? "form-start__input--error" : ""}`}
                value={numeroDocumento}
                onChange={(e) => handleNumberInput("numeroDocumento", e.target.value)}
                inputMode="numeric"
                placeholder=""
                maxLength={12}
              />
              {errors.numeroDocumento && <div className="form-start__error">{errors.numeroDocumento}</div>}
            </div>

            {/* Celular */}
            <div className="form-start__row">
              <label className="form-start__label" htmlFor="numeroCelular">Celular</label>
              <input
                id="numeroCelular"
                type="tel"
                className={`form-start__input ${errors.numeroCelular ? "form-start__input--error" : ""}`}
                value={numeroCelular}
                onChange={(e) => handleNumberInput("numeroCelular", e.target.value)}
                inputMode="numeric"
                placeholder=""
                maxLength={9}
              />
              {errors.numeroCelular && <div className="form-start__error">{errors.numeroCelular}</div>}
            </div>

            <div className="form-start__agreements">
              <label className="form-start__checkbox">
                <input type="checkbox" defaultChecked />
                <span>Acepto la Política de Privacidad</span>
              </label>

              <label className="form-start__checkbox">
                <input type="checkbox" defaultChecked />
                <span>Acepto la Política Comunicaciones Comerciales</span>
              </label>

              <a className="form-start__terms" href="#" onClick={(e) => e.preventDefault()}>
                Aplican Términos y Condiciones.
              </a>
            </div>

            <div className="form-start__actions">
              <button className="form-start__cta" type="submit">Cotiza aquí</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
