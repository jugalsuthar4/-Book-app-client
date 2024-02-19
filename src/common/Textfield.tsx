import { TextField } from '@mui/material'
import React from 'react'

interface ICommonTextField {
    name:string
    label:string,
    value:string,
    callBack:(e:any)=>void
}

const CommonTextfield:React.FC<ICommonTextField> = ({label,value,callBack,name}) => {
  return (
    <>
    <TextField id="outlined-basic" label={label} name={name} variant="outlined"  value={value} sx={{display:"flex"}} onChange={(e)=>{
        callBack(e);
    }}/>
    </>
  )
}

export default CommonTextfield