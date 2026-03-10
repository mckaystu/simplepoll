import { createContext, useContext, useState, ReactNode } from 'react'
import { Poll, PollOption, UserVote } from '../types/polling'

interface PollingContextType {
  polls: Poll[];
  userVotes: UserVote[];
  createPoll: (question: string, options: string[]) => void;
  deletePoll: (pollId: string) => void;
  vote: (pollId: string, optionId: string) => void;
  hasVoted: (pollId: string) => boolean;
  getUserVote: (pollId: string) => UserVote | undefined;
}

const PollingContext = createContext<PollingContextType | undefined>(undefined)

export function PollingProvider({ children }: { children: ReactNode }) {
  const [polls, setPolls] = useState<Poll[]>([])
  const [userVotes, setUserVotes] = useState<UserVote[]>([])

  const createPoll = (question: string, options: string[]) => {
    const newPoll: Poll = {
      id: Date.now().toString(),
      question,
      options: options.map((text, index) => ({
        id: `${Date.now()}-${index}`,
        text,
        votes: 0,
      })),
      createdAt: new Date(),
      totalVotes: 0,
    }
    setPolls((prev) => [newPoll, ...prev])
  }

  const deletePoll = (pollId: string) => {
    setPolls((prev) => prev.filter((poll) => poll.id !== pollId))
    setUserVotes((prev) => prev.filter((vote) => vote.pollId !== pollId))
  }

  const vote = (pollId: string, optionId: string) => {
    // Check if user already voted
    if (hasVoted(pollId)) return

    // Update poll votes
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map((option) =>
              option.id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option
            ),
            totalVotes: poll.totalVotes + 1,
          }
        }
        return poll
      })
    )

    // Record user vote
    setUserVotes((prev) => [
      ...prev,
      {
        pollId,
        optionId,
        timestamp: new Date(),
      },
    ])
  }

  const hasVoted = (pollId: string): boolean => {
    return userVotes.some((vote) => vote.pollId === pollId)
  }

  const getUserVote = (pollId: string): UserVote | undefined => {
    return userVotes.find((vote) => vote.pollId === pollId)
  }

  return (
    <PollingContext.Provider
      value={{
        polls,
        userVotes,
        createPoll,
        deletePoll,
        vote,
        hasVoted,
        getUserVote,
      }}
    >
      {children}
    </PollingContext.Provider>
  )
}

export function usePolling() {
  const context = useContext(PollingContext)
  if (context === undefined) {
    throw new Error('usePolling must be used within a PollingProvider')
  }
  return context
}
