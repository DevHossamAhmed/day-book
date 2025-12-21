import { formatMoney } from "@/lib/utils/money.util";
import { Expense } from "@/types/expense";
import { useState } from "react";
import ExpenseDetails from "../modals/ExpenseDetails";

type Props = {
    expense: Expense;
    onSave?: () => void;
};

export default function ExpenseRow({ expense, onSave }: Props) {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    
    return (
        <>
            <div
                key={expense.id}
                onClick={() => setIsDetailsOpen(true)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {expense.expense_type?.name || "Expense"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">
                                {expense.vendor?.name || "—"} • {expense.date}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatMoney(expense.amount)}
                </div>
            </div>
            <ExpenseDetails 
                expense={expense} 
                isOpen={isDetailsOpen} 
                onClose={() => setIsDetailsOpen(false)}
                onSave={onSave}
            />
        </>
    );
}
