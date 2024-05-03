import Houses from "./components/houses/Houses";
import News from "./components/news/News";
import Search from "./components/search/Search";
import SellEstate from "./components/sellEstate/SellEstate";
import Slider from "./components/slider/Slider";
import styles from "./styles/page.module.scss"
import { UserProvider } from "./providers/userProvider";
import Navbar from "./components/navbar/Navbar";
export default function Home() {

  

  return (
    <>
     <Navbar/>
    <UserProvider>
    <Slider/>
    <Search/>
    <Houses/>
    <SellEstate/>
    <News/>
    </UserProvider>
    </>
  );
}
