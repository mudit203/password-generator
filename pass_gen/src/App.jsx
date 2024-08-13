import { useCallback, useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const[Numberallowed,setNumberallowed]=useState(false)
  const[Charallowed,SetCharallowed]=useState(false)
  const [password,setpassword]=useState("")
  const[copy,changecopy]=useState("Copy")
  const passref = useRef(null)
  const passwordgenerator=useCallback(
    () => {
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let num="1234567890"
      let char="!@#$%^&*()[]\|"
      if(Numberallowed){
        str+=num
      }
       if(Charallowed){
        str+=char
      }
      for (let i = 0; i<length; i++) {
        let random=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(random)
        
      }
      setpassword(pass)
    },
    [Numberallowed,Charallowed,length],
  )


  let Copypass=useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
    alert('Password copied')
     
    
   
    changecopy("COPIED!")
     setTimeout(() => {
      changecopy("Copy")
     }, 500);
   
  })
  
  


   useEffect(() => {
     passwordgenerator()
   
    
   }, [Numberallowed,Charallowed,length])
   
  return (
    <>
    
     <div className='w-full bg-gray-700 text-orange-400 h-max rounded-lg'>
     <h1 className='font-bold text-4xl text-green'>password generator</h1>
      <input className='text-center h-9' type="text" placeholder='Your password' value={password} ref={passref}/>

      
      <button className='bg-blue-700 rounded-lg py-3 px-4 text-black font-bold' onClick={Copypass}>{copy}</button>
      <div className='flex text-sm gap-x-4'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={100} className='cursor-pointer' onChange={(e)=>setlength(e.target.value)} />
        <label className='text-white'>length:{length}</label>
      </div>
      <div className='text-white flex gap-3'>
       <input type="checkbox" defaultChecked={Numberallowed} onChange={()=>setNumberallowed((prev)=>!prev)} id='no' />
      <label htmlFor="no">number</label>


       <input type="checkbox" defaultChecked={Charallowed} onChange={()=>SetCharallowed((prev)=>!prev)} id='ch' />
       <label htmlFor='ch'>Characters</label>
      </div>
     </div>
     </div>
     
    </>
  )
}

export default App
