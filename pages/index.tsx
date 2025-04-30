import { useState, useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

type Roommate = string;

type ChoreAssignment = {
  name: string;
  time: string;
  completed?: boolean;
};

type ChoreSchedule = {
  task: string;
  priority: 'normal' | 'high';
  category: string;
  monday?: ChoreAssignment;
  tuesday?: ChoreAssignment;
  wednesday?: ChoreAssignment;
  thursday?: ChoreAssignment;
  friday?: ChoreAssignment;
  saturday?: ChoreAssignment;
  sunday?: ChoreAssignment;
};

const index: NextPage = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  
  const roommates: Roommate[] = [
    'DAMIAN', 'ARISSTLE', 'NATTY', 'PANOS', 'BRIT', 
    'HEYE', 'IVOINE', 'ALI', 'WILLIAM', 'AXEL', 'RAPHA'
  ];
  
  const choreSchedule: ChoreSchedule[] = [
    {
      task: 'WASH DISHES / DishWasher',
      priority: 'high',
      category: 'dishes',
      monday: { name: 'DAMIAN', time: 'ALL DAY' },
      tuesday: { name: 'ARISSTLE', time: 'ALL DAY' },
      wednesday: { name: 'NATTY', time: 'ALL DAY' },
      thursday: { name: 'PANOS', time: 'ALL DAY' },
      friday: { name: 'BRIT', time: 'ALL DAY' },
      saturday: { name: 'HEYE', time: 'ALL DAY'},
      sunday: { name: 'IVOINE', time: 'ALL DAY' }
    },
    {
      task: 'TAKE OUT TRASH',
      priority: 'normal',
      category: 'trash',
      monday: { name: 'ALI', time: '7:00 PM' },
      wednesday: { name: 'WILLIAM', time: '7:00 PM' },
      friday: { name: 'AXEL', time: '7:00 PM' },
      sunday: { name: 'RAPHA', time: '5:00 PM' }
    },
    {
      task: 'SWEEP THE FLOOR',
      priority: 'normal',
      category: 'sweep',
      tuesday: { name: 'NATTY', time: '4:00 PM' },
      thursday: { name: 'ARISSTLE', time: '4:00 PM' },
      saturday: { name: 'DAMIAN', time: '1:00 PM' }
    },
    {
      task: 'CLEAN TOILETS / BATHROOM',
      priority: 'high',
      category: 'bathroom',
      wednesday: { name: 'HEYE', time: '3:30 PM' },
      saturday: { name: 'ALI', time: '1:00 PM' }
    },
    {
      task: 'WIPE COUNTERS / TV',
      priority: 'normal',
      category: 'counters',
      monday: { name: 'PANOS', time: '4:30 PM' },
      wednesday: { name: 'IVOINE', time: '4:30 PM' },
      friday: { name: 'WILLIAM', time: '4:30 PM' },
      sunday: { name: 'BRIT', time: '11:30 AM' }
    },
    {
      task: 'ORGANIZE SHOE RACK',
      priority: 'normal',
      category: 'shoes',
      tuesday: { name: 'AXEL', time: '6:30 PM' },
      thursday: { name: 'RAPHA', time: '6:30 PM' },
      saturday: { name: 'NATTY', time: '3:30 PM' }
    },
    {
      task: 'ORGANIZE LIVING ROOM',
      priority: 'normal',
      category: 'living',
      monday: { name: 'HEYE', time: '4:00 PM' },
      wednesday: { name: 'BRIT', time: '4:00 PM' },
      friday: { name: 'DAMIAN', time: '4:00 PM' },
      sunday: { name: 'ARISSTLE', time: '4:00 PM' }
    },
    {
      task: 'RERACK DISHES',
      priority: 'normal',
      category: 'rerack',
      monday: { name: 'WILLIAM', time: 'ALL DAY' },
      tuesday: { name: 'IVOINE', time: 'ALL DAY' },
      wednesday: { name: 'AXEL', time: 'ALL DAY' },
      thursday: { name: 'ALI', time: 'ALL DAY' },
      friday: { name: 'RAPHA', time: 'ALL DAY' },
      saturday: { name: 'PANOS', time: 'ALL DAY' },
      sunday: { name: 'HEYE', time: 'ALL DAY' }
    },
    {
      task: 'CLEAN LIVING ROOM / TABLE',
      priority: 'normal',
      category: 'table',
      monday: { name: 'RAPHA', time: '4:30 PM' },
      tuesday: { name: 'PANOS', time: '6:30 PM' },
      wednesday: { name: 'ALI', time: '3:30 PM' },
      thursday: { name: 'BRIT', time: '2:30 PM' },
      friday: { name: 'IVOINE', time: '1:30 PM' },
      saturday: { name: 'WILLIAM', time: '4:30 PM' },
      sunday: { name: 'AXEL', time: '7:30 PM' }
    }
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
    
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };
    
    const intervalId = setInterval(updateClock, 1000);
    updateClock(); 
    
    return () => clearInterval(intervalId);
  }, []);

  const getTaskCellClass = (chore: ChoreSchedule) => {
    let classes = "py-4 px-3 text-left font-medium border border-gray-200";
    
    if (chore.priority === 'high') {
      classes += " border-l-4 border-l-red-500";
    }
    
    return `${classes} task-${chore.category}`;
  };

  const getDayCellClass = (chore: ChoreSchedule, day: keyof ChoreSchedule) => {
    if (!chore[day]) return "border border-gray-200 bg-gray-50";
    
    let classes = `border border-gray-200 text-center py-4 px-2 task-${chore.category}`;
    
    if ((chore[day] as ChoreAssignment).completed) {
      classes += " bg-green-50 relative";
    }
    
    return classes;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Telos Chore Schedule</title>
        <meta name="description" content="Roommate Chore Schedule App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="bg-blue-600 text-white p-6 rounded-t-lg shadow">
          <h1 className="text-2xl font-bold text-center">Telos Chore Schedule</h1>
        </header>

        <div className='text-red-600 text-center mt-5 text-5xl'>YOU WILL BE TASED IF TASK IS NOT COMPLETED</div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 text-left font-semibold">Task</th>
                    <th className="py-3 px-4 text-center font-semibold">Monday</th>
                    <th className="py-3 px-4 text-center font-semibold">Tuesday</th>
                    <th className="py-3 px-4 text-center font-semibold">Wednesday</th>
                    <th className="py-3 px-4 text-center font-semibold">Thursday</th>
                    <th className="py-3 px-4 text-center font-semibold">Friday</th>
                    <th className="py-3 px-4 text-center font-semibold">Saturday</th>
                    <th className="py-3 px-4 text-center font-semibold">Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  {choreSchedule.map((chore, index) => (
                    <tr key={index}>
                      <td className={getTaskCellClass(chore)}>{chore.task}</td>
                      <td className={getDayCellClass(chore, 'monday')}>
                        {chore.monday && (
                          <>
                            <div className="font-medium">{chore.monday.name}</div>
                            <div className="text-sm text-gray-600">{chore.monday.time}</div>
                            {chore.monday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className={getDayCellClass(chore, 'tuesday')}>
                        {chore.tuesday && (
                          <>
                            <div className="font-medium">{chore.tuesday.name}</div>
                            <div className="text-sm text-gray-600">{chore.tuesday.time}</div>
                            {chore.tuesday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className={getDayCellClass(chore, 'wednesday')}>
                        {chore.wednesday && (
                          <>
                            <div className="font-medium">{chore.wednesday.name}</div>
                            <div className="text-sm text-gray-600">{chore.wednesday.time}</div>
                            {chore.wednesday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className={getDayCellClass(chore, 'thursday')}>
                        {chore.thursday && (
                          <>
                            <div className="font-medium">{chore.thursday.name}</div>
                            <div className="text-sm text-gray-600">{chore.thursday.time}</div>
                            {chore.thursday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className={getDayCellClass(chore, 'friday')}>
                        {chore.friday && (
                          <>
                            <div className="font-medium">{chore.friday.name}</div>
                            <div className="text-sm text-gray-600">{chore.friday.time}</div>
                            {chore.friday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className={getDayCellClass(chore, 'saturday')}>
                        {chore.saturday && (
                          <>
                            <div className="font-medium">{chore.saturday.name}</div>
                            <div className="text-sm text-gray-600">{chore.saturday.time}</div>
                            {chore.saturday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className={getDayCellClass(chore, 'sunday')}>
                        {chore.sunday && (
                          <>
                            <div className="font-medium">{chore.sunday.name}</div>
                            <div className="text-sm text-gray-600">{chore.sunday.time}</div>
                            {chore.sunday.completed && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-green-600 text-xl">✓</span>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Roommates Panel */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Roommates</h2>
              <ul className="space-y-2">
                {roommates.map((roommate, index) => (
                  <li 
                    key={index} 
                    className={`p-3 rounded-md text-white font-medium ${
                      index % 3 === 0 ? 'bg-blue-500' : 
                      index % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                  >
                    {roommate}
                  </li>
                ))}
              </ul>
            </div>
            {/* 
            

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-xl font-bold mb-4">Current Time</h2>
              <div className="text-3xl font-bold text-gray-800 mb-2">{currentTime}</div>
              <div className="text-lg text-gray-600">{currentDate}</div>
            </div>
            
           
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Legend</h2>
              <div className="flex items-center mb-3">
                <div className="w-5 h-5 mr-2 bg-green-50 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2 bg-white border-l-4 border-red-500 rounded"></div>
                <span>High Priority</span>
              </div>
              
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

