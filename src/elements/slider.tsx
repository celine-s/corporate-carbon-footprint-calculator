import { FC } from 'react';
import { Copy } from '../identity/copy';

type Props = {
  callback: (value: { [key: string]: string }) => void;
  answer: { [key: string]: string };
};

export const Slider: FC<Props> = ({ answer, callback }) => {
  return (
    <div className="flex flex-row">
      <input
        type="range"
        min="1"
        max="100"
        value={answer?.percentage}
        className="w-full h-8 bg-opacity-70 hover:opacity-100"
        onChange={(e) => {
          callback({ percentage: e.target.value });
        }}
      />
      <div className="ml-4 -mt-3">
        <Copy>{answer?.percentage}%</Copy>
      </div>
    </div>
  );
};
