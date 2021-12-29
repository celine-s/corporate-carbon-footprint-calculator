import React, { FC } from 'react';

export type TrainProps = {
  active?: boolean;
};

export const TrainIcon: FC<TrainProps> = ({ active = false }) => {
  if (!active) {
    return (
      <div>
        <svg width="24" height="22" viewBox="0 0 1085 1010" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M942.323 783.558V140.592C942.323 98.778 905.758 64.741 860.839 64.741H766.444V46.864C766.444 26.563 748.759 10.1 726.95 10.1H358.05C336.242 10.1 318.556 26.563 318.556 46.864V64.741H224.161C179.242 64.741 142.678 98.778 142.678 140.592V783.558C142.678 825.372 179.242 859.409 224.161 859.409H238.7L154.396 953.844C144.956 964.449 142.244 975.862 147.018 985.154C151.683 994.547 162.859 999.9 177.615 999.9H300.654C324.741 999.9 353.493 985.053 366.188 966.065L437.581 859.409H647.311L718.704 966.065C731.399 985.053 760.26 999.9 784.238 999.9H907.277C922.033 999.9 933.209 994.547 937.874 985.154C942.648 975.761 939.936 964.348 930.496 953.844L846.3 859.409H860.839C905.758 859.409 942.323 825.372 942.323 783.558ZM345.79 46.864C345.79 40.602 351.323 35.451 358.05 35.451H726.95C733.677 35.451 739.211 40.602 739.211 46.864V64.741H345.79V46.864ZM197.47 783.558V452.985V140.592C197.47 112.716 194.215 116.15 224.161 116.15H860.839C890.785 116.15 892.413 112.716 892.413 140.592V783.558C892.413 811.434 890.785 805.98 860.839 805.98H224.161C194.215 805.98 197.47 811.333 197.47 783.558ZM343.077 952.632C335.265 964.348 315.41 974.549 300.654 974.549H177.615C175.228 974.549 173.6 974.347 172.515 974.044C173.058 973.135 173.926 971.721 175.336 970.105L274.071 859.51H405.465L343.077 952.632ZM909.664 970.004C911.183 971.721 912.051 973.034 912.485 973.943C911.4 974.246 909.664 974.448 907.386 974.448H784.347C769.591 974.448 749.735 964.247 741.923 952.531L679.536 859.308H810.929L909.664 970.004Z"
            fill="currentColor"
          />
          <path
            d="M799.838 160.59H291.861C262.762 160.59 223.51 198.336 223.51 223.993V495.322C223.51 520.979 262.762 556.51 291.861 556.51H799.838C828.937 556.51 861.49 520.979 861.49 495.322V223.993C861.594 198.336 828.937 160.59 799.838 160.59ZM826.32 495.322C826.32 508.151 814.492 518.671 799.838 518.671H291.861C277.312 518.671 265.379 508.243 265.379 495.322V223.993C265.379 211.164 277.207 200.643 291.861 200.643H799.838C814.387 200.643 826.32 211.072 826.32 223.993V495.322Z"
            fill="currentColor"
          />
          <path
            d="M355.446 613.979C309.551 613.979 272.118 648.723 272.118 691.547C272.118 734.27 309.442 769.115 355.446 769.115C401.342 769.115 438.774 734.371 438.774 691.547C438.774 648.723 401.45 613.979 355.446 613.979ZM355.446 735.28C324.524 735.28 304.885 720.231 304.885 691.446C304.885 662.661 324.524 644.885 355.446 644.885C386.369 644.885 403.62 662.661 403.62 691.446C403.62 720.231 386.369 735.28 355.446 735.28Z"
            fill="currentColor"
          />
          <path
            d="M730.483 613.979C684.587 613.979 647.155 648.723 647.155 691.547C647.155 734.27 684.479 769.115 730.483 769.115C776.378 769.115 813.811 734.371 813.811 691.547C813.811 648.723 776.487 613.979 730.483 613.979ZM730.483 735.28C699.56 735.28 679.922 720.231 679.922 691.446C679.922 662.661 699.56 644.885 730.483 644.885C761.405 644.885 778.657 662.661 778.657 691.446C778.657 720.231 761.405 735.28 730.483 735.28Z"
            fill="currentColor"
          />
          <path
            d="M729.555 613.979C683.659 613.979 646.227 648.723 646.227 691.547C646.227 734.27 683.551 769.115 729.555 769.115C775.45 769.115 812.883 734.371 812.883 691.547C812.774 648.723 775.45 613.979 729.555 613.979ZM729.555 743.663C698.632 743.663 673.46 720.231 673.46 691.446C673.46 662.661 698.632 639.229 729.555 639.229C760.477 639.229 785.649 662.661 785.649 691.446C785.541 720.231 760.477 743.663 729.555 743.663Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div>
        <svg width="24" height="24" viewBox="0 0 985 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M763 792.5H819.7C837 792.5 851.1 778.4 851.1 761.1V156.1C851.1 112.7 815.9 77.6 772.6 77.6H600.2V32.7H399.8V77.5H227.4C184.1 77.5 148.9 112.7 148.9 156V761.1C148.9 778.5 163 792.5 180.3 792.5H237L10 967.3H155.9L333.7 792.6H666.3L844.1 967.3H990L763 792.5ZM666.3 693.5C666.3 666.9 687.8 645.4 714.4 645.4C741 645.4 762.5 666.9 762.5 693.5C762.5 720.1 741 741.6 714.4 741.6C687.8 741.6 666.3 720.1 666.3 693.5ZM289 741.6C262.4 741.6 240.9 720.1 240.9 693.5C240.9 666.9 262.4 645.4 289 645.4C315.6 645.4 337.1 666.9 337.1 693.5C337.1 720.1 315.5 741.6 289 741.6ZM242.8 492.9C234.1 492.9 227.1 485.9 227.1 477.2V173.1C227.1 164.4 234.1 157.4 242.8 157.4H757.3C766 157.4 773 164.4 773 173.1V477.2C773 485.9 766 492.9 757.3 492.9H242.8Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }
};