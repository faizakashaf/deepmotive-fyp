import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useHabits } from "../hooks/useHabits";
import {
  Bot,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Clock,
  Target,
  Brain,
} from "lucide-react";

const AICoach = () => {
  const { habits, getStatistics } = useHabits();
  const [insights, setInsights] = useState({
    completedToday: 0,
    totalCompletion: 0,
    bestHabit: "No habits yet",
    bestStreak: 0,
    strugglingHabit: "No habits yet",
    strugglingRate: 0,
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your AI Habit Coach. I'm here to help you build better habits and achieve your goals. What would you like help with today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use refs to track previous values and prevent unnecessary updates
  const prevHabitsRef = useRef();
  const statsCacheRef = useRef({
    insights: null,
    timestamp: null,
  });

  // Memoize the insights calculation
  const calculateInsights = useCallback(() => {
    if (!habits || habits.length === 0) {
      return {
        completedToday: 0,
        totalCompletion: 0,
        bestHabit: "No habits yet",
        bestStreak: 0,
        strugglingHabit: "No habits yet",
        strugglingRate: 0,
      };
    }

    // Calculate completed today
    const today = new Date().getDay();
    const completedToday = habits.filter(
      (h) => h.completion?.[today] || false,
    ).length;

    // Calculate average completion
    const totalCompletion = Math.round(
      habits.reduce((acc, h) => {
        const rate = h.completion?.length
          ? (h.completion.filter(Boolean).length / h.completion.length) * 100
          : 0;
        return acc + rate;
      }, 0) / habits.length,
    );

    // Find best habit (highest streak)
    const bestHabit = habits.reduce((best, habit) => {
      if (!best || (habit.currentStreak || 0) > (best.currentStreak || 0)) {
        return habit;
      }
      return best;
    }, null);

    // Find struggling habit (lowest completion rate)
    const strugglingHabit = habits.reduce((worst, habit) => {
      const completionRate = habit.completion?.length
        ? (habit.completion.filter(Boolean).length / habit.completion.length) *
          100
        : 0;
      const worstRate = worst?.completion?.length
        ? (worst.completion.filter(Boolean).length / worst.completion.length) *
          100
        : 100;

      return completionRate < worstRate ? habit : worst;
    }, habits[0]);

    const strugglingRate = strugglingHabit?.completion?.length
      ? Math.round(
          (strugglingHabit.completion.filter(Boolean).length /
            strugglingHabit.completion.length) *
            100,
        )
      : 0;

    return {
      completedToday,
      totalCompletion,
      bestHabit: bestHabit?.name || "No habits yet",
      bestStreak: bestHabit?.currentStreak || 0,
      strugglingHabit: strugglingHabit?.name || "No habits yet",
      strugglingRate,
    };
  }, [habits]);

  // Load insights with caching to prevent unnecessary updates
  useEffect(() => {
    const loadInsights = async () => {
      // Check if habits have actually changed
      if (prevHabitsRef.current === habits) {
        return;
      }

      prevHabitsRef.current = habits;

      try {
        setIsLoading(true);

        // Check cache first (5 minute cache)
        const now = Date.now();
        const cached = statsCacheRef.current;
        if (
          cached.insights &&
          cached.timestamp &&
          now - cached.timestamp < 300000
        ) {
          setInsights(cached.insights);
          setIsLoading(false);
          return;
        }

        // Calculate insights locally first
        const localInsights = calculateInsights();

        // Try to get stats from backend, fall back to local insights
        try {
          const stats = await getStatistics();
          const mergedInsights = {
            ...localInsights,
            completedToday:
              stats.completedToday || localInsights.completedToday,
            totalCompletion:
              stats.averageCompletion || localInsights.totalCompletion,
          };

          // Update cache
          statsCacheRef.current = {
            insights: mergedInsights,
            timestamp: now,
          };

          setInsights(mergedInsights);
        } catch (error) {
          console.error("Error loading insights from backend:", error);
          // Fall back to local insights
          setInsights(localInsights);
        }
      } catch (error) {
        console.error("Error loading insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInsights();
  }, [habits, getStatistics, calculateInsights]);

  // Memoize AI responses based on insights
  const aiResponses = useMemo(
    () => [
      `Based on your ${insights.totalCompletion}% completion rate, I suggest focusing on one habit at a time to build consistency.`,
      `Great job on your ${insights.bestStreak}-day streak with "${insights.bestHabit}"! Remember that consistency is more important than perfection.`,
      `I notice you're struggling with "${insights.strugglingHabit}" (${insights.strugglingRate}% completion). Would you like me to help you break it down into smaller steps?`,
      `Your current completion rate is good, but there's room for improvement. Let's set some specific targets for next week!`,
      `Based on successful habit formation research, I recommend implementing implementation intentions (if-then planning) for "${insights.strugglingHabit}".`,
      `You've completed ${insights.completedToday} habits today. ${
        insights.completedToday > 0
          ? "Keep up the great work!"
          : "Let's start with one small habit today!"
      }`,
    ],
    [insights],
  );

  // Memoize quick actions
  const quickActions = useMemo(
    () => [
      {
        title: "Help me stay motivated",
        prompt: "I'm losing motivation with my habits, what should I do?",
      },
      {
        title: "Create a new habit plan",
        prompt: "Help me create a plan for building a new habit",
      },
      {
        title: "Analyze my progress",
        prompt: `How am I doing with my ${habits.length} current habits?`,
      },
      {
        title: "Suggest improvements",
        prompt: `What can I do to improve my ${insights.totalCompletion}% habit consistency?`,
      },
    ],
    [habits.length, insights.totalCompletion],
  );

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (inputText.trim() === "") return;

      // Add user message
      const userMessage = {
        id: Date.now(),
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setIsTyping(true);

      // Simulate AI response after a delay
      setTimeout(() => {
        const randomResponse =
          aiResponses[Math.floor(Math.random() * aiResponses.length)];
        const aiMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: "ai",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);
    },
    [inputText, aiResponses],
  );

  const handleQuickAction = useCallback((prompt) => {
    setInputText(prompt);
  }, []);

  if (isLoading && habits.length === 0) {
    return (
      <div className='p-6 flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600 dark:text-gray-400'>
            Analyzing your habit patterns...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center space-x-3 mb-6'>
        <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg'>
          <Bot size={24} className='text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
            AI Habit Coach
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            Personalized guidance based on your {habits.length} habits
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
              <TrendingUp
                size={20}
                className='text-blue-600 dark:text-blue-400'
              />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              Today's Progress
            </h3>
          </div>
          <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
            {insights.completedToday}/{habits.length} habits
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            {insights.completedToday === habits.length
              ? "Perfect day! 🎉"
              : `${habits.length - insights.completedToday} more to go`}
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
              <Target
                size={20}
                className='text-green-600 dark:text-green-400'
              />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              Best Performer
            </h3>
          </div>
          <p className='text-lg font-semibold text-green-600 dark:text-green-400 truncate'>
            {insights.bestHabit}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {insights.bestStreak} day streak 🔥
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center'>
              <Lightbulb
                size={20}
                className='text-orange-600 dark:text-orange-400'
              />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              Needs Attention
            </h3>
          </div>
          <p className='text-lg font-semibold text-orange-600 dark:text-orange-400 truncate'>
            {insights.strugglingHabit}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {insights.strugglingRate}% completion
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action.prompt)}
            className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left group'
          >
            <div className='flex items-center justify-between mb-2'>
              <Sparkles size={16} className='text-purple-500' />
              <Brain
                size={16}
                className='text-gray-400 group-hover:text-purple-500 transition-colors'
              />
            </div>
            <p className='text-sm font-medium text-gray-800 dark:text-white'>
              {action.title}
            </p>
          </button>
        ))}
      </div>

      {/* Chat Section */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 p-6'>
        <h3 className='text-lg font-semibold mb-4 flex items-center text-gray-800 dark:text-white'>
          <Bot size={20} className='mr-2 text-purple-500' />
          Chat with Coach
        </h3>

        <div className='h-96 overflow-y-auto mb-4 space-y-4 p-2'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-purple-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className='flex justify-start'>
              <div className='bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce'
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <span className='text-sm text-gray-500 dark:text-gray-400 ml-2'>
                    AI Coach is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className='flex space-x-2'>
          <input
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Ask something about your habits...'
            className='flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white'
            disabled={isTyping}
          />
          <button
            type='submit'
            className='px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition-all shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isTyping || inputText.trim() === ""}
          >
            {isTyping ? "..." : "Send"}
          </button>
        </form>
      </div>

      {/* Tips Section */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
          Weekly Habit Tips
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800'>
            <div className='flex items-center space-x-2 mb-2'>
              <Clock size={16} className='text-blue-600 dark:text-blue-400' />
              <h4 className='font-medium text-gray-800 dark:text-white'>
                Habit Stacking
              </h4>
            </div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Pair new habits with existing ones. After [current habit], I will
              [new habit].
            </p>
          </div>

          <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800'>
            <div className='flex items-center space-x-2 mb-2'>
              <Target
                size={16}
                className='text-green-600 dark:text-green-400'
              />
              <h4 className='font-medium text-gray-800 dark:text-white'>
                2-Minute Rule
              </h4>
            </div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Start with just 2 minutes of your habit to overcome
              procrastination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
