// import { useEffect } from "react";
import AnimatedContent from "./AnimatedContent";
import ContactBtn from "./ContactBtn";
import ProjectDisplay from "./ProjectDisplay";
import useFetch from "./useFetch";
// import MyProjectsDisplay from "./MyProjectsDisplay";

const Projects = () => {
    type pro = {
        category: string,
            id: number,
            counter: number,
            thumbnail: string,
            img: string[],
            title: string,
            skills: string,
            url: string,
            repo: string
        }
        const url: string = "http://localhost:8000/projects";
        const {data : projects, isLoading, error} = useFetch<pro>(url);
        
    return ( 
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between jus">
                <AnimatedContent
                                        distance={150}
                                        direction="horizontal"
                                        reverse={false}
                                        duration={1.2}
                                        ease="power3.out"
                                        initialOpacity={0.0}
                                        animateOpacity
                                        scale={1.1}
                                        threshold={0.2}
                                        delay={0.9}
                                        >
                    <h2 className="text-5xl">Projects</h2>
                </AnimatedContent>
                <AnimatedContent
                        distance={150}
                        direction="horizontal"
                        reverse={true}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.0}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                        delay={0.9}
                        >

                <ContactBtn/>
                        </AnimatedContent>
            </div>
            <div className="text-white pb-7 flex gap-7 border-b-2 border-b-paragraph">
                <button className="cursor-pointer hover:text-highlight transition-all hover:scale-110 font-bold">All</button>
                <button className="cursor-pointer hover:text-highlight transition-all hover:scale-110 font-bold">Frontend</button>
                <button className="cursor-pointer hover:text-highlight transition-all hover:scale-110 font-bold">Game-Dev</button>
                <button className="cursor-pointer hover:text-highlight transition-all hover:scale-110 font-bold">3D-Modeling</button>
                <button className="cursor-pointer hover:text-highlight transition-all hover:scale-110 font-bold">Animation</button>
            </div>
            <ProjectDisplay projects={projects} isLoading={isLoading} error={error}/>
            
        </div>
    );
}

export default Projects;