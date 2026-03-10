import { useState } from 'react'
import { usePolling } from '../context/PollingContext'
import PollResults from './PollResults'

export default function AdminView() {
  const { polls, createPoll, deletePoll } = usePolling()
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [showForm, setShowForm] = useState(false)

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) return

    const validOptions = options.filter(opt => opt.trim() !== '')
    if (validOptions.length < 2) {
      alert('Please provide at least 2 options')
      return
    }

    createPoll(question, validOptions)
    setQuestion('')
    setOptions(['', ''])
    setShowForm(false)
  }

  const handleCancel = () => {
    setQuestion('')
    setOptions(['', ''])
    setShowForm(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Create and manage polls</p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mb-8"
        >
          + Create New Poll
        </button>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Create New Poll</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="What is your question?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Options (minimum 2)
              </label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors duration-200"
              >
                + Add Option
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Create Poll
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-100">Active Polls ({polls.length})</h2>
        {polls.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
            <p className="text-gray-400 text-lg">No polls created yet</p>
            <p className="text-gray-500 text-sm mt-2">Create your first poll to get started</p>
          </div>
        ) : (
          polls.map((poll) => (
            <div key={poll.id} className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-100 flex-1">{poll.question}</h3>
                <button
                  onClick={() => deletePoll(poll.id)}
                  className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
              <PollResults poll={poll} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
