import { formatMoney } from "@/lib/utils/money.util";
import { formatDate } from "@/lib/utils/date.util";
import { PlannedPayment } from "@/types/planned-payment";
import { useState } from "react";
import PlannedPaymentDetails from "../modals/PlannedPaymentDetails";

type Props = {
    payment: PlannedPayment;
    onSave?: () => void;
};

export default function PlannedPaymentRow({ payment, onSave }: Props) {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "text-green-600";
            case "overdue":
                return "text-red-600";
            default:
                return "text-orange-500";
        }
    };
    
    return (
        <>
            <div
                key={payment.id}
                onClick={() => setIsDetailsOpen(true)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {payment.purpose || "Planned Payment"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">
                                {payment.vendor_name || "Vendor"} • {payment.due_date ? formatDate(new Date(payment.due_date), "Do MMMM, YYYY") : ""}
                            </span>
                            <span className={`text-xs font-medium ${getStatusColor(payment.status)}`}>
                                • {payment.status}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                    {formatMoney(payment.amount)}
                </div>
            </div>
            <PlannedPaymentDetails 
                payment={payment} 
                isOpen={isDetailsOpen} 
                onClose={() => setIsDetailsOpen(false)}
                onSave={onSave}
            />
        </>
    );
}






