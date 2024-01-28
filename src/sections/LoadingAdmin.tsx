import { FadeLoader } from "react-spinners";

export const LoadingAdmin = () => {
  return (
    <div className="h-full grid place-content-center">
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
