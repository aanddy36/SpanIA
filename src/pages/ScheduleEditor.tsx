import { useDispatch, useSelector } from "react-redux";
import {
  activeConfirmPopup,
  getEditableGrid,
  toggleEditor,
} from "../features/adminSchedule/adminScheduleSlice";
import close from "../images/icons/close.svg";
import { EditorHeaderRow } from "../ui/EditorHeaderRow";
import { useEffect } from "react";
import { RootState } from "../store";
import { EditGridLegend } from "../ui/EditGridLegend";
import { EditorSchedule } from "../ui/EditorSchedule";
import { EditorAvailableLabel } from "../ui/EditorAvailableLabel";
import { AmountOfHoursTag } from "../ui/AmountOfHoursTag";
import { CloseEditorPopup } from "../ui/CloseEditorPopup";
import { ClearSchedulePopup } from "../ui/ClearSchedulePopup";
import { AddCurrentSchedulePopup } from "../ui/AddCurrentSchedulePopup";
import { SaveSchedule } from "../ui/SaveSchedule";
export const ScheduleEditor = () => {
  const dispatch = useDispatch();
  const {
    isEditorOpen,
    hoveredCell,
    confirmPopup,
    selectedCells,
    isCurrentScheduleAdded,
  } = useSelector((store: RootState) => store.adminSchedule);
  useEffect(() => {
    if (isEditorOpen) {
      dispatch(getEditableGrid());
    }
  }, [isEditorOpen, selectedCells]);
  /*   useEffect(() => {
    console.log(selectedCells);
  }, [selectedCells]); */
  return (
    <article className="w-full h-screen fixed bg-black/50 z-[999]">
      <div className=" w-full absolute bottom-0 h-[90%] rounded-t-lg bg-white">
        <button
          className=" cursor-pointer"
          onClick={() => {
            if (isCurrentScheduleAdded) {
              dispatch(toggleEditor(false));
            } else {
              dispatch(activeConfirmPopup("CLOSE_EDITOR"));
            }
          }}
        >
          <img
            src={close}
            className="absolute top-6 right-6 transition-transform duration-200 hover:rotate-90"
          />
        </button>

        <h1 className="text-xl font-medium w-full text-center">
          Select Your Schedule
        </h1>
        <h3 className="font-light w-full text-center mt-3 border-b pb-6">
          Pick the hours you'll be available to teach
        </h3>

        <EditGridLegend />

        <section className=" w-[928px] mx-auto h-[305px] border rounded-lg my-6">
          <div className="grid grid-cols-8 h-[35px]">
            <div className="text-xs grid place-content-center font-medium border-b border-r text-black/50">
              UTC - 05:00
            </div>
            <EditorHeaderRow />
          </div>

          <EditorSchedule />

          {hoveredCell && (
            <div
              className="absolute"
              style={{
                top: `${hoveredCell?.y}px`,
                left: `${hoveredCell?.x}px`,
              }}
            >
              <EditorAvailableLabel />
            </div>
          )}
        </section>

        <section className="border h-[71px] flex items-center justify-between px-6">
          <div className="flex items-center gap-14">
            <AmountOfHoursTag />
          </div>
          {selectedCells.length * 0.5 < 16 && (
            <span className="text-sm italic">
              You must have at least 16 hrs/week!
            </span>
          )}
          <div className="flex gap-6 items-center">
            <button
              className=" py-1 px-3 rounded-lg font-medium transition-opacity duration-200
             hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => dispatch(activeConfirmPopup("CLEAR_SCHEDULE"))}
              disabled={!selectedCells.length}
            >
              Clear Schedule
            </button>
            <button
              className="text-white bg-red rounded-lg py-1 px-3 uppercase font-semibold
         transition-opacity duration-200 hover:bg-red/50 disabled:bg-red/50 disabled:cursor-not-allowed"
              disabled={selectedCells.length * 0.5 < 16}
              onClick={() => {
                if (isCurrentScheduleAdded) {
                  dispatch(toggleEditor(false));
                } else {
                  dispatch(activeConfirmPopup("SAVE"));
                }
              }}
            >
              Save
            </button>
          </div>
        </section>
      </div>
      {confirmPopup && (
        <div className="w-full h-screen fixed bg-black/50 z-[999]">
          {confirmPopup === "CLOSE_EDITOR" ? (
            <CloseEditorPopup />
          ) : confirmPopup === "CLEAR_SCHEDULE" ? (
            <ClearSchedulePopup />
          ) : confirmPopup === "ADD_CURRENT" ? (
            <AddCurrentSchedulePopup />
          ) : (
            <SaveSchedule />
          )}
        </div>
      )}
    </article>
  );
};
