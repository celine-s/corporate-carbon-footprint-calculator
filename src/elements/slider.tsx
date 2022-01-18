import { FC } from 'react';
import { Copy } from '../identity/copy';

type Props = {
  callback: (value: { [key: string]: string }) => void;
  answer: { [key: string]: string };
};

export const Slider: FC<Props> = ({ answer, callback }) => {
  return (
    <div className="flex flex-col">
      <input
        type="range"
        min="0"
        max="100"
        step="10"
        value={answer?.percentage}
        className="slider h-3 rounded-md bg-opacity-70 hover:opacity-100"
        onChange={(e) => {
          callback({ percentage: e.target.value });
        }}
      />
      <div>
        <Copy>Prozentanteil im Homeoffice: {answer?.percentage}%</Copy>
      </div>
    </div>
  );
};
