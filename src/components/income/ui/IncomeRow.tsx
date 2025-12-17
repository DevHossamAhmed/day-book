import { formatMoney } from "@/lib/utils/money.util";
import { Income } from "@/types/income";
import { useState } from "react";
import IncomeDetails from "../modals/IncomeDetails";

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
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {income.source}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">
                                {income.added_by_fullname} • {income.date}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatMoney(income.amount)}
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
