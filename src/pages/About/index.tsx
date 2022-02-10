import React, { useState } from "react";
interface IAboutProps {
  test?: string;
}

const About: React.FC<IAboutProps> = () => {
  const [num, setNum] = useState<number>(0);
  const handleClick = () => {
    setNum(num + 1);
  };
  return (
    <div>
      num:{num}
      <button onClick={handleClick}>click</button>
    </div>
  );
};
export default About;
