import React from "react"
import Image from "next/image"

const CustomImage = (props) => {
  console.log(`Props src: ${props.src}`)
  if (props.src){
    if (process.env.production_type === "static") {
      return (
        <img
          src={props.src}
          alt={props.alt}
          width={props.width}
          height={props.height}
          className={props.className}
        />
      )
    } else {
      return <Image {...props} />
    }
  }
  // TODO: redo this exception to normal exception or to use default image if this image not exist
  else{
    throw Error('No Image')
  }
  }
  
export default CustomImage
