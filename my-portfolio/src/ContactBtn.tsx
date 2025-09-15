import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// solid icons you already have

// add the brand icons you use
import {} from "@fortawesome/free-brands-svg-icons";
import {faComments } from "@fortawesome/free-solid-svg-icons";

library.add();

const ContactBtn = () => {
    const handleClick = (e: React.MouseEvent)=>{
        e.preventDefault();
        const el = document.getElementById("contact-me");
        el?.scrollIntoView({behavior:"smooth", block:"start"})
    }
    return (
        <div>
            <button className="contactBtn1 self-center"><h3 className="contact text-base capitalize text-bold " onClick={handleClick}>CONTACT ME</h3></button>
            <button onClick={handleClick} className="contactBtn2"><FontAwesomeIcon icon={faComments} beatFade/></button>
        </div>
        );
}

export default ContactBtn;