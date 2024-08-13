"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useAppDispatch } from "@/lib/State/hooks"
import { setAuthUser } from "@/lib/State/slices/authSlice"
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

  const LoginCard = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [model,setModel] = useState(false);
    const [loginData,setLoginData] = useState({
        email: "",
        password: "",
    })

    const [signupData,setSignupData] = useState({
        email: "",
        password: "",
        name:"",
        cpassword:""
    })

    const loginUser = async() =>{
        for (const Key in loginData) {
            if(loginData[Key] == ''){
              toast.error(`Please Fill ${Key.toUpperCase()}`)
              return;
            }
        }
        try {
            const response = await axios.post("/api/auth/login",loginData);
            if(response.status == 200){
                dispatch(setAuthUser(response.data.data))
                toast.success("Login Successfully")
                router.push('/tasks')
            }
            
        } catch (error) {
            
            if(error.response.data.error){
                toast.error(`${error.response.data.error}`)
            }else{
                toast.error("Server Error")
                console.log(error);
            }
            
        }
        
    } 

    const signupUser = async () => {
        for (const key in signupData) {
            if (signupData[key] === '') {
                toast.error(`Please Fill ${key.toUpperCase()}`);
                return;
            }
        }
        try {  
            if (signupData.password !== signupData.cpassword) {
                toast.error(`Passwords do not match`);
                return;
            }
           
            const response = await axios.post("/api/auth/register", signupData);            
            if (response.status === 200) {
                toast.success("Registration Successful");
                setModel(false);
            }
        } catch (error) {
            
            if (error.response.data.error) {
                toast.error(`${error.response.data.error}`);
            } else {
                toast.error("Server Error");
                console.log(error);
            }
        }
    };
    

    return (
      <div className="h-screen flex  gap-10 justify-center items-center w-full">
        {model ? (<>
            <Card className="w-[500px] shadow-sm">
        <CardHeader>
            <CardTitle>Signup Here! </CardTitle>
        </CardHeader>
        <CardContent className="flex-col gap-4 flex">
        <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name"
                 value={signupData.name}
                 onChange={(e)=>{
                    setSignupData({
                         ...signupData,name:e.target.value
                     })
                 }}
                 placeholder=""/>
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" value={signupData.email}
                 onChange={(e)=>{
                    setSignupData({
                         ...signupData,email:e.target.value
                     })
                 }} placeholder="test@mail.com"/>
            </div>
            
           
            <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" value={signupData.password}
                 onChange={(e)=>{
                    setSignupData({
                         ...signupData,password:e.target.value
                     })
                 }} />
            </div>
            <div>
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input type="password" id="cpassword"value={signupData.cpassword}
                 onChange={(e)=>{
                     setSignupData({
                         ...signupData,cpassword:e.target.value
                     })
                 }} />
            </div>

        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
            <Button onClick={signupUser} className="bg-blue-500">Signup</Button>
            <p className="text-xs">Already have an account ? <span onClick={()=>{setModel(false)}} className="text-blue-500 cursor-pointer">Login Here</span></p>
        </CardFooter>
        </Card>
        </>):(<> <Card className="w-[500px] shadow-sm">
        <CardHeader>
            <CardTitle>Please Login To Continue! </CardTitle>
        </CardHeader>
        <CardContent className="flex-col gap-4 flex">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                value={loginData.email}
                onChange={(e)=>{
                    setLoginData({
                        ...loginData,email:e.target.value
                    })
                }}
                type="email" id="email" required placeholder="test@mail.com"/>
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                value={loginData.password}
                onChange={(e)=>{
                    setLoginData({
                        ...loginData,password:e.target.value
                    })
                }}
                type="password" id="password" required placeholder=""/>
            </div>

        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
            <Button  onClick={loginUser} className="bg-blue-500">Login</Button>
            <p className="text-xs">Do not have an account ? <span onClick={()=>{setModel(true)}}  className="text-blue-500 cursor-pointer">Create One</span></p>
        </CardFooter>
        </Card></>)}
        
       

       

      </div>
    )
  }
  
  export default LoginCard
  