import { Button } from "./ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"

interface Vent {
  id: number
  content: string
  upVotes: number
  downVotes: number
  userVote?: "up" | "down" | null
}

interface VentsProps {
  vents: Vent[]
  onUpvote: (id: number) => void
  onDownvote: (id: number) => void
}

export default function Vents({ vents, onUpvote, onDownvote }: VentsProps) {
  return (
    <div className="w-full">
      {vents.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          <p>No vents yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {vents.map((vent) => (
            <li
              key={vent.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow hover:border-gray-300 bg-card"
            >
              <p className="text-lg mb-3">{vent.content}</p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={`cursor-pointer transition-colors ${
                    vent.userVote === "up"
                      ? "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:border-green-500 dark:hover:border-green-600"
                      : "hover:bg-green-50 hover:border-green-300 hover:text-green-700 dark:hover:bg-green-950 dark:hover:border-green-700 dark:hover:text-green-400"
                  }`}
                  onClick={() => onUpvote(vent.id)}
                  title={
                    vent.userVote === "up"
                      ? "Remove upvote"
                      : "Upvote this vent"
                  }
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <span
                  className={`text-sm font-medium ${
                    vent.userVote === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {vent.upVotes}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className={`cursor-pointer transition-colors ${
                    vent.userVote === "down"
                      ? "bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 dark:bg-red-500 dark:hover:bg-red-600 dark:border-red-500 dark:hover:border-red-600"
                      : "hover:bg-red-50 hover:border-red-300 hover:text-red-700 dark:hover:bg-red-950 dark:hover:border-red-700 dark:hover:text-red-400"
                  }`}
                  onClick={() => onDownvote(vent.id)}
                  title={
                    vent.userVote === "down"
                      ? "Remove downvote"
                      : "Downvote this vent"
                  }
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <span
                  className={`text-sm font-medium ${
                    vent.userVote === "down"
                      ? "text-red-600 dark:text-red-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {vent.downVotes}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
