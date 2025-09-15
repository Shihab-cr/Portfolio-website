/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
import { useEffect, useMemo, useState } from "react";
import AnimatedContent from "./AnimatedContent";
import ContactBtn from "./ContactBtn";
import PillFilters from "./PillFilters";

import ProjectDisplay from "./ProjectDisplay";
import useFetch from "./useFetch";
// import MyProjectsDisplay from "./MyProjectsDisplay";
// const getDataUrl = () => {
//   // Try Vite env first, then CRA env, then fallback to public db.json
//   // NOTE: in Vite use import.meta.env.VITE_API_URL, in CRA use process.env.REACT_APP_API_URL
//   const viteBase = typeof import.meta !== "undefined" ? (import.meta.env as any)?.VITE_API_URL : undefined;
//   const craBase = process.env.REACT_APP_API_URL;
//   const base = viteBase || craBase || "";
//   if (!base) return "/db.json"; // place db.json inside public/
//   // ensure no trailing slash and append /projects if that's your API endpoint
//   return base.replace(/\/$/, "") + "/projects";
// };
const Projects = () => {
    const logo: string = "./imgs/filter-icon-0.png";
    const url: string = "/db.json";
    
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
        // const url: string = "http://localhost:8000/projects";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const {data : projects, isLoading, error} = useFetch<any>(url);
        const [filteredProjects, setFilteredProjects] = useState<pro[]>([]);
        const [filter, setFilterValue] = useState("");
        const projectArray= useMemo<pro[]>(()=>{
            if(!projects) return [];
            if(Array.isArray(projects)) return projects as pro[];
            if(typeof projects === "object" ){
                return Object.entries(projects).map(([k,v])=>{
                    if (v && typeof v === "object" && ("id" in (v as any) || "title" in (v as any))) {
                    // keep the value but ensure id exists
                    return { id: (v as any).id ?? k, ...(v as object) } as pro;
                    }
                     return ({ id: k, ...(v as object) } as unknown as pro);
                    });
            }
            return [];
        },[projects])
        const handleFilters = ()=>{
            
            if(filter == "all" || filter == ""){
                setFilteredProjects(projectArray);
            }
            else if(filter == "3d"){
                const temp: pro[] = projectArray.filter((project: pro)=>{
                    return project.category == "Model";
                })
                setFilteredProjects(temp);
            }
            else if(filter == "ui"){
                const temp: pro[] = projectArray.filter((project:pro)=>{
                    return project.category == "Frontend";
                })
                setFilteredProjects(temp);
            }
        }
        useEffect(()=>{
            handleFilters();
        },[filter, projectArray]);

    return ( 
        <div className="flex flex-col gap-10 projects -z-0">
            <div className="flex flex-row justify-between jus -z-0">
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
                <PillFilters
                    logo={logo}
                    items={[
                        { label: 'All', value: 'all', onClick: ()=>{
                            setFilterValue("all");
                        } },
                        { label: '3D-Models', value: '3d', onClick: ()=>{
                            setFilterValue("3d");
                        } },
                        { label: 'Game-Dev', value: 'game', onClick: ()=>{
                            setFilterValue("game");
                        } },
                        { label: 'Frontend', value: 'ui', onClick: ()=>{
                            setFilterValue("ui");
                        } },
                        { label: 'Animation', value: 'animation', onClick: ()=>{
                            setFilterValue("animation");
                        } }
                    ]}
                    
                />
                
            </div>
            <ProjectDisplay projects={filteredProjects} isLoading={isLoading} error={error}/>
            
        </div>
    );
}

export default Projects;