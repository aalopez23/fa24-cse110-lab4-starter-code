import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
  const remainingBalance = budget - totalExpenses;

  useEffect(() => {
    if (remainingBalance < 0) {
      alert("You've exceeded your budget!");
    }
  }, [remainingBalance]);

  // Exercise: Create an alert when Remaining is less than 0.

  return (
    <div className={`alert ${remainingBalance < 0 ? "alert-danger" : "alert-success"}`}>
      <span>Remaining: ${remainingBalance}</span>
    </div>
  );
};

export default Remaining;
