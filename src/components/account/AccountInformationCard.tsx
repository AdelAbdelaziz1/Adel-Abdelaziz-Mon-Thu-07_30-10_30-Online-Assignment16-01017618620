export function AccountInformationCard({
  userId = "—",
  role = "User",
}: {
  userId?: string;
  role?: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="space-y-4 p-6 sm:p-8">
        <h3 className="text-base font-bold text-gray-900">Account Information</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">User ID</span>
            <span className="font-mono text-sm text-gray-700">{userId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Role</span>
            <span className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium capitalize text-green-700">
              {role}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}