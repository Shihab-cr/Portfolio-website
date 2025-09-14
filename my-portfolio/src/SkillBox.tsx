import type { JSX } from "react";
import AnimatedContent from "./AnimatedContent"

type props={
    skillName: string,
    yearsOfExp: number
}
const SkillBox = ({skillName, yearsOfExp}:props):JSX.Element => {
    return ( 
        <div className="pb-0 mt-0">
            <AnimatedContent
                distance={10}
                direction="vertical"
                reverse={false}
                duration={1.2}
                ease="power3.out"
                initialOpacity={0.0}
                animateOpacity
                scale={1.4}
                threshold={0.2}
                delay={0.3}
                >

            <div className=" z-10 relative bg-transparent">
                <div className="skill-box">
                    <h2 className="text-white font-sans text-3xl font-semibold">{skillName}</h2>
                    <p className="text-paragraph font-sans text-base ">{yearsOfExp} years of experience</p>
                </div>
            </div>
        </AnimatedContent>
        </div>
     );
}
 
export default SkillBox;