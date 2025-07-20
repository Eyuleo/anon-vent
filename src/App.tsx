import { useState, useEffect } from "react"
import Home from "./components/Home"
import { ThemeToggle } from "./components/ThemeToggle"

interface Vent {
  id: number
  content: string
  upVotes: number
  downVotes: number
  userVote?: "up" | "down" | null
}

function App() {
  const [vents, setVents] = useState<Vent[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  const getUserId = () => {
    let userId = localStorage.getItem("anon-vent-user-id")
    if (!userId) {
      userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("anon-vent-user-id", userId)
    }
    return userId
  }

  useEffect(() => {
    const savedVents = localStorage.getItem("anon-vents")
    const savedVotes = localStorage.getItem("anon-vent-votes")
    const userId = getUserId()

    if (savedVents) {
      const parsedVents = JSON.parse(savedVents)
      const userVotes = savedVotes ? JSON.parse(savedVotes)[userId] || {} : {}

      const ventsWithUserVotes = parsedVents.map((vent: Vent) => ({
        ...vent,
        userVote: userVotes[vent.id] || null,
      }))

      setVents(ventsWithUserVotes)
    } else {
      const initialVents = [
        {
          id: 1,
          content: "This is a sample vent",
          upVotes: 10,
          downVotes: 2,
          userVote: null,
        },
        {
          id: 2,
          content: "Another vent to share",
          upVotes: 5,
          downVotes: 1,
          userVote: null,
        },
        {
          id: 3,
          content: "Feeling great today!",
          upVotes: 8,
          downVotes: 0,
          userVote: null,
        },
        {
          id: 4,
          content: "Just a random thought",
          upVotes: 3,
          downVotes: 4,
          userVote: null,
        },
      ]
      setVents(initialVents)
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ventsToSave = vents.map(({ userVote, ...vent }) => ({ ...vent }))
      localStorage.setItem("anon-vents", JSON.stringify(ventsToSave))
    }
  }, [vents, isInitialized])

  const addVent = (content: string) => {
    const newVent: Vent = {
      id: Date.now(),
      content,
      upVotes: 0,
      downVotes: 0,
      userVote: null,
    }
    setVents([newVent, ...vents])
  }

  const handleVote = (id: number, voteType: "up" | "down") => {
    const userId = getUserId()
    const savedVotes = localStorage.getItem("anon-vent-votes")
    const allUserVotes = savedVotes ? JSON.parse(savedVotes) : {}
    const userVotes = allUserVotes[userId] || {}

    setVents((prevVents) =>
      prevVents.map((vent) => {
        if (vent.id !== id) return vent

        const currentVote = vent.userVote
        let newUpVotes = vent.upVotes
        let newDownVotes = vent.downVotes
        let newUserVote: "up" | "down" | null = null

        if (currentVote === "up") {
          newUpVotes -= 1
        } else if (currentVote === "down") {
          newDownVotes -= 1
        }

        if (currentVote !== voteType) {
          if (voteType === "up") {
            newUpVotes += 1
            newUserVote = "up"
          } else {
            newDownVotes += 1
            newUserVote = "down"
          }
        }

        // Update user votes in localStorage
        userVotes[id] = newUserVote
        allUserVotes[userId] = userVotes
        localStorage.setItem("anon-vent-votes", JSON.stringify(allUserVotes))

        return {
          ...vent,
          upVotes: newUpVotes,
          downVotes: newDownVotes,
          userVote: newUserVote,
        }
      })
    )
  }

  const upvoteVent = (id: number) => {
    handleVote(id, "up")
  }

  const downvoteVent = (id: number) => {
    handleVote(id, "down")
  }
  return (
    <div className="container mx-auto p-4 font-anekbangla">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <Home
        vents={vents}
        onAddVent={addVent}
        onUpvote={upvoteVent}
        onDownvote={downvoteVent}
      />
    </div>
  )
}

export default App
