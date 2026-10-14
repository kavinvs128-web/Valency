import { useState, useEffect, Suspense, lazy } from "react";
import { ChevronDown, ChevronLeft, BookOpen, FileText, ListTree } from "lucide-react";
import "../styles/Classeleven.css";
import PageLoader from "../components/PageLoader";
import valencyLogo from "../assets/valency-logo.svg";

const OxidationReduction = lazy(() => import("../pages/OxidationReduction.jsx"));
const BeyondTheBond = lazy(() => import("../pages/BeyondTheBond.jsx"));
const MoleConcept = lazy(() => import("../pages/MoleConcept.jsx"));
const BeyondTheMole = lazy(() => import("../pages/BeyondTheMole.jsx"));
const EmpiricalMolecularFormula = lazy(() => import("../pages/EmpiricalMolecularFormula.jsx"));
const BeyondTheEmpirical = lazy(() => import("../pages/BeyondTheEmpirical.jsx"));
const learningPath = [
  {
    id: 1,
    title: "Basic Concept of Chemical and Chemical Calculation",
    subtopics: [
      {
        id: "1.1",
        title: "Oxidation And Reduction",
      },
            {
        id: "1.2",
        title: "Mole Concept",
      },
            {
        id: "1.3",
        title: "Empirical and Molecular Formula",
      },
    ],
  },
    {
    id: 6,
    title: "Gaseous State",
    },
    {
     id: 12,
     title:"Basic concepts of organic reactions", 
    },  
];

export default function ClassEleven({ onBack, darkMode = true }) {
  // Which main topic is expanded in the sidebar
  const [openTopicId, setOpenTopicId] = useState(1);

  // Which subtopic is currently shown in the content panel
  const [activeSubtopic, setActiveSubtopic] = useState(
    learningPath[0].subtopics[0]
  );
  const [openView, setOpenView] = useState(null);

  useEffect(() => {

    function handlePopState(e) {

      const level = e.state && e.state.level;

      if (level === "lesson" || level === "quiz") {
        setOpenView("lesson");
      } else if (level === "beyond") {
        setOpenView("beyond");
      } else {
        setOpenView(null);
      }

    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);

  }, []);

  const openLesson = () => {

    window.history.pushState({ app: true, level: "lesson" }, "", window.location.href);

    setOpenView("lesson");

  };

  const openBeyond = () => {

    window.history.pushState({ app: true, level: "beyond" }, "", window.location.href);

    setOpenView("beyond");

  };

   if (openView === "lesson" && activeSubtopic.id === "1.1") {
    return (
      <Suspense fallback={<PageLoader />}>
        <OxidationReduction
          darkMode={darkMode}
          onBack={() => window.history.back()}
          onViewBeyond={openBeyond}
        />
      </Suspense>
    );
  }

   if (openView === "lesson" && activeSubtopic.id === "1.2") {
    return (
      <Suspense fallback={<PageLoader />}>
        <MoleConcept
          darkMode={darkMode}
          onBack={() => window.history.back()}
          onViewBeyond={openBeyond}
        />
      </Suspense>
    );
  }

   if (openView === "lesson" && activeSubtopic.id === "1.3") {
    return (
      <Suspense fallback={<PageLoader />}>
        <EmpiricalMolecularFormula
          darkMode={darkMode}
          onBack={() => window.history.back()}
          onViewBeyond={openBeyond}
        />
      </Suspense>
    );
  }

   if (openView === "beyond" && activeSubtopic.id === "1.1") {
    return (
      <Suspense fallback={<PageLoader />}>
        <BeyondTheBond darkMode={darkMode} onBack={() => window.history.back()} />
      </Suspense>
    );
  }

   if (openView === "beyond" && activeSubtopic.id === "1.2") {
    return (
      <Suspense fallback={<PageLoader />}>
        <BeyondTheMole darkMode={darkMode} onBack={() => window.history.back()} />
      </Suspense>
    );
  }

   if (openView === "beyond" && activeSubtopic.id === "1.3") {
    return (
      <Suspense fallback={<PageLoader />}>
        <BeyondTheEmpirical darkMode={darkMode} onBack={() => window.history.back()} />
      </Suspense>
    );
  }

  const toggleTopic = (id) => {
    setOpenTopicId(openTopicId === id ? null : id);
  };

  return (
    <div className={darkMode ? "ce-root" : "ce-root light"}>
      {/* Topbar */}
      <div className="ce-topbar">
        <div className="ce-top-left">
          <div className="ce-logo-area">
            <img className="ce-logo-img" src={valencyLogo} alt="Valency" />
            <div>
              <div className="ce-logo-sub">LEARN • BOND • MASTER</div>
            </div>
          </div>
          <div className="ce-divider" />
          <div className="ce-page-title">
            <span className="ce-page-title-icon">🧪</span>
            <span>Class 11</span>
          </div>
        </div>
        <button className="ce-back-btn" onClick={onBack}>
          ← Back to Live Books
        </button>
      </div>

      {/* Body: sidebar + content */}
      <div className="ce-body">
        {/* Sidebar */}
        <aside className="ce-sidebar">
          <div className="ce-sidebar-header">
            <ListTree size={18} />
            <span>Learning Path</span>
          </div>

          <div className="ce-sidebar-list">
            {learningPath.map((topic) => (
              <div className="ce-topic-block" key={topic.id}>
                <button
                  className="ce-topic-header"
                  onClick={() => toggleTopic(topic.id)}
                >
                  <span className="ce-topic-number">{topic.id}</span>
                  <span className="ce-topic-title">{topic.title}</span>
                  <ChevronDown
                    size={16}
                    className={
                      openTopicId === topic.id
                        ? "ce-chevron ce-chevron--open"
                        : "ce-chevron"
                    }
                  />
                </button>

                {openTopicId === topic.id && (
                  <div className="ce-subtopic-list">
                    {topic.subtopics.map((sub) => (
                      <button
                        key={sub.id}
                        className={
                          activeSubtopic.id === sub.id
                            ? "ce-subtopic ce-subtopic--active"
                            : "ce-subtopic"
                        }
                        onClick={() => setActiveSubtopic(sub)}
                      >
                        <span className="ce-subtopic-number">{sub.id}</span>
                        <span>{sub.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="ce-content">
          <div className="ce-content-breadcrumb">
            <span className="ce-content-circle">{activeSubtopic.id}</span>
            <button className="ce-crumb-link" onClick={onBack}>
              <ChevronLeft size={14} />
              Class 11 - Chemistry
            </button>
          </div>

          <h1 className="ce-content-title">{activeSubtopic.title}</h1>

          <div className="ce-content-divider" />

          <div className="ce-cards-row">
            <div className="ce-action-card ce-action-card--lesson"
            onClick={openLesson}
            >
              <div className="ce-action-title">Lesson</div>
              <div className="ce-action-icon-box">
                <BookOpen size={40} />
              </div>
            </div>

            <div className="ce-action-card ce-action-card--notes"
            onClick={openBeyond}
            >
              <div className="ce-action-title">Beyond the Bond</div>
              <div className="ce-action-icon-box">
                <FileText size={40} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}