import Landing from "./Landing";
import Skills from "./Skills";
import Projects from "./Projects";
import Header from "./Header";
import Contact from "./Contact";
import PageProvider from "./PageContext";
import { TracingBeam } from "./components/ui/tracing-beam";
const Home = () => {
    return (
        <div>
            <PageProvider>
                <TracingBeam className="px-6">

            <div className="-z-20">
                <div className='-z-20 max-w-4xl mr-auto ml-auto pl-3 pr-3'>
                    <Header/>
                    <Landing/>
                    <Skills/>
                    <Projects/>
                </div>
            </div>
            <div className="bg-secondary">
                <div className='-z-20 max-w-4xl mr-auto ml-auto pl-3 pr-3'>
                    <Contact/>
                    
                </div>
            </div> 
                </TracingBeam>
            </PageProvider>
        </div>
    );
}

export default Home;