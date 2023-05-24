const SideBarSelector = (props) =>{
    return (
        <div className="text-white display flex flex-row">
            {props.image}
            <h1>{props.desc}</h1>
        </div>
    );

};

export default SideBarSelector;