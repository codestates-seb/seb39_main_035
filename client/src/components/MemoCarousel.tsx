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
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    // nextArrow: (
    //   <Div>
    //     <Next className='left-arrow' />
    //   </Div>
    // ),
    // prevArrow: (
    //   <DivPre>
    //     <Prev className='right-arrow' />
    //   </DivPre>
    // ),
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
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
    color: var(--gray);
    font-size: 30px;
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
  border-radius: 5px;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 1px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
  border-radius: 5px;
`;
