export default function GenericTable({ columns, data, renderRow }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <thead className="text-white bg-hijau text-left">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-4 font-semibold text-sm">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                    {/* LANGSUNG panggil renderRow tanpa dibungkus <tr> lagi */}
                    {data.map((item, index) => renderRow(item, index))}
                </tbody>
            </table>
        </div>
    )
}