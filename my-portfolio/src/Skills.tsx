// import AnimatedContent from "./AnimatedContent"
import { useEffect, useState } from "react";
import BlurText from "./BlurText"
import DotGrid from "./DotGrid"
import { usePage } from "./PageContext";
import SkillBox from "./SkillBox"
const Skills = ()=>{
    function handleAnimationComplete(): void {
        console.log("animation completed");
    }
    const {isFrontend, isGameDev, isModel, isAnimation} = usePage();
    const [skillType, setType] = useState("Frontend");
    useEffect(()=>{
        if(isFrontend){
            setType("Frontend");
        }
        else if(isGameDev){
            setType("Game-Dev");
        }
        else if(isModel){
            setType("3D-Modeling");
        }
        else if(isAnimation){
            setType("Animation");
        }
        else{
            setType("");
        }
    },[isFrontend,isAnimation, isGameDev, isModel]);
    return(
        <div className="z-1 relative w-full min-h-[480px] overflow-hidden">
            
            <div className="absolute inset-0">
    <DotGrid className="w-full h-full"
        dotSize={5}
        gap={15}
        baseColor="#242424"
        activeColor="#4ee1a0"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        />
        </div>

        <div className="flex mr-auto pl-14 max-w-fit">
        <BlurText
                        text="Skills."
                        delay={700}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="mb-10 text-5xl font-bold font-sans text-highlight pt-12 text-center "
                        />
        <BlurText
                        text={skillType}
                        delay={750}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="ml-0 mr-0 mb-10 text-5xl font-bold font-sans text-white pt-12 text-center "
                        />
        </div>

        
            {isFrontend && 
                <div className="My-Skills">
                    <SkillBox skillName={"HTML"} yearsOfExp={4}/>
                    <SkillBox skillName={"CSS"} yearsOfExp={4}/>
                    <SkillBox skillName={"JavaScript"} yearsOfExp={3}/>
                    <SkillBox skillName={"React"} yearsOfExp={2}/>
                    <SkillBox skillName={"TypeScript"} yearsOfExp={2}/>
                    <SkillBox skillName={"Json"} yearsOfExp={2}/>
                    <SkillBox skillName={"VScode"} yearsOfExp={3}/>
                    <SkillBox skillName={"Github"} yearsOfExp={2}/>
                    <SkillBox skillName={"Tailwind"} yearsOfExp={2}/>
            </div>
            }
            {isGameDev &&
                <div className="My-Skills">
                    <SkillBox skillName={"C#"} yearsOfExp={4}/>
                    <SkillBox skillName={"C++"} yearsOfExp={4}/>
                    <SkillBox skillName={"Java"} yearsOfExp={3}/>
                    <SkillBox skillName={"Oop"} yearsOfExp={2}/>
                    <SkillBox skillName={"Unity"} yearsOfExp={2}/>
                    <SkillBox skillName={"Audio editing"} yearsOfExp={2}/>
                    <SkillBox skillName={"Blender"} yearsOfExp={3}/>
                    <SkillBox skillName={"PixelArt"} yearsOfExp={2}/>
                    <SkillBox skillName={"Game Physics"} yearsOfExp={2}/>
                    <SkillBox skillName={"Visual Studio"} yearsOfExp={2}/>
            </div>
            }
            {isModel &&
                <div className="My-Skills">
                    <SkillBox skillName={"Blender"} yearsOfExp={4}/>
                    <SkillBox skillName={"Substance Painter"} yearsOfExp={2}/>
                    <SkillBox skillName={"Materialize"} yearsOfExp={4}/>
                    <SkillBox skillName={"Ministry of flat"} yearsOfExp={3}/>
                    <SkillBox skillName={"3D-modeling"} yearsOfExp={2}/>
                    <SkillBox skillName={"UV-unwrapping"} yearsOfExp={2}/>
                    <SkillBox skillName={"Texturing"} yearsOfExp={2}/>
                    <SkillBox skillName={"Sculpting"} yearsOfExp={2}/>
                    <SkillBox skillName={"Retoplogy"} yearsOfExp={2}/>
            </div>
            }
            {isAnimation &&
                <div className="My-Skills">
                    <SkillBox skillName={"After Effect"} yearsOfExp={4}/>
                    <SkillBox skillName={"Illustrator"} yearsOfExp={2}/>
                    <SkillBox skillName={"Premiere Pro"} yearsOfExp={4}/>
                    <SkillBox skillName={"Obs-studio"} yearsOfExp={2}/>
                    <SkillBox skillName={"Davinci Resolve"} yearsOfExp={3}/>
                    <SkillBox skillName={"Miro"} yearsOfExp={2}/>
            </div>
            }
        </div>
    )
}
export default Skills