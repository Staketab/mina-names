import HomeSection from "@/components/sections/homeSection/homeSection";
import style from "./page.module.css";
import OverlayWrapper from "@/components/molecules/popupOverlay/overlayWrapper";

export default function Home() {
  return (
    <>
      <OverlayWrapper />
      <div className={style.home}>
        <HomeSection />
      </div>
    </>
  );
}
