import CartigoryCard from "../components/home/CartigoryCard";
import Hero from "../components/home/Hero/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full mx-auto place-items-center relative">
      <div className=" w-full max-h-[80vh]  ">
        <Hero />
        {/* grid with 8 different departments */}
        {/*
       Electonics
       Fashion
       Home & Office
       Laptop & Accessories
       Phones
       Tablets
       jewelry
       grocery

      */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16"></div> */}

        {/* best seller section */}
      </div>

      <div className="mt-24 place-items-center w-full px-14">
        <CartigoryCard />
      </div>
    </div>
  );
}
