import { Poll } from '../types/polling'

interface PollResultsProps {
  poll: Poll;
  highlightOptionId?: string;
}

export default function PollResults({ poll, highlightOptionId }: PollResultsProps) {
  const getPercentage = (votes: number): number => {
    if (poll.totalVotes === 0) return 0
    return Math.round((votes / poll.totalVotes) * 100)
  }

  return (
    <div className="space-y-3">
      {poll.options.map((option) => {
        const percentage = getPercentage(option.votes)
        const isHighlighted = highlightOptionId === option.id

        return (
          <div key={option.id} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${isHighlighted ? 'text-violet-300' : 'text-gray-300'}`}>
                {option.text}
                {isHighlighted && <span className="ml-2 text-green-400">✓ Your vote</span>}
              </span>
              <span className="text-sm font-semibold text-gray-300">
                {option.votes} votes ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isHighlighted
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
