import { AdminStudents } from "../services/models";
import noPhoto from "../images/no-photo.jpg";

export const TableStudents = ({ students }: { students: AdminStudents[] }) => {
  return (
    <table className="mt-[31px] w-full rounded-lg border">
      <thead className="border-b">
        <tr className=" px-6 py-4 grid grid-cols-7 gap-[20px]">
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left col-span-1"></th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left col-span-2">
            name
          </th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left col-span-2">
            email
          </th>
          <th className=" uppercase text-[14px] font-semibold opacity-80 text-left col-span-2">
            classes
          </th>
        </tr>
      </thead>
      <tbody>
        {!students?.length ? (
          <tr>
            <td className="bg-white py-6 text-center italic opacity-75">
              There are no users yet
            </td>
          </tr>
        ) : (
          students?.map((student) => {
            const thePhoto = student.profilePhoto
              ? student.profilePhoto
              : noPhoto;
            return (
              <tr
                key={student._id}
                className="bg-white px-6 py-4 grid grid-cols-7 gap-[20px] text-[14px]
                   opacity-80 border-b items-center"
              >
                <td className="col-span-1">
                  <img
                    src={thePhoto}
                    className="rounded-full border w-9 h-9 mx-auto"
                  />
                </td>
                <td className="col-span-2">{student.name}</td>
                <td className="col-span-2">{student.email}</td>
                <td className="col-span-2">{student.classCount}</td>
              </tr>
            );
          })
        )}
      </tbody>
      <tfoot className=" px-6 py-3 flex justify-between text-[14px] items-center"></tfoot>
    </table>
  );
};
