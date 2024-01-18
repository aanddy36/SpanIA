import { FaClock } from 'react-icons/fa6';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

export const AmountOfHoursTag = () => {
    const { selectedCells } = useSelector(
        (store: RootState) => store.adminSchedule
      );

  return (
    <div className="bg-notAvail rounded-full text-[14px] py-[2px] px-6 border font-medium opacity-80 
     flex items-center gap-4">
        <FaClock className="opacity-60"/>
      {selectedCells.length*0.5} hrs/week
    </div>
  );
}
