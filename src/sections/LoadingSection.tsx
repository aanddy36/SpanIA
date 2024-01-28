import { FadeLoader } from "react-spinners";

export const LoadingSection = () => {
  return (
    <div className="h-[300px] w-full grid place-content-center">
      <FadeLoader
        color="#E31010"
        height={30}
        margin={14}
        radius={4}
        width={10}
      />
    </div>
  );
};
