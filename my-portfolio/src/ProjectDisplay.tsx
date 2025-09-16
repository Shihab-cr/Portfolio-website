import { type JSX } from "react"
import { Link } from "react-router-dom"
import AnimatedContent from "./AnimatedContent"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";

// // solid icons you already have
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

// // add the brand icons you use
// import {} from "@fortawesome/free-brands-svg-icons";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";

// library.add();


type Pro = {
  id: number;
  category: string;
  
  thumbnail?: string;
  img: string[];
  title: string;
  skills: string;
  url: string;
  repo: string;
};

type displayProps={
    projects: Pro[],
    isLoading: boolean,
    error: string
}

function ProjectDisplay({projects, isLoading, error}: displayProps):JSX.Element{
    // const handleCounterIncrement = (max:number)=>{
    //     setCounter(counter+1);
    //     if(counter>max){
    //         setCounter(0);
    //     }
    // }
    // const handleCounterDecrement = (max:number)=>{
    //     setCounter(counter-1);
    //     if(counter<0){
    //         setCounter(max);
    //     }
    // }
    
    return(
        <div className="projects-grid">
            {isLoading && <div className="loading">Loading...</div>}
            {error !== "" && <div className="error">Error: {error}</div>}
            {projects && projects.map((project: Pro, index: number)=>{
                
                if(project.category == "Frontend"){
                return(
                    
                    <div key={index} className="flex flex-col gap-4 self-center justify-around">
                        <AnimatedContent
                            distance={150}
                            direction="vertical"
                            reverse={false}
                            duration={1.2}
                            ease="power3.out"
                            initialOpacity={0}
                            animateOpacity
                            scale={1.1}
                            threshold={0.2}
                            delay={0.8}
                            >
                        
                        <div className="project-overview h-64 w-full relative top-0">
                            <img src={project.thumbnail} alt="project image" className="myImg w-full h-full object-cover"/>
                            {/* <FontAwesomeIcon icon={faAngleLeft} onClick={()=>handleCounterDecrement(project.img.length, counter)}/>
                            <FontAwesomeIcon icon={faAngleRight} onClick={()=>handleCounterIncrement(project.img.length, counter)}/> */}

                            <div className="more">
                                <a href={project.url} className="contact uppercase">Live Preview</a>
                                <Link to={`/projects/${project.id}`} className="contact uppercase">Project Details</Link>
                            </div>
                        </div>
                        <h3 className="text-white font-sans text-xl uppercase font-bold">{project.title}</h3>
                        <h4 className="text-paragraph pr-5 text-2xs uppercase">{project.skills}</h4>
                            </AnimatedContent>
                    </div>
                )
                }
                else if(project.category == "Model"){
                    return(
                        
                        <div key={index} className="flex flex-col gap-4 self-center justify-around">
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
                            delay={0.8}
                            >
                        
                        <div className="project-overview h-64 w-full relative top-0">
                            <img src={project.thumbnail} alt="project image" className="myImg w-full h-full object-cover"/>
                            <div className="more">
                                <a href={project.url} className="contact uppercase">Live Preview</a>
                                <Link to={`/projects/${project.id}`} className="contact uppercase">Project Details</Link>
                            </div>
                        </div>
                        <h3 className="text-white font-sans text-xl uppercase font-bold">{project.title}</h3>
                        <h4 className="text-paragraph pr-5 text-2xs uppercase">{project.skills}</h4>
                        </AnimatedContent>
                    </div>
                    )
                }
                
                })
            }
            {(!projects || projects.length === 0) && <div className="text-4xl text-center text-paragraph opacity-50">This is work in progress</div>}
        </div>
    )
}

export default ProjectDisplay