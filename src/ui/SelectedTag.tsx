import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaCalendarDays } from 'react-icons/fa6';
import { formatDayOfTheWeek, formatMonth, stringedHour } from '../services/helperFunctions';

export const SelectedTag = () => {
    const { selectedCells } = useSelector(
        (store: RootState) => store.reserveClass
      );
      let startDate = selectedCells && new Date(selectedCells[0].time)
      let endingDate = selectedCells && new Date(selectedCells[selectedCells.length-1].time)
      endingDate?.setMinutes(endingDate.getMinutes()+30)
      let theDay = formatDayOfTheWeek(startDate?.getDay() as number)
      let theMonth = formatMonth(startDate?.getMonth() as number)
      let theDate = startDate?.getDate();
      let startingHour = stringedHour(startDate as Date)
      let endingHour = stringedHour(endingDate as Date)
      
  return (
    <div className="bg-notAvail rounded-full text-[14px] py-[2px] px-6 border font-medium opacity-80 
    flex items-center gap-4">
       <FaCalendarDays className="opacity-60"/>
     {`${theDay} ${theMonth} ${theDate} | ${startingHour} - ${endingHour}`}
   </div>
  )
}
