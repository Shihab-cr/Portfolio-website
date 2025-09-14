import { useState } from "react";

const Contact = () => {
    const [nameIsChanged, setNameIsChanged] = useState(false);
    const [emailIsChanged, setEmailIsChanged] = useState(false);
    const [messageIsChanged, setMessageIsChanged] = useState(false);
    const handleNameChange = ()=>{
        setNameIsChanged(true);
    }
    const handleEmailChange = ()=>{
        setEmailIsChanged(true);
    }
    const handleMessageChange = ()=>{
        setMessageIsChanged(true);
    }
    return ( 
        <div className="contact-section" id="contact-me">
            <div>
                <h2 className=" font-bold pb-7 text-nowrap">Contact</h2>
                <p className="text-paragraph text-lg font-sans pt-2">I would love to hear about your project and how I could help. Please fill in the form, and I'll get back to you as soon as possible.</p>
            </div>
            <div className="flex flex-col gap-14">
                <input type="text" placeholder="Name" className="" onChange={handleNameChange}></input>
                <input type="text" placeholder="Email" className="" onChange={handleEmailChange}></input>
                <textarea placeholder="Message" className="" onChange={handleMessageChange}></textarea>
                <a href="#contact-me" className="self-end"><h3 className="contact text-base uppercase ">send message</h3></a>
            </div>
        </div>
    );
}
 
export default Contact;