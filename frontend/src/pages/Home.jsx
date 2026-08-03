import {
  Bell,
  ChevronDown,
  BookOpen,
  Zap,
  Calendar,
  Trophy,
  ArrowRight,
  Moon,
  CircleHelp,
  LogOut
} from "lucide-react";

import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import WordsOfWisdom from "../components/WordsOfWisdom";
import valencyLogo from "../assets/valency-logo.svg";

import "../styles/home.css";
import Livebooks from "../pages/Livebooks.jsx";
import Classeleven from "../pages/Classeleven.jsx";
import ReactionLog from "../pages/ReactionLog.jsx";
import WeeklyTestPage from "../pages/WeeklyTestPage.jsx";
function Home(){

const navigate = useNavigate();

const [profileOpen,setProfileOpen] = useState(false);

const [notificationOpen,setNotificationOpen] = useState(false);

const [darkMode,setDarkMode] = useState(() => {

  const savedTheme = localStorage.getItem("chemIQ_theme");

  return savedTheme ? savedTheme === "dark" : true;

});

const [activePage,setActivePage] = useState("dashboard");

const [surpriseTestKey,setSurpriseTestKey] = useState(0);

const [user,setUser] = useState({

name:"Student",

email:"student@email.com",

role:"Student"

});





useEffect(()=>{


const savedUser = localStorage.getItem("user");


if (!savedUser) return;


  const userData = JSON.parse(savedUser);


  setTimeout(() => {

    setUser(userData);

  },0);

},[]);

useEffect(()=>{

localStorage.setItem("chemIQ_theme", darkMode ? "dark" : "light");

},[darkMode]);

useEffect(()=>{

window.history.replaceState({ app: true, level: "home" }, "", window.location.href);

function handlePopState(e) {

  const state = e.state;

  if (!state || state.app !== true) return;

  const level = state.level;

  if (level === "livebooks") {
    setActivePage("livebooks");
  } else if (level === "class11" || level === "lesson" || level === "quiz") {
    setActivePage("class11");
  } else if (level === "attempts") {
    setActivePage("attempts");
  } else if (level === "surprisetest") {
    setActivePage("surprisetest");
  } else {
    setActivePage("dashboard");
  }

}

window.addEventListener("popstate", handlePopState);

return () => window.removeEventListener("popstate", handlePopState);

},[]);

function goToLivebooks() {

window.history.pushState({ app: true, level: "livebooks" }, "", window.location.href);

setActivePage("livebooks");

}

function goToClass11() {

window.history.pushState({ app: true, level: "class11" }, "", window.location.href);

setActivePage("class11");

}

function goToReactionLog() {

window.history.pushState({ app: true, level: "attempts" }, "", window.location.href);

setActivePage("attempts");

}

function goToSurpriseTest() {

window.history.pushState({ app: true, level: "surprisetest" }, "", window.location.href);

setActivePage("surprisetest");

}

function logout() {

localStorage.removeItem("chemIQ_token");

localStorage.removeItem("user");

navigate("/signin");

}

if (activePage === "livebooks") {
  return (
    <Livebooks
      darkMode={darkMode}
      onBack={() => window.history.back()}
      onSelectCategory={(categoryId) => {
        if (categoryId === "class11") {
          goToClass11();
        }
      }}
    />
  );
}

if (activePage === "class11") {
  return <Classeleven darkMode={darkMode} onBack={() => window.history.back()} />;
}

if (activePage === "attempts") {
  return (
    <ReactionLog
      darkMode={darkMode}
      onBack={() => window.history.back()}
      onTakeQuiz={goToSurpriseTest}
    />
  );
}

if (activePage === "surprisetest") {
  return (
    <WeeklyTestPage
      key={surpriseTestKey}
      darkMode={darkMode}
      onBack={() => window.history.back()}
    />
  );
}




return(


<div className={darkMode ? "home-page" : "home-page light"}>



{/* NAVBAR */}

<nav className="navbar">



<div className="brand">


<img className="logo" src={valencyLogo} alt="Valency" />


<div>

<h1>
Valency
</h1>


<p>
Learn • Bond • Master
</p>


</div>


</div>







<div className="nav-actions">





{/* NOTIFICATION */}


<div className="notification-wrapper">


<button

className="notification"

onClick={()=>{

setNotificationOpen(!notificationOpen);

setProfileOpen(false);

}}

>


<Bell/>


</button>






{notificationOpen && (

<div className="notification-panel">



<div className="notification-header">

<h3>
Notifications
</h3>


<span>
Mark all read
</span>


</div>





<div className="notification-empty">



<div className="empty-icon">

🔔

</div>




<h3>
No Notifications
</h3>



<p>

You're all caught up!
<br/>
New updates will appear here.

</p>



</div>





</div>

)}



</div>







{/* PROFILE */}



<div className="profile-wrapper">



<button

className="student"

onClick={()=>{

setProfileOpen(!profileOpen);

setNotificationOpen(false);

}}

>



<div className="avatar">


{user.name.charAt(0).toUpperCase()}


</div>



<div>


<h3>
{user.name}
</h3>


<span>
{user.role}
</span>


</div>



<ChevronDown size={18}/>


</button>







{profileOpen && (



<div className="profile-box">



<div className="profile-top">



<div className="large-avatar">


{user.name.charAt(0).toUpperCase()}


<span className="online-dot"></span>


</div>



<h2>

{user.name}

</h2>



<h4>

{user.role.toUpperCase()}

</h4>



<p>

{user.email}

</p>



</div>





<div className="divider"></div>






<div className="profile-option">



<div className="option-left">


<div className="option-icon">

<Moon size={18}/>

</div>


<span>
Dark Mode
</span>


</div>




<div

className={darkMode?"toggle active":"toggle"}

onClick={()=>setDarkMode(!darkMode)}

>


<div></div>


</div>



</div>







<div className="profile-option">


<div className="option-left">


<div className="option-icon cyan">

<CircleHelp/>

</div>



<span>
Help & Contact
</span>


</div>



</div>







<div className="divider"></div>




<button className="logout-btn" onClick={logout}>


<LogOut size={18}/>


Log Out


</button>



</div>


)}





</div>






</div>



</nav>









{/* BODY */}


<section className="dashboard">



<div className="welcome">


<div className="emoji">
👋
</div>



<h2>

Hi,

<span>
{user.name}
</span>


</h2>




<p>

Ready to explore chemistry today?

</p>



</div>





<WordsOfWisdom />





</section>









<section className="features">



<Card

icon={<BookOpen/>}

title="Live Books"

text="Explore interactive chemistry books with animations & live examples."

badge="3 Books"

color="blue"

onClick={goToLivebooks}
/>





<Card

icon={<Zap/>}

title="Weekly Test"

text="Take this week's chemistry quiz, or practice past topics any time."

badge="Try Now"

color="red"
onClick={goToSurpriseTest}
/>





<Card

icon={<Calendar/>}

title="Calendar"

text="Track your lessons, deadlines, and upcoming chemistry events."

badge="3 Events"

color="green"
onClick={() => window.open("https://calendar.google.com/", "_blank", "noopener,noreferrer")}
/>





<Card

icon={<Trophy/>}

title="Reaction Log"

text="Review your logged reactions, scores, and performance trends."

badge="0 Reactions"

color="violet"
onClick={goToReactionLog}
/>



</section>





</div>


)










function CountUp({ value, duration = 900 }) {

  const [display, setDisplay] = useState(0);

  useEffect(() => {

    let raf;
    const startTime = performance.now();

    function tick(now) {

      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }

    }

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);

  }, [value, duration]);

  return display;

}

function BadgeText({ badge }) {

  const match = /^(\d+)(.*)$/.exec(badge);

  if (!match) {
    return badge;
  }

  const [, numberPart, rest] = match;

  return (
    <>
      <CountUp value={Number(numberPart)} />
      {rest}
    </>
  );

}

function Card({icon,title,text,badge,color,onClick}){


return(


<div className={`feature-card ${color}`}onClick={onClick}>


<div className="feature-icon">

{icon}

</div>



<h2>

{title}

</h2>



<p>

{text}

</p>




<div className="card-footer">


<span>
<BadgeText badge={badge} />
</span>



<button>

<ArrowRight/>

</button>



</div>



</div>


)


}


}
export default Home;