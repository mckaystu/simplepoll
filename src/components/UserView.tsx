import { useState } from 'react'
import { usePolling } from '../context/PollingContext'
import PollResults from './PollResults'

export default function UserView() {
  const { polls, vote, hasVoted, getUserVote } = usePolling()
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  const handleVote = (pollId: string) => {
    const optionId = selectedOptions[pollId]
    if (optionId) {
      vote(pollId, optionId)
      setSelectedOptions((prev) => {
        const newState = { ...prev }
        delete newState[pollId]
        return newState
      })
    }
  }

  const handleOptionSelect = (pollId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [pollId]: optionId,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Active Polls</h1>
        <p className="text-gray-400">Vote on polls and see live results</p>
      </div>

      <div className="space-y-6">
        {polls.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
            <p className="text-gray-400 text-lg">No active polls available</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for new polls</p>
          </div>
        ) : (
          polls.map((poll) => {
            const voted = hasVoted(poll.id)
            const userVote = getUserVote(poll.id)

            return (
              <div
                key={poll.id}
                className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-100 mb-4">
                  {poll.question}
                </h2>

                {!voted ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {poll.options.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedOptions[poll.id] === option.id
                              ? 'bg-violet-600 border-2 border-violet-400'
                              : 'bg-gray-700 border-2 border-gray-600 hover:border-violet-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`poll-${poll.id}`}
                            value={option.id}
                            checked={selectedOptions[poll.id] === option.id}
                            onChange={() => handleOptionSelect(poll.id, option.id)}
                            className="w-5 h-5 text-violet-600 focus:ring-violet-500 focus:ring-2"
                          />
                          <span className="ml-3 text-gray-100 font-medium">
                            {option.text}
                          </span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={() => handleVote(poll.id)}
                      disabled={!selectedOptions[poll.id]}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        selectedOptions[poll.id]
                          ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {selectedOptions[poll.id] ? 'Submit Vote' : 'Select an option to vote'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg">
                      <p className="text-green-400 text-sm font-medium">
                        ✓ You voted on this poll
                      </p>
                    </div>
                    <PollResults poll={poll} highlightOptionId={userVote?.optionId} />
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">
                    Total votes: <span className="font-semibold text-gray-300">{poll.totalVotes}</span>
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="flex justify-center mt-12">
        <p className="text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-md shadow-lg border-l-4 border-purple-light animate-pulse">
          <span className="icon-gradient-purple">✨ Built by Leona - Vibe coding Agent from HCL Software</span>
        </p>
      </div>
    </div>
  )
}
