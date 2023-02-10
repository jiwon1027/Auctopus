import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

interface IProps {
  auctionInfo: IAuctionDetail;
}

export default function Slick({ auctionInfo }: IProps) {
  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const imageList = auctionInfo.auctionImageList;
  console.log(imageList);
  return (
    <Slider {...settings}>
      {imageList.map((item, idx) => (
        <SliderItem key={idx}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={item.imageUrl}
            alt="img"
          />
        </SliderItem>
      ))}
    </Slider>
  );
}

const SliderItem = styled.div`
  width: 100%;
  height: 31rem;
`;
