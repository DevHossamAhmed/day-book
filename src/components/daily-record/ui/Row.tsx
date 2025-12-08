import EntryDetails from "@/components/daily-record/modals/EntryDetails"
import { FormatMoney } from "@/lib/utils/money.util";
import { CapitalizeFirst } from "@/lib/utils/string.util";
import { Balance } from "@/types/balance"
import { useState } from "react";

export default function Row({ balance }: {
    balance: Balance
}) {
    const [isEntryDetailsOpen, setIsEntryDetailsOpen] = useState<boolean>(false);
    return (
        <>
            <div
                key={balance.id}
                onClick={() => setIsEntryDetailsOpen(true)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                            {balance.source}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className={`px-2 py-0.5 rounded font-medium ${balance.type === "Added"
                                    ? ""
                                    : "bg-purple-100 text-purple-700"
                                    }`}
                            >
                                {CapitalizeFirst(balance.type)}
                            </span>
                            <span className="text-gray-600">
                                {balance.added_by_fullname} {balance.date}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                    {FormatMoney(balance.amount)}
                </div>
            </div>
            <EntryDetails balance={balance} isOpen={isEntryDetailsOpen} onClose={() => setIsEntryDetailsOpen(false)} />
        </>

    )
}