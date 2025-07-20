import { useState } from "react"
import Vents from "./Vents"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

interface HomeProps {
  vents: Array<{
    id: number
    content: string
    upVotes: number
    downVotes: number
    userVote?: "up" | "down" | null
  }>
  onAddVent: (content: string) => void
  onUpvote: (id: number) => void
  onDownvote: (id: number) => void
}

export default function Home({
  vents,
  onAddVent,
  onUpvote,
  onDownvote,
}: HomeProps) {
  const [newVent, setNewVent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newVent.trim()) {
      onAddVent(newVent.trim())
      setNewVent("")
    }
  }

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to Anon Vent</h1>
      <p className="mb-6 text-2xl text-center">
        Share your thoughts anonymously with others.
      </p>

      <div className="w-full mb-8 p-6 border rounded-lg shadow-sm bg-card">
        <h2 className="text-xl font-semibold mb-4">Share Your Thoughts</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share it anonymously..."
            value={newVent}
            onChange={(e) => setNewVent(e.target.value)}
            className="min-h-24"
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {newVent.length}/500 characters
            </span>
            <Button type="submit" disabled={!newVent.trim()} className="px-6">
              Post Vent
            </Button>
          </div>
        </form>
      </div>

      <Vents vents={vents} onUpvote={onUpvote} onDownvote={onDownvote} />
    </div>
  )
}
