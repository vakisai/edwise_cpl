import Rules from "@components/Rules";
import Image from "next/image";

const LearnMore = () => {
  return (
    <div className="w-full flex flex-col items-center py-20">
      <div className="w-full flex flex-wrap justify-center max-md:w-full gap-10">
        <Rules />
      </div>
    </div>
  );
};

export default LearnMore;
