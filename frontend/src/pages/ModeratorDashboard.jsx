import { useApp } from '../context.jsx';

export default function ModeratorDashboard() {
  const { issues, feedback } = useApp();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm border border-civic-200">
        <h2 className="text-2xl font-bold text-civic-800 mb-3">Moderator Dashboard</h2>
        <p className="text-gray-600">Monitor discussions, ensure respectful communication, and resolve conflicts.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-civic-50 p-5 border border-civic-200">
          <h3 className="text-lg font-semibold text-civic-700 mb-3">Reported Issues</h3>
          <div className="mt-4 space-y-3">
            {issues.map((issue) => (
              <div key={issue.id} className="rounded-2xl bg-white p-4 shadow-sm border border-civic-100">
                <p className="text-sm font-semibold text-civic-800">{issue.title}</p>
                <p className="text-xs text-gray-500">{issue.category} • {issue.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-civic-50 p-5 border border-civic-200">
          <h3 className="text-lg font-semibold text-civic-700 mb-3">Recent Feedback</h3>
          <div className="mt-4 space-y-3">
            {feedback.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm border border-civic-100">
                <p className="text-sm font-semibold text-civic-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.category} • {item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
