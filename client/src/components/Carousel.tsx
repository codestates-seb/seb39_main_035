import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselProps = {
  children?: React.ReactNode;
};

const Carousel = ({ children }: CarouselProps) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <Wrapper>
      <StyledSlider {...settings}>{children}</StyledSlider>
    </Wrapper>
  );
};

export default Carousel;

const Wrapper = styled.div`
  width: 100%;
  align-items: baseline;
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    justify-content: flex-start;
  }
  .slick-slide {
    display: flex;
    height: 160px;
    align-items: baseline;
    justify-content: flex-start;
  }
`;
