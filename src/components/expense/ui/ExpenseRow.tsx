import { formatMoney } from "@/lib/utils/money.util";
import { formatDate } from "@/lib/utils/date.util";
import { Expense } from "@/types/expense";
import { useState } from "react";
import ExpenseDetails from "../modals/ExpenseDetails";
import { ChevronRight } from "lucide-react";

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
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {expense.expense_type?.name || expense.vendor?.name || "Expense"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            {expense.vendor?.name && (
                                <span className="text-gray-600">
                                    {expense.vendor.name}
                                </span>
                            )}
                            <span className="text-gray-600">
                                {formatDate(new Date(expense.date), "MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {expense.payment_method && (
                        <span className="text-sm font-medium text-gray-600">
                            {expense.payment_method}
                        </span>
                    )}
                    <div className="text-xl font-bold text-gray-900">
                        {formatMoney(Number(expense.amount))}
                    </div>
                    <ChevronRight size={20} className="text-gray-400 ml-2" />
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
