export default function ValidationServerErrors({ errors }: { errors: string[] }) {
    return (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg space-y-1 mb-4">
            {errors.map((err, index) => (
                <p key={index} className="text-sm">
                    • {err}
                </p>
            ))}
        </div>
    )
}