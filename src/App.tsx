import { useState, useMemo } from "react";
import Header from "./components/Header/Header";
// import UserCard from "./components/UserCard/UserCard";
import PlansList from "./components/Plans/PlansList";
import QuoteSelector from "./components/QuoteSelector/QuoteSelector";
import { API } from "./api/api";
import { useFetch } from "./hooks/useFetch";
import type { User, PlansResponse, Plan } from "./types";
import "./assets/styles/main.scss";

function App() {
  const { data: userData, loading: loadingUser, error: userError } = useFetch<User>(API.user);
  const { data: plansData, loading: loadingPlans, error: plansError } = useFetch<PlansResponse>(API.plans);

  const [selectedOption, setSelectedOption] = useState<string | null>(null); // expected "me" | "other"
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // --- calcular edad del usuario (retorna number o null si no hay birthDay)
  const userAge = useMemo<number | null>(() => {
    if (!userData?.birthDay) return null;
    const [day, month, year] = userData.birthDay.split("-").map(Number);
    if (!day || !month || !year) return null;
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const isBeforeBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    if (isBeforeBirthday) age--;
    return age;
  }, [userData]);

  // --- obtener lista final de planes según la opción seleccionada
  // QuoteSelector usa "me" y "other" (ver src/components/QuoteSelector/QuoteSelector.tsx)
  const filteredPlans = useMemo<Plan[]>(() => {
    if (!plansData?.list) return [];

    // Opción "me": mostrar solo planes donde userAge <= plan.age
    if (selectedOption === "me") {
      if (userAge === null) return [];
      return plansData.list.filter((plan) => userAge <= plan.age);
    }

    // Opción "other": mostrar TODOS los planes con 5% de descuento en price
    if (selectedOption === "other") {
      return plansData.list.map((plan) => ({
        ...plan,
        price: Number((plan.price * 0.95).toFixed(2)), // precio con 5% OFF (sin mutar el original)
      }));
    }

    // Si no hay opción seleccionada, no mostrar nada
    return [];
  }, [plansData, selectedOption, userAge]);

  return (
    <>
      <Header />
      <main className="layout">
        <div className="container">
          <div className="row layout__grid">
            {/* Sidebar */}
            <div className="col-12 col-md-4 layout__sidebar">
              {loadingUser && <div className="layout__loading">Cargando usuario...</div>}
              {userError && <div className="layout__error">Error: {userError}</div>}
              {/* {userData && <UserCard user={userData} />} */}
            </div>

            {/* Contenido principal */}
            <div className="col-12 col-md-8 layout__content">
              {/* Selector de cotización (se muestra siempre si hay userData) */}
              {userData && (
                <QuoteSelector
                  userName={userData.name}
                  selectedOption={selectedOption}
                  onSelect={setSelectedOption}
                />
              )}

              {/* Mostrar planes solo si ya se eligió una opción */}
              {selectedOption && (
                <>
                  {loadingPlans && <div className="plans__loading">Cargando planes...</div>}
                  {plansError && <div className="plans__error">Error: {plansError}</div>}

                  {selectedPlan && (
                    <div className="plans__selected">Plan seleccionado: {selectedPlan}</div>
                  )}

                  {/* Pasamos filteredPlans (ya filtrados o con descuento) */}
                  {filteredPlans.length > 0 ? (
                    <PlansList
                      plans={filteredPlans}
                      selectedPlan={selectedPlan}
                      onSelect={setSelectedPlan}
                    />
                  ) : (
                    !loadingPlans && (
                      <div className="plans__empty" style={{ marginTop: "1rem" }}>
                        No hay planes disponibles para tu edad.
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;