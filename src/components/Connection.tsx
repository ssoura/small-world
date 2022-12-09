import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";

interface ConnectionProps {
  hideArrow: boolean;
  name: string;
}

const Connection = ({ hideArrow, name }: ConnectionProps) => {
  return (
    <div className="mt-2 gap-2 md:ml-4 flex flex-col md:py-2 md:flex-row">
      <div className="flex flex-row-reverse md:flex-col items-center">
        {!hideArrow && (
          <>
            <span className="md:hidden">
              <AiOutlineArrowDown />
            </span>
            <span className="hidden md:flex">
              <AiOutlineArrowRight />
            </span>
          </>
        )}
      </div>
      <div className="bg-main-800 p-2 rounded-md">{name}</div>
    </div>
  );
};

export default Connection;
