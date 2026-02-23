import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import Calendar from "../components/Calendar";
import { Flame, Calendar as CalendarIcon } from "lucide-react";

const StreakTracker = () => {
  const { habits } = useHabits();
  const [selectedDate, setSelectedDate] = useState(null);

  const currentStreaks = habits.map((habit) => habit.currentStreak);
  const maxStreak = Math.max(...currentStreaks, 0);
  const totalStreakDays = habits.reduce(
    (sum, habit) => sum + habit.currentStreak,
    0
  );

  return (
    <div className='p-6 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3'>
            <Flame className='text-orange-500' size={24} />
          </div>
          <h3 className='text-lg font-semibold mb-2'>Longest Current Streak</h3>
          <p className='text-3xl font-bold text-orange-600'>{maxStreak} days</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
            <Flame className='text-blue-500' size={24} />
          </div>
          <h3 className='text-lg font-semibold mb-2'>Total Streak Days</h3>
          <p className='text-3xl font-bold text-blue-600'>{totalStreakDays}</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
            <CalendarIcon className='text-green-500' size={24} />
          </div>
          <h3 className='text-lg font-semibold mb-2'>Active Habits</h3>
          <p className='text-3xl font-bold text-green-600'>{habits.length}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Calendar
          habits={habits}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Streak Leaderboard</h3>
          <div className='space-y-3'>
            {habits
              .sort((a, b) => b.currentStreak - a.currentStreak)
              .map((habit, index) => (
                <div
                  key={habit.id}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-3 h-3 rounded-full ${habit.color}`}
                    ></div>
                    <span className='font-medium'>{habit.name}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Flame size={16} className='text-orange-500' />
                    <span className='font-semibold'>
                      {habit.currentStreak} days
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>
            Habits on {selectedDate.toLocaleDateString()}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {habits
              .filter((habit) => {
                const habitDate = new Date(habit.createdAt);
                return habitDate.toDateString() === selectedDate.toDateString();
              })
              .map((habit) => (
                <div key={habit.id} className='p-4 border rounded-lg'>
                  <div className='flex items-center space-x-3 mb-2'>
                    <div
                      className={`w-3 h-3 rounded-full ${habit.color}`}
                    ></div>
                    <h4 className='font-medium'>{habit.name}</h4>
                  </div>
                  <p className='text-sm text-gray-600'>{habit.description}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakTracker;
