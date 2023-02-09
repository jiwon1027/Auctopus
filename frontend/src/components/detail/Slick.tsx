import React, { useMemo } from "react";
import Slider, { Settings } from "react-slick";

interface sliderProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  speed?: number;
  loop?: number;
}
// interface itemProps {
//   auctionImageList: [];
// }
// const imgList: itemProps[] = [];
interface imgItemProps {
  auctionImageSeq: number;
  auctionSeq: number;
  imageUrl: string;
}

export default function Slick(
  {
    children,
    className,
    autoplay = false,
    speed = 300,
    loop = true,
  }: sliderProps,
  { auctionInfo }: imgItemProps[]
) {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
    }),
    [autoplay, loop, speed]
  );
  console.log(auctionInfo);
  return <Slider {...settings}>{children}</Slider>;
}
// function Item() {
//   return (
//     <Slick>
//       {items.map((item, index) => (
//         <SliderItem key={index}>
//           <img src={item.item} alt={item.name} />
//         </SliderItem>
//       ))}
//     </Slick>
//   );
// }
// //
