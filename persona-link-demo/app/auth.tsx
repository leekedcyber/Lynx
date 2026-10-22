 "use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
 const [username,setUsername]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setError("");setBusy(true);
  try { const supabase=createClient();
   if(mode==="signup"){
    const clean=username.trim().toLowerCase();
    if(!/^[a-z0-9_]{3,20}$/.test(clean)) throw new Error("Username must be 3–20 characters: letters, numbers or underscores.");
    const {data,error:authError}=await supabase.auth.signUp({email,password,options:{data:{username:clean}}});
    if(authError) throw authError;
    if(!data.user) throw new Error("Could not create account.");
    if(!data.session){setError("Account created! Check your email to confirm it, then log in.");setBusy(false);return;}
    const {error:profileError}=await supabase.from("profiles").insert({id:data.user.id,username:clean,display_name:clean,bio:"Welcome to my page!",links:[]});
    if(profileError) throw profileError;
    router.push("/dashboard");router.refresh();
   } else {
    const {error:loginError}=await supabase.auth.signInWithPassword({email,password});if(loginError)throw loginError;
    router.push("/dashboard");router.refresh();
   }
  } catch(e:any){setError(e?.message||"Something went wrong.");} finally{setBusy(false);}
 }
 return <main className="wrap"><nav className="nav"><Link className="brand" href="/">persona<span>.</span></Link><div className="navlinks"><Link href={mode==="signup"?"/login":"/signup"}>{mode==="signup"?"Log in":"Create account"}</Link></div></nav><section className="page"><span className="eyebrow">{mode==="signup"?"Start your page":"Welcome back"}</span><h1>{mode==="signup"?"Create your account":"Log in to Persona"}</h1><p className="muted">{mode==="signup"?"Choose a username — it becomes part of your public profile URL.":"Pick up where you left off and edit your page."}</p>
 {error&&<div className="notice" style={{marginTop:18}}>{error}</div>}
 <form className="form" onSubmit={submit}>{mode==="signup"&&<label className="field">Username <input required minLength={3} maxLength={20} autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="yourname"/><span className="small">Your page URL: /u/{username.trim().toLowerCase()||"yourname"}</span></label>}<label className="field">Email <input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label className="field">Password <input required type="password" minLength={6} autoComplete={mode==="signup"?"new-password":"current-password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==="signup"?"At least 6 characters":"Your password"}/></label><button className="btn primary" disabled={busy}>{busy?"Please wait…":mode==="signup"?"Create account":"Log in"}</button></form><p className="small" style={{marginTop:20}}>By continuing, you agree to use Persona responsibly. Never share your password.</p></section></main>;
}