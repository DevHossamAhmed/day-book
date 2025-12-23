import { formatMoney } from "@/lib/utils/money.util";
import { Income } from "@/types/income";
import { useState } from "react";
import IncomeDetails from "../modals/IncomeDetails";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils/date.util";

type Props = {
    income: Income;
    onSave?: () => void;
};

export default function IncomeRow({ income, onSave }: Props) {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    
    return (
        <>
            <div
                key={income.id}
                onClick={() => setIsDetailsOpen(true)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {income.source || income.sales_person_fullname || "Income"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            {income.source && (
                                <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                                    {income.source}
                                </span>
                            )}
                            {income.sales_person_fullname && (
                                <span className="text-gray-600">
                                    {income.sales_person_fullname}
                                </span>
                            )}
                            <span className="text-gray-600">
                                {formatDate(new Date(income.date), "MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {income.payment_method && (
                        <span className="text-sm font-medium text-gray-600">
                            {income.payment_method}
                        </span>
                    )}
                    <div className="text-xl font-bold text-gray-900">
                        {formatMoney(income.amount)}
                    </div>
                    <ChevronRight size={20} className="text-gray-400 ml-2" />
                </div>
            </div>
            <IncomeDetails 
                income={income} 
                isOpen={isDetailsOpen} 
                onClose={() => setIsDetailsOpen(false)}
                onSave={onSave}
            />
        </>
    );
}
