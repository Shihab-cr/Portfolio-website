import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// solid icons you already have
import { faCoffee, faUser, faBell, faBars } from "@fortawesome/free-solid-svg-icons";

// add the brand icons you use
import { faGithub, faYoutube, faLinkedin, faArtstation } from "@fortawesome/free-brands-svg-icons";
// import StaggeredMenu from "./StaggeredMenu";
import { useState } from "react";

library.add(faCoffee, faUser, faBell, faGithub, faYoutube, faLinkedin);

const Header = () => {
    const goTop = (): void=>{scrollTo({top: 0, behavior: "smooth"})};

    const [isShowingNavs, setIsShowing] = useState(false);
    const handleBurger = ()=>{
        setIsShowing(!isShowingNavs);
    }
    return (
        <div className="z-20 bg-transparent pt-10 pb-16 header">
            {/* <div className="container max-w-4xl ml-auto mr-auto "> */}
                <div className="flex flex-row justify-between pb-5 text-2xl header">
                    <h3 className="font-bold text-white cursor-pointer hover:text-highlight" onClick={goTop}>Shihab.Rehan</h3>
                    <div className="social-media">
                        <a href="https://github.com/Shihab-cr" className="text-white"><FontAwesomeIcon icon={faGithub}/></a>
                        <a href="https://www.linkedin.com/in/shihab-rehan-1ba9a1292/" className="text-white"><FontAwesomeIcon icon={faLinkedin}/></a>
                        <a href="https://www.youtube.com/@shihabrehan7054" className="text-white"><FontAwesomeIcon icon={faYoutube}/></a>
                        <a href="https://www.artstation.com/shihab_rehan" className="text-white"><FontAwesomeIcon icon={faArtstation}/></a>
                    </div>
                        {/* <button className="navBars"><FontAwesomeIcon icon={faBars}/></button> */}
                    {/* <div className="h-dvh navBars w-dvh overflow-hidden">
                        <StaggeredMenu
                            className="navBars p-0 m-0"
                            position="right"
                            items={menuItems}
                            socialItems={socialItems}
                            displaySocials={true}
                            displayItemNumbering={true}
                            menuButtonColor="#fff"
                            openMenuButtonColor="#fff"
                            changeMenuColorOnOpen={true}
                            colors={['#B19EEF', '#5227FF']}
                            logoUrl="/path-to-your-logo.svg"
                            accentColor="#ff6b6b"
                            onMenuOpen={() => console.log('Menu opened')}
                            onMenuClose={() => console.log('Menu closed')}
                            />
                        </div> */}
                        <button onClick={()=>{handleBurger(); goTop();}} className="navBars"><FontAwesomeIcon icon={faBars} />
                        </button>
                        <div className="menu-border">
                            <div className={isShowingNavs? "drop-down-menu": "close-menu"}>
                                <a href="https://github.com/Shihab-cr" className="text-white"><FontAwesomeIcon icon={faGithub}/></a>
                                <a href="https://www.linkedin.com/in/shihab-rehan-1ba9a1292/" className="text-white"><FontAwesomeIcon icon={faLinkedin}/></a>
                                <a href="https://www.youtube.com/@shihabrehan7054" className="text-white"><FontAwesomeIcon icon={faYoutube}/></a>
                                <a href="https://www.artstation.com/shihab_rehan" className="text-white"><FontAwesomeIcon icon={faArtstation}/></a>
                            </div>
                        </div>
                        <div className={isShowingNavs? "menu-shadow-show":"menu-shadow-hide"} onClick={handleBurger}/>
                        
                </div>
            {/* </div> */}
        </div>
        );
}
 
export default Header;