import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "context/AppContext";
import AddExpenseForm from "components/Expense/AddExpenseForm";
import Remaining from "components/Remaining";

test("adds a new expense and updates Remaining and Total Spent", () => {
  render(
    <AppProvider>
      <AddExpenseForm />
      <Remaining />
    </AppProvider>
  );

  const nameInput = screen.getByLabelText(/name/i);
  const costInput = screen.getByLabelText(/cost/i);
  const saveButton = screen.getByText(/save/i);

  fireEvent.change(nameInput, { target: { value: "Groceries" } });
  fireEvent.change(costInput, { target: { value: "100" } });
  fireEvent.click(saveButton);

  expect(screen.getByText("Groceries")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();
  expect(screen.getByText(/remaining/i).textContent).toContain("$900");
});
