import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "context/AppContext";
import AddExpenseForm from "components/Expense/AddExpenseForm";
import Budget from "components/Budget/Budget";
import Remaining from "components/Remaining";

test("verifies budget equation after operations", () => {
  render(
    <AppProvider>
      <Budget />
      <AddExpenseForm />
      <Remaining />
    </AppProvider>
  );

  const nameInput = screen.getByLabelText(/name/i);
  const costInput = screen.getByLabelText(/cost/i);
  const saveButton = screen.getByText(/save/i);

  fireEvent.change(nameInput, { target: { value: "Groceries" } });
  fireEvent.change(costInput, { target: { value: "200" } });
  fireEvent.click(saveButton);

  const budgetText = screen.getByText(/budget/i).textContent;
  const remainingText = screen.getByText(/remaining/i).textContent;
  const totalSpent = 200; // Added expense

  const budgetValue = 1000; 
  const remainingValue = remainingText ? parseInt(remainingText.replace(/\D/g, ""), 10) : 0;
  expect(budgetValue).toBe(remainingValue + totalSpent);
});
