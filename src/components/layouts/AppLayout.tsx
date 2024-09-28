import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Spline from '@splinetool/react-spline';

import Carousel from "./Carousel";
import Feature from "./Feature";
import Main from "./Main";
import Nav from "./nav";
import  HorizontalScrollMenu  from "./horizontalScroll";

export function Applayout() {
  return (
    <div>
      < Nav/>
      <div className='absolute top-[10vh] right-0 h-[75vh] md:h-[85vh] w-[100vw] '>
        <Spline scene="https://prod.spline.design/sCisfYLQcqFSu6Bb/scene.splinecode" />
      </div>
      < Main />
      <HorizontalScrollMenu />
    </div>
  );
}
