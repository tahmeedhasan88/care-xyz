import Image from "next/image";
import Banner from "./Components/Home/Banner";
import AboutUs from "./Components/Home/AboutUs";
import Services from "./Components/Home/Services";


export default function Home() {
  return (
    <div className="">
      <section>
        <Banner></Banner>
      </section>

      <section>
        <AboutUs></AboutUs>
      </section>

      <section>
        <Services></Services>
      </section>
     
      

    </div>
  );
}
