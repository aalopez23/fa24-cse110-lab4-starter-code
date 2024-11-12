import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "context/AppContext";
import ExpenseItem from "components/Expense/ExpenseItem";
import Remaining from "components/Remaining";

test("removes an expense and updates Remaining and Total Spent", () => {
  render(
    <AppProvider>
      <ExpenseItem id="1" description="Groceries" cost={100} />
      <Remaining />
    </AppProvider>
  );

  expect(screen.getByText("Groceries")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();

  const deleteButton = screen.getByText("x");
  fireEvent.click(deleteButton);

  expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
  expect(screen.getByText(/remaining/i).textContent).toContain("$1000");
});
