const ContactBtn = () => {
    const handleClick = (e: React.MouseEvent)=>{
        e.preventDefault();
        const el = document.getElementById("contact-me");
        el?.scrollIntoView({behavior:"smooth", block:"start"})
    }
    return (
        <button className="self-center"><h3 className="contact text-base capitalize text-bold " onClick={handleClick}>CONTACT ME</h3></button>
        );
}

export default ContactBtn;