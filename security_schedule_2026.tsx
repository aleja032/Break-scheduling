import React, { useState } from 'react';
import { Sun, Moon, Coffee } from 'lucide-react';

const SecurityCalendar2026 = () => {
  const [currentMonth, setCurrentMonth] = useState(0);
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  // Función para calcular el turno basado en el ciclo 2x2
  const getShiftType = (dayOfYear) => {
    // Día 1 (12 enero) = día 12 del año = segundo día de noche (índice 3 en el ciclo)
    // Ciclo: [Día1, Día2, Noche1, Noche2, Descanso1, Descanso2]
    const startOffset = 3; // Empezamos en Noche2 (índice 3)
    const cyclePosition = (dayOfYear - 12 + startOffset) % 6;
    
    if (cyclePosition === 0 || cyclePosition === 1) return 'day';
    if (cyclePosition === 2 || cyclePosition === 3) return 'night';
    return 'off';
  };
  
  const getShiftInfo = (dayOfYear) => {
    const type = getShiftType(dayOfYear);
    const startOffset = 3;
    const cyclePosition = (dayOfYear - 12 + startOffset) % 6;
    
    if (type === 'day') {
      return {
        type: 'day',
        label: cyclePosition === 0 ? 'Día 1' : 'Día 2',
        icon: Sun,
        bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
        text: 'text-white'
      };
    } else if (type === 'night') {
      return {
        type: 'night',
        label: cyclePosition === 2 ? 'Noche 1' : 'Noche 2',
        icon: Moon,
        bg: 'bg-gradient-to-br from-indigo-600 to-purple-700',
        text: 'text-white'
      };
    } else {
      return {
        type: 'off',
        label: cyclePosition === 4 ? 'Descanso 1' : 'Descanso 2',
        icon: Coffee,
        bg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
        text: 'text-white'
      };
    }
  };
  
  const getDayOfYear = (month, day) => {
    let dayOfYear = day;
    for (let i = 0; i < month; i++) {
      dayOfYear += daysInMonth[i];
    }
    return dayOfYear;
  };
  
  const getFirstDayOfMonth = (month) => {
    const date = new Date(2026, month, 1);
    return date.getDay();
  };
  
  const renderCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = daysInMonth[currentMonth];
    const calendar = [];
    
    let dayCounter = 1;
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDay) || dayCounter > days) {
          weekDays.push(<div key={`empty-${week}-${day}`} className="aspect-square"></div>);
        } else {
          const dayOfYear = getDayOfYear(currentMonth, dayCounter);
          const shiftInfo = getShiftInfo(dayOfYear);
          const Icon = shiftInfo.icon;
          const currentDay = dayCounter;
          
          weekDays.push(
            <div
              key={`day-${dayCounter}`}
              className={`aspect-square ${shiftInfo.bg} ${shiftInfo.text} rounded-xl p-2 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200`}
            >
              <div className="text-lg font-bold">{currentDay}</div>
              <Icon className="w-5 h-5 my-1" />
              <div className="text-xs font-medium text-center">{shiftInfo.label}</div>
            </div>
          );
          dayCounter++;
        }
      }
      calendar.push(
        <div key={`week-${week}`} className="grid grid-cols-7 gap-2">
          {weekDays}
        </div>
      );
      if (dayCounter > days) break;
    }
    
    return calendar;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Calendario de Turnos 2026
          </h1>
          <p className="text-slate-300">Personal de Seguridad - Modalidad 2x2</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
              disabled={currentMonth === 0}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              ← Anterior
            </button>
            <h2 className="text-3xl font-bold text-white">
              {months[currentMonth]} 2026
            </h2>
            <button
              onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
              disabled={currentMonth === 11}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg"
            >
              Siguiente →
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center font-bold text-white/80 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            {renderCalendar()}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">Turno Día</div>
                <div className="text-sm opacity-90">2 días consecutivos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Moon className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">Turno Noche</div>
                <div className="text-sm opacity-90">2 días consecutivos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">Descanso</div>
                <div className="text-sm opacity-90">2 días consecutivos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCalendar2026;