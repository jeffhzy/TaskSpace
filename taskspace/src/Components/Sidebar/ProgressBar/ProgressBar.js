import "./ProgressBar.css"

const ProgressBar = (props) => {
    const progress = props.progress;
return(

    <div className="progressbar-container">
        <div className="progress-bar" style = {{width: progress}}><label className="label">{progress}</label></div>
        
    </div>

);
};

export default ProgressBar;