import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  MdArrowForwardIos as Next,
  MdArrowBackIos as Prev,
} from 'react-icons/md';

type CarouselProps = {
  children?: React.ReactNode;
};

const Carousel = ({ children }: CarouselProps) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 3,
    speed: 800,
    nextArrow: (
      <Div>
        <Next className='left-arrow' />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <Prev className='right-arrow' />
      </DivPre>
    ),

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
        breakpoint: 370,
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
    align-items: baseline;
    margin-left: 0.6rem;
    margin-right: 0.6rem;
  }

  .slick-prev::before,
  .slick-next::before {
    /* opacity: 0;
    display: none; */
    color: var(--gray);
    font-size: 2rem;
  }
`;

const Div = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 0.3rem;
  z-index: 99;
  text-align: right;
  line-height: 1.88rem;
  border-radius: 0.6rem;
  /* .left-arrow {
    font-size: 30px;
    color: var(--gray);
  } */
`;
const DivPre = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  left: 0.3rem;
  z-index: 99;
  text-align: left;
  line-height: 1.88rem;
  border-radius: 5px;
  /* .right-arrow {
    font-size: 30px;
    color: var(--gray);
  } */
`;
