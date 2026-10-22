import Link from "next/link";
export default function Home() {
  return <main className="wrap">
    <nav className="nav"><Link className="brand" href="/">persona<span>.</span></Link><div className="navlinks"><Link href="/login">Log in</Link><Link className="btn primary" href="/signup">Create your page ↗</Link></div></nav>
    <section className="hero"><span className="eyebrow">Your identity, in one link</span><h1>Your corner of the<br/><span className="gradient">internet.</span></h1><p>A little page that says a lot about you. Share your bio, your socials, your projects and all the things that make you, you.</p><div className="actions"><Link className="btn primary" href="/signup">Make your page — free</Link><a className="btn" href="/u/demo">View demo profile ↗</a></div></section>
    <section className="features"><article className="feature"><h3>01 / Your story</h3><p>Add your name, a short bio and the details you want people to know.</p></article><article className="feature"><h3>02 / All your links</h3><p>Put your socials, projects and favorite places in one simple profile.</p></article><article className="feature"><h3>03 / Your own URL</h3><p>Your public page lives at <code>/u/yourname</code> on your Vercel domain.</p></article></section>
    <footer className="foot">PERSONA — A tiny home for your online identity.</footer>
  </main>;
}