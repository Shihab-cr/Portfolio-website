import AnimatedContent from "./AnimatedContent";
import BlurText from "./BlurText";
import ContactBtn from "./ContactBtn";
import Dock from "./Docker";
// import DarkVeil from "./DarkVeil";
import SplitText from "./SplitText"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// solid icons you already have
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

// add the brand icons you use
import {} from "@fortawesome/free-brands-svg-icons";
import { faCode, faCube, faGamepad, faPlay} from "@fortawesome/free-solid-svg-icons";
import { usePage } from "./PageContext";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";

library.add();

const Landing = () => {
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    const {setIsFrontend, setIsGameDev, setIsAnimation, setIsModel} = usePage();
        const items = [
    { icon: <FontAwesomeIcon icon={faCode} fade className="text-white cursor-pointer hover:text-highlight"/>, label: 'frontend', onClick: () =>{
        setIsFrontend(true); setIsGameDev(false); setIsAnimation(false); setIsModel(false);
    }},
    { icon: <FontAwesomeIcon icon={faGamepad} shake className="text-white cursor-pointer hover:text-highlight"/>, label: 'game development', onClick: () =>{
        setIsFrontend(false); setIsGameDev(true); setIsAnimation(false); setIsModel(false);
    }},
    { icon: <FontAwesomeIcon icon={faCube} bounce className="text-white cursor-pointer hover:text-highlight"/>, label: '3D-modeling', onClick: () =>{
        setIsFrontend(false); setIsGameDev(false); setIsAnimation(false); setIsModel(true);
    }},
    { icon: <FontAwesomeIcon icon={faPlay} beat className="text-white cursor-pointer hover:text-highlight"/>, label: 'Motion-Graphics', onClick: () => {
        setIsFrontend(false); setIsGameDev(false); setIsAnimation(true); setIsModel(false);
    }},
  ];

    return ( 
        <div className="landing w-full  relative -z-0">
            
            <div className="salute z-10">
                <h1 className="text-5xl text-white font-sans font-bold max-w-full ">
                    
                    <SplitText
                    text="Sallam Alykom, It is nice to meet you. I am"
                    className="splitText text-5xl text-white font-sans font-bold max-w-full"
                    delay={40}
                    duration={0.3}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                    onLetterAnimationComplete={handleAnimationComplete}
                    />
                    <AnimatedContent
                        distance={150}
                        direction="vertical"
                        reverse={false}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.0}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                        delay={1.9}
                        >
                        
                    <span className="highlight block max-w-fit pb-2.5">Shihab Rehan.</span>
                        </AnimatedContent>
                    </h1>
                    <AnimatedContent
                        distance={10}
                        direction="vertical"
                        reverse={false}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.0}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                        delay={2.5}
                        >

                    <BlurText
                        text="Based in Cairo, I am a multimedia and graphics design engineer passionate about mixing between stunning viusal graphics and programming."
                        delay={300}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="mb-16 text-lg font-sans max-w-3/3 text-paragraph pt-12"
                        />
                        </AnimatedContent>
                <p className=" ">
                </p>
                <AnimatedContent
                        distance={50}
                        direction="horizontal"
                        reverse={true}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.0}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                        delay={1}
                        >
                    <ContactBtn/>
                </AnimatedContent>
            </div>
            <div className="img-holder">
            </div>

        <Dock 
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}

            className="mt-17 mb-14 w-full self-center text-center flex justify-evenly"
        />
        </div>
    );
}

export default Landing;