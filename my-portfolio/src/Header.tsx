import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// solid icons you already have
import { faCoffee, faUser, faBell, faBars } from "@fortawesome/free-solid-svg-icons";

// add the brand icons you use
import { faGithub, faYoutube, faLinkedin, faArtstation } from "@fortawesome/free-brands-svg-icons";

library.add(faCoffee, faUser, faBell, faGithub, faYoutube, faLinkedin);

const Header = () => {
    const goTop = (): void=>{scrollTo({top: 0, behavior: "smooth"})};
    return (
        <div className="bg-transparent sticky pt-10 pb-16">
            {/* <div className="container max-w-4xl ml-auto mr-auto "> */}
                <div className="flex flex-row justify-between pb-5 text-2xl">
                    <h3 className="font-bold text-white cursor-pointer hover:text-highlight" onClick={goTop}>Shihab.Rehan</h3>
                    <div className="social-media">
                        <a href="https://github.com/Shihab-cr" className="text-white"><FontAwesomeIcon icon={faGithub}/></a>
                        <a href="https://www.linkedin.com/in/shihab-rehan-1ba9a1292/" className="text-white"><FontAwesomeIcon icon={faLinkedin}/></a>
                        <a href="https://www.youtube.com/@shihabrehan7054" className="text-white"><FontAwesomeIcon icon={faYoutube}/></a>
                        <a href="https://www.artstation.com/shihab_rehan" className="text-white"><FontAwesomeIcon icon={faArtstation}/></a>
                    </div>
                        <button className="navBars"><FontAwesomeIcon icon={faBars}/></button>
                </div>
            {/* </div> */}
        </div>
        );
}
 
export default Header;