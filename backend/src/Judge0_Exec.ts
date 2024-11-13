export const Judge0_Exec= async(req:any,res:any)=>{
const {code,language}=req.body
console.log(code)

if(!code ){
    res.status(200).json({msg:"Run with some code bro"})
}
try{
    const output="hello world"
    res.status(200).json({
        msg:"Code reached i think",
        lang:language,
        output:output
    
    })
    return
}
    catch(e){
        res.status(400).json({msg:"Some error in catch block now"})
        return
    }
 

}