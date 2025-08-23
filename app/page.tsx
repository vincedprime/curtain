"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus } from "lucide-react"

interface TodoItem {
  id: string
  text: string
  completed: boolean
}

export default function HabitTracker() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [lastResetDate, setLastResetDate] = useState<string>("")

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("habit-todos")
    const savedResetDate = localStorage.getItem("habit-reset-date")
    const today = new Date().toDateString()

    if (savedTodos && savedResetDate) {
      const parsedTodos = JSON.parse(savedTodos)

      // Check if it's a new day - if so, reset all todos to uncompleted
      if (savedResetDate !== today) {
        const resetTodos = parsedTodos.map((todo: TodoItem) => ({
          ...todo,
          completed: false,
        }))
        setTodos(resetTodos)
        setLastResetDate(today)
        localStorage.setItem("habit-todos", JSON.stringify(resetTodos))
        localStorage.setItem("habit-reset-date", today)
      } else {
        setTodos(parsedTodos)
        setLastResetDate(savedResetDate)
      }
    } else {
      // First time visit - set today as reset date
      setLastResetDate(today)
      localStorage.setItem("habit-reset-date", today)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("habit-todos", JSON.stringify(todos))
    }
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: TodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
      }
      setTodos([...todos, newTodoItem])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
    if (updatedTodos.length === 0) {
      localStorage.removeItem("habit-todos")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="container mx-auto max-w-2xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Daily Habit Tracker</h1>
          <p className="text-muted-foreground">
            Track your daily habits. Your progress resets each day for a fresh start!
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Progress
              <span className="text-sm font-normal text-muted-foreground">
                {completedCount}/{totalCount} completed
              </span>
            </CardTitle>
            <CardDescription>
              Add habits you want to track daily. They'll reset tomorrow for a fresh start.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new habit..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {totalCount > 0 && (
              <div className="w-full bg-secondary rounded-full h-2 mb-4">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
            )}

            <div className="space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="flex-shrink-0"
                  />
                  <span
                    className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {todos.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No habits added yet.</p>
                <p className="text-sm">Add your first habit above to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>💡 Your habits will automatically reset tomorrow for a fresh start</p>
          <p className="mt-1">Last reset: {lastResetDate}</p>
        </div>
      </div>
    </div>
  )
}
