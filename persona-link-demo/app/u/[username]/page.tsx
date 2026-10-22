import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function PublicProfile({params}:{params:{username:string}}){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 let profile:any=null;
 if(url&&key){const supabase=createClient(url,key);const {data}=await supabase.from("profiles").select("username,display_name,bio,links").eq("username",params.username.toLowerCase()).maybeSingle();profile=data;}
 if(!profile&&params.username.toLowerCase()==="demo")profile={username:"demo",display_name:"Alex Morgan",bio:"Designer, curious human, and professional playlist curator. I make little things for the internet and collect ideas wherever I go.",links:[{label:"Instagram",url:"https://instagram.com"},{label:"My projects",url:"https://github.com"},{label:"Get in touch",url:"https://example.com"}]};
 if(!profile)return <main className="wrap"><nav className="nav"><Link className="brand" href="/">persona<span>.</span></Link><Link className="btn" href="/signup">Make your page</Link></nav><section className="page"><h1>Page not found</h1><p className="muted">This username doesn’t have a public page yet.</p><Link className="btn primary" href="/signup">Create your own ↗</Link></section></main>;
 const initial=(profile.display_name||profile.username).trim().charAt(0).toUpperCase();
 return <main className="wrap"><nav className="nav"><Link className="brand" href="/">persona<span>.</span></Link><Link className="btn" href="/signup">Make your page ↗</Link></nav><section className="profile"><div className="avatar">{initial}</div><h1>{profile.display_name||profile.username}</h1><div className="handle">@{profile.username}</div><p className="bio">{profile.bio}</p><div className="linklist">{(Array.isArray(profile.links)?profile.links:[]).filter((l:any)=>l?.label&&/^https?:\/\//i.test(l.url||"")).map((l:any,i:number)=><a className="profilelink" href={l.url} target="_blank" rel="noopener noreferrer" key={i}>{l.label} ↗</a>)}</div></section><footer className="foot">Made with persona. · <Link href="/">Create your own page</Link></footer></main>;
}