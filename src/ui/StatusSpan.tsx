import { ClassesStatus } from "../services/fakeUser"

export const StatusSpan = ({status}:{status:ClassesStatus}) => {
  return (
    <span
          className={`rounded-full px-2 tablet:px-4 py-[2px] text-[14px] ${
            status === ClassesStatus.DONE
              ? " bg-green"
              : status === ClassesStatus.IN_COMING
              ? " bg-blue"
              : status === ClassesStatus.IN_PROGRESS
              ? " bg-yellow"
              : " bg-rose-300"
          }`}
        >
          {status}
        </span>
  )
}
