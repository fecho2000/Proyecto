import { useState } from "react";
import Header from "./components/Header/Header";
import UserCard from "./components/UserCard/UserCard";
import PlansList from "./components/Plans/PlansList";
import { API } from "./api/api";
import { useFetch } from "./hooks/useFetch";
import type { User, PlansResponse } from "./types";
import "./assets/styles/main.scss";

function App() {
  const { data: userData, loading: loadingUser, error: userError } = useFetch<User>(API.user);
  const { data: plansData, loading: loadingPlans, error: plansError } = useFetch<PlansResponse>(API.plans);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="layout">
        <div className="container">
          <div className="row layout__grid">
            <div className="col-12 col-md-4 layout__sidebar">
              {loadingUser && <div>Cargando usuario...</div>}
              {userError && <div>Error: {userError}</div>}
              {userData && <UserCard user={userData} />}
            </div>

            <div className="col-12 col-md-8 layout__content">
              {loadingPlans && <div>Cargando planes...</div>}
              {plansError && <div>Error: {plansError}</div>}
              {selectedPlan && (
                <div className="plans__selected">Plan seleccionado: {selectedPlan}</div>
              )}
              {plansData && (
                <PlansList
                  plans={plansData.list}
                  selectedPlan={selectedPlan}
                  onSelect={setSelectedPlan}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;