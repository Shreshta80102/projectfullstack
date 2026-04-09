import { useState } from 'react';
import { useApp } from '../context.jsx';

export default function SubmitFeedback() {
  const { addFeedback } = useApp();
  const [form, setForm] = useState({ title: '', category: '', content: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addFeedback(form);
    setForm({ title: '', category: '', content: '' });
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm border border-civic-200">
      <h2 className="text-2xl font-bold text-civic-800 mb-4">Share Feedback</h2>
      {submitted ? (
        <div className="rounded-3xl bg-civic-50 p-5 text-civic-700 border border-civic-200">
          Thank you for your feedback. It will be reviewed by platform staff.
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Feedback Title</span>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-civic-200 bg-civic-50 px-4 py-3 focus:border-civic-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Category</span>
            <input
              required
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-civic-200 bg-civic-50 px-4 py-3 focus:border-civic-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Feedback</span>
            <textarea
              required
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="5"
              className="mt-2 w-full rounded-2xl border border-civic-200 bg-civic-50 px-4 py-3 focus:border-civic-500"
            />
          </label>
          <button className="rounded-2xl bg-civic-600 px-5 py-3 text-white font-semibold hover:bg-civic-700">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}
