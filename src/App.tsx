import { useState, useMemo } from "react";
import Header from "./components/Header/Header";
import PlansList from "./components/Plans/PlansList";
import QuoteSelector from "./components/QuoteSelector/QuoteSelector";
import Summary from "./components/Summary/Summary";
import FormStart from "./components/FormStart/FormStart";
import { API } from "./api/api";
import { useFetch } from "./hooks/useFetch";
import type { User, PlansResponse, Plan, FormData } from "./types";
import "./assets/styles/main.scss";

function App() {
  const { data: userData, loading: loadingUser, error: userError } = useFetch<User>(API.user);
  const { data: plansData, loading: loadingPlans, error: plansError } = useFetch<PlansResponse>(API.plans);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<"form" | "plans" | "summary">("form");

  const [formData, setFormData] = useState<FormData | null>(null);

  const userAge = useMemo<number | null>(() => {
    if (!userData?.birthDay) return null;
    const [day, month, year] = userData.birthDay.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    )
      age--;
    return age;
  }, [userData]);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep("summary");
  };

  const handleBackToPlans = () => {
    setStep("plans");
    setSelectedPlan(null);
  };

  const handleFormNext = (data: FormData) => {
    setFormData(data);
    setStep("plans");
  };

  return (
    <>
      <Header />
      <main className="layout">
        <div className="container">
          {step === "form" && (
            <FormStart onNext={handleFormNext} initial={formData ?? undefined} />
          )}

          {step !== "form" && (
            <div className="row layout__grid">
              <div className="col-12 col-md-4 layout__sidebar">
                {loadingUser && <div className="layout__loading">Cargando usuario...</div>}
                {userError && <div className="layout__error">Error: {userError}</div>}                
              </div>

              <div className="col-12 col-md-8 layout__content">
                {step === "plans" && (
                  <>
                    {userData && (
                      <QuoteSelector
                        userName={userData.name}
                        selectedOption={selectedOption}
                        onSelect={setSelectedOption}
                      />
                    )}

                    {selectedOption && (
                      <>
                        {loadingPlans && <div className="plans__loading">Cargando planes...</div>}
                        {plansError && <div className="plans__error">Error: {plansError}</div>}
                        {plansData && (
                          <PlansList
                            plans={plansData.list}
                            selectedOption={selectedOption}
                            userAge={userAge}
                            onSelectPlan={handlePlanSelect}
                          />
                        )}
                      </>
                    )}
                  </>
                )}

                {step === "summary" && userData && selectedPlan && (
                  /* <-- aquí PASAMOS formData al Summary (cambio mínimo) */
                  <Summary user={userData} plan={selectedPlan} formData={formData} onBack={handleBackToPlans} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
