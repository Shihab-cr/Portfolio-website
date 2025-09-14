import Landing from "./Landing";
import Skills from "./Skills";
import Projects from "./Projects";
import Header from "./Header";
import Contact from "./Contact";
import PageProvider from "./PageContext";
const Home = () => {
    return (
        <div>
            <PageProvider>

            <div className="">
                <div className='max-w-4xl mr-auto ml-auto pl-3 pr-3'>
                    <Header/>
                    <Landing/>
                    <Skills/>
                    <Projects/>
                </div>
            </div>
            <div className="bg-secondary">
                <div className='max-w-4xl mr-auto ml-auto pl-3 pr-3'>
                    <Contact/>
                    <Header/>
                </div>
            </div> 
            </PageProvider>
        </div>
    );
}

export default Home;