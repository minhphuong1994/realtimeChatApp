import React from "react";
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>({
    linkStyle:{    
        fontWeight:"bold",
        textDecoration: "underline",
        color: "#373738"
    }
}))

//check the message and replate URLs with <Link> tags
const MessageLinkDisplay=({styleName,message})=>{
    const classes = useStyles();
    //checking http or https follows by :// and any character other than white space 
    //(gi are modifiers, g= find all matches, i= case sensitive)
    const urlRE = /\bhttps?:\/\/\S+/gi;
    const hasLink = urlRE.test(message);
    if(hasLink) {
        const linkArr= message.match(urlRE);
        message = message.split(urlRE);        
        return (<Typography className={styleName}> 
            {
                message.map((text,index)=>{                   
                    return linkArr.length>index?
                        (<React.Fragment key={index}>                        
                            {text}
                            <Link className={classes.linkStyle} href={linkArr[index]}> {linkArr[index]}</Link>
                        </React.Fragment>)
                        :(<React.Fragment key={index}>{text}</React.Fragment>)
                })
            }
        </Typography>)
    }
    return (<Typography className={styleName}> {message} </Typography>)
}


export default MessageLinkDisplay;