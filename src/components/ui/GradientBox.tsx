interface GradientBoxPropTypes {
  text: string;
}

const GradientBox = ({ text }: GradientBoxPropTypes) => (
  <div className="rounded-lg bg-gradient-to-r from-[#8804ad] to-main-700 p-[2px]">
    <div className="p-2 rounded-lg bg-gray-800">{text}</div>
  </div>
);

export default GradientBox;
