import React, { useState, useEffect, useRef } from "react";
import {
  SiGooglecloud,
  SiGrafana,
  SiPrometheus,
  SiElasticsearch,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiTerraform,
  SiNginx,
  SiGit,
  SiGithubactions,
  SiGitlab,
  SiGoogle,
} from "react-icons/si";
import { GrOracle } from "react-icons/gr";
import {
  FaDatabase,
  FaTerminal,
  FaRobot,
  FaFeatherAlt,
  FaServer,
  FaLayerGroup,
  FaMicrosoft,
  FaGoogle,
  FaPython,
  FaJava,
  FaJenkins,
  FaDocker,
  FaDharmachakra,
  FaAws,
  FaShieldAlt,
  FaCoins,
  FaBolt,
  FaCheckCircle,
  FaLock,
  FaGithub,
  FaLinkedin,
  FaCloud,
  FaBrain,
} from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

// Helper component to animate elements on scroll
const AnimateOnScroll = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-black dark:bg-white text-white dark:text-black w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          aria-label="Go to top"
        >
          <i className="fas fa-arrow-up text-sm sm:text-base"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Main App Component
const App = () => {
  // Randomly select theme on each page load
  const getRandomTheme = () => {
    return Math.random() < 0.5 ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getRandomTheme());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    // Updated section order for IntersectionObserver
    const sections = [
      "Home",
      "About",
      "Projects",
      "Skills",
      "Experience",
      "Certifications",
      "Contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Adjust rootMargin to trigger when section is in the middle of the viewport
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen font-sans transition-colors duration-500 overflow-x-hidden">
      {/* Font Awesome CDN for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <Navbar
        currentPage={activeSection}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <main>
        {/* Components reordered as per request */}
        <Home />
        <About />
        <Projects openProjectModal={openModal} />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentPage, toggleTheme, theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Updated navItems order
  const navItems = [
    "Home",
    "About",
    "Projects",
    "Skills",
    "Experience",
    "Certifications",
    "Contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-md"
          : "bg-white dark:bg-black shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <a
              href="#Home"
              onClick={(e) => handleNavClick(e, "Home")}
              className="text-xl sm:text-2xl font-bold tracking-wider cursor-pointer"
            >
              HJ<span className="text-black dark:text-white">.</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className="relative px-3 py-2 rounded-md text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {item}
                  {currentPage === item && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                      layoutId="underline"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "light" ? (
                  <i className="fas fa-moon"></i>
                ) : (
                  <i className="fas fa-sun"></i>
                )}
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun"></i>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <i className="fas fa-times text-xl"></i>
              ) : (
                <i className="fas fa-bars text-xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-black/95 backdrop-blur-lg">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className="block w-full text-left px-4 py-3 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Home Page with Video
const Home = () => {
  const subtitleText = "DevOps & Cloud Engineer";
  const letters = Array.from(subtitleText);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.8 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <section
      id="Home"
      className="relative text-center min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Hero Content */}
      <AnimatePresence>
        {
          <motion.div
            className="relative z-20 container mx-auto px-4 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}profile.png`}
              alt="Harshal Jadhav"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto rounded-full mb-4 sm:mb-6 border-4 border-white object-cover"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            />
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 text-black dark:text-white px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm{" "}
              <span className="text-black dark:text-white">Harshal Jadhav</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }} // Increased delay to start after typing
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 max-w-md sm:max-w-none mx-auto"
            >
              <a
                href="#Projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("Projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download="Harshal_Jadhav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </section>
  );
};

// About Page
const About = () => {
  const highlights = [
    {
      icon: <FaRobot className="text-blue-500 dark:text-blue-400" />,
      title: "MLOps & Agentic AI Deployments",
      desc: "Engineering end-to-end machine learning systems—from containerizing models and orchestrating multi-agent runtimes to deploying low-latency inference endpoints and building automated evaluation pipelines.",
    },
    {
      icon: <FaBrain className="text-pink-500 dark:text-pink-400" />,
      title: "DevOps as the AI Backbone",
      desc: "Treating DevOps as the vital foundation for AI: applying Kubernetes orchestration, Terraform IaC, and automated CI/CD to eliminate fragility, ensuring reproducible model environments, zero-downtime rollouts, and low-latency serving.",
    },
    {
      icon: <FaShieldAlt className="text-blue-500 dark:text-blue-400" />,
      title: "Enterprise Cloud & DevSecOps",
      desc: "Architecting HIPAA-compliant healthcare solutions, air-gapped clusters, and security-first environments across Azure & AWS with Terraform, least-privilege IAM, and automated vulnerability scanning (SonarQube, Trivy).",
    },
    {
      icon: <FaCoins className="text-emerald-500 dark:text-emerald-400" />,
      title: "FinOps & AI Compute Economics",
      desc: "FinOps Certified Engineer implementing intelligent resource rightsizing and serverless automation, reducing cloud infrastructure and GPU/compute operational spend by up to 40%.",
    },
  ];

  const metrics = [
    { value: "40%", label: "Cloud Cost Savings", sub: "Via FinOps & resource rightsizing" },
    { value: "35%", label: "Image Size Reduction", sub: "Optimized Docker multi-stage builds" },
    { value: "20%", label: "Faster Release Cycles", sub: "Automated end-to-end CI/CD" },
    { value: "10+", label: "Projects Deployed", sub: "Cloud, Kubernetes & AI Pipelines" },
  ];

  return (
    <section
      id="About"
      className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
    >
      <AnimateOnScroll>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
            <FaCheckCircle className="text-emerald-500 text-xs" />
            DevOps & Cloud Engineer • MLOps & Agentic AI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-black dark:text-white">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Harnessing DevOps as the foundational backbone to architect, scale, and operationalize Machine Learning and Agentic AI systems.
          </p>
        </div>
      </AnimateOnScroll>

      {/* Main Grid: Story + Image Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto mb-16">
        {/* Left: Bio narrative */}
        <AnimateOnScroll className="lg:col-span-7">
          <div className="space-y-4 sm:space-y-5 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed text-justify">
            <p>
              I am a <strong className="text-black dark:text-white font-semibold">Cloud & DevOps Engineer</strong> at{" "}
              <strong className="text-black dark:text-white font-semibold">Biztransights Solutions LLP</strong>, with a B.Tech in Computer Science and Engineering. While my foundation is anchored in building battle-tested cloud platforms across{" "}
              <strong className="text-black dark:text-white font-semibold">Microsoft Azure and AWS</strong>, I am actively channeling my engineering focus towards{" "}
              <span className="font-semibold text-black dark:text-white">MLOps, Machine Learning workflows, and Agentic AI deployments</span>.
            </p>
            <p>
              I firmly believe that the future of artificial intelligence hinges on reliable operations: <span className="font-semibold text-black dark:text-white">DevOps is the vital backbone of AI</span>. Autonomous agents, LLM pipelines, and deep learning models cannot produce enterprise impact without reproducible environments, automated CI/CD for model weights and code, container orchestration on Kubernetes, low-latency inference serving, and real-time observability.
            </p>
            <p>
              My hands-on toolkit bridges <span className="font-semibold text-black dark:text-white">Terraform (IaC)</span>, air-gapped production Kubernetes clusters, and automated DevSecOps with cutting-edge explorations in <span className="font-semibold text-black dark:text-white">Agentic AI systems</span>—from orchestrating multi-agent runtimes and vector retrieval stores to building resilient evaluation pipelines. As a certified <span className="font-semibold text-black dark:text-white">FinOps Engineer</span>, I also ensure that compute-heavy AI infrastructure is architected with strict cost efficiency and resource rightsizing.
            </p>

            {/* Quick Links & Profiles */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/harshaljadhav-git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-700 transition-all duration-200 hover:scale-105"
              >
                <FaGithub className="text-base" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/harshal-jadhav-75b8371b0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:scale-105"
              >
                <FaLinkedin className="text-base text-blue-600 dark:text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="#Contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
              >
                <span>Let's connect →</span>
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Right: Modern Visual with Floating Badges */}
        <AnimateOnScroll delay={0.2} className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Top Floating Badge: MLOps & Agentic AI */}
            <motion.div
              className="absolute -top-4 -left-4 sm:-top-5 sm:-left-6 z-20 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                <FaRobot className="text-xl" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Focus Area
                </div>
                <div className="text-sm font-bold text-black dark:text-white">
                  MLOps & Agentic AI
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  Model Serving & Agents
                </div>
              </div>
            </motion.div>

            {/* Main Visual Image with gradient overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group">
              <img
                src={`${import.meta.env.BASE_URL}photo-1451187580459-43490279c0fa.avif`}
                alt="Cloud Infrastructure & Architecture"
                className="w-full h-72 sm:h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/90 text-xs font-medium mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active in Cloud, MLOps & AI
                </div>
                <div className="text-white text-base font-semibold">
                  DevOps • MLOps • Agentic AI Systems
                </div>
              </div>
            </div>

            {/* Bottom Floating Badge: FinOps Certified */}
            <motion.div
              className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-6 z-20 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <FaCoins className="text-xl" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Certified
                </div>
                <div className="text-sm font-bold text-black dark:text-white">
                  FinOps Engineer
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  The Linux Foundation
                </div>
              </div>
            </motion.div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Metrics Row */}
      <AnimateOnScroll delay={0.3}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mb-16">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-4 sm:p-5 rounded-xl text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors shadow-sm"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black dark:text-white tracking-tight mb-1">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.label}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>

      {/* Core Competencies 4-Card Grid */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 text-black dark:text-white">
          What I Bring to Engineering Teams
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <div className="h-full bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 flex items-start gap-4">
                <div className="text-2xl sm:text-3xl p-3 rounded-lg bg-gray-100 dark:bg-gray-700/60 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-black dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Page
const Projects = ({ openProjectModal }) => {
  const projects = [
    {
      title: "Healthcare Patient Monitoring Platform — On-Premises Production Deployment",
      subtitle: "Production Healthcare Application • US-Based Hospital Chain Client",
      badge: "Healthcare • Air-Gapped Kubernetes",
      description:
        "Production healthcare application deployed on-premises for a US-based hospital-chain client, supporting real-time patient health monitoring and clinical alerting.",
      architecture:
        "The platform collects patient metrics from connected medical devices such as IDAN, blood pressure monitors, and other bedside monitoring systems, processes incoming telemetry, and provides real-time health insights to clinical teams. When monitored vital parameters breach configured safety thresholds, the system triggers audible alerts within patient hospital rooms alongside instant notifications to attending medical staff and doctors for rapid clinical intervention.",
      operationalContext:
        "Deployed and operationalized within a fully isolated on-premises environment with no direct internet access (air-gapped), focusing on container orchestration, high availability, secure infrastructure, automation, and operational resilience.",
      sections: [
        {
          title: "Infrastructure & Deployment",
          icon: "fas fa-network-wired",
          items: [
            "Deployed frontend and backend application workloads on an on-premises Kubernetes cluster.",
            "Containerized application components using Docker for consistent and repeatable deployments.",
            "Deployed and operated Apache Kafka for real-time event and telemetry processing between application components.",
            "Managed PostgreSQL as the application data layer for storing and retrieving operational and health-related data.",
            "Configured Kubernetes workloads, services, networking, secrets, and application configurations for the production environment.",
            "Designed deployment workflows suitable for an air-gapped / internet-restricted infrastructure environment.",
          ],
        },
        {
          title: "Secure & Isolated Operations",
          icon: "fas fa-shield-alt",
          items: [
            "Implemented Ubuntu server hardening across the underlying infrastructure.",
            "Operated the environment without direct internet access, reducing external exposure and requiring controlled internal software delivery mechanisms.",
            "Configured self-hosted GitHub Actions runners within the on-premises environment to execute CI/CD workflows without requiring application servers to access the public internet.",
            "Supported secure handling of application artifacts, configurations, credentials, and deployment packages within the isolated environment.",
          ],
        },
        {
          title: "Backup & Operational Resilience",
          icon: "fas fa-database",
          items: [
            "Implemented backup processes for critical application and infrastructure data.",
            "Established file backup and retention procedures to support operational recovery and controlled storage management.",
            "Supported disaster-recovery readiness through controlled backup retention and restoration procedures.",
            "Performed infrastructure troubleshooting, deployment support, and operational maintenance across the Kubernetes environment.",
          ],
        },
      ],
      tags: [
        "Kubernetes",
        "Docker",
        "Apache Kafka",
        "PostgreSQL",
        "GitHub Actions",
        "Self-Hosted Runners",
        "Ubuntu Linux",
        "On-Premises",
      ],
      engineeringFocus: [
        "Healthcare Technology",
        "On-Premises Kubernetes",
        "Real-Time Data Processing",
        "Containerization",
        "CI/CD",
        "Air-Gapped Infrastructure",
        "Linux Hardening",
        "Backup & Retention",
        "Production Operations",
      ],
      imgSrc: `${import.meta.env.BASE_URL}healthcare-monitoring-platform.jpg`,
      github: "https://github.com/harshaljadhav-git",
    },
    {
      title: "E-Commerce Microservices Platform",
      badge: "Cloud-Native • AWS EKS Microservices",
      description:
        "Production-style microservices platform deployed on AWS EKS with Terraform, Kubernetes, Helm, GitHub Actions, ArgoCD, Prometheus, Grafana, and centralized logging.",
      architecture:
        "Designed as a scalable cloud-native architecture with 15 microservices, an Angular frontend, API Gateway, service discovery, asynchronous infrastructure services, and AWS-managed infrastructure components.",
      highlights: [
        "Provisioned AWS networking and EKS infrastructure using Terraform.",
        "Containerized and orchestrated 15 Spring Boot microservices with Kubernetes.",
        "Used Helm for Kubernetes application and infrastructure deployment.",
        "Implemented GitHub Actions for automated testing and container image publishing.",
        "Implemented ArgoCD GitOps-based continuous delivery.",
        "Added Prometheus and Grafana for metrics and infrastructure observability.",
        "Implemented centralized logging using Fluentd, OpenSearch, and Kibana.",
        "Configured Kubernetes Horizontal Pod Autoscaling for critical workloads.",
        "Used Kubernetes ConfigMaps and Secrets to separate configuration from application code.",
        "Integrated AWS services including EKS, RDS, S3, and VPC.",
      ],
      tags: [
        "AWS",
        "EKS",
        "Kubernetes",
        "Terraform",
        "Helm",
        "Docker",
        "GitHub Actions",
        "ArgoCD",
        "Prometheus",
        "Grafana",
        "OpenSearch",
        "Kibana",
        "Spring Boot",
        "Angular",
      ],
      imgSrc: `${import.meta.env.BASE_URL}ecommerce-microservices.jpg`,
      github: "https://github.com/harshaljadhav-git/E-commerce-microservices-kubernetes.git",
    },
    {
      title: "Cloudfin Insights",
      subtitle: "FinOps & Real-Time Financial Analytics Pipeline",
      badge: "FinOps • Serverless Analytics",
      description:
        "Serverless financial data pipeline leveraging AWS Lambda, Glue, RDS, and Amazon QuickSight for real-time cost intelligence and financial telemetry.",
      architecture:
        "Automated event-driven ETL ingestion pipeline processing transaction data and cloud billing metrics through AWS Lambda and AWS Glue crawlers, storing aggregated analytics in Amazon S3 and PostgreSQL/RDS, and rendering real-time business intelligence dashboards via Amazon QuickSight.",
      highlights: [
        "Constructed serverless event-driven ingestion using AWS Lambda and Amazon EventBridge.",
        "Built automated ETL transformations and data cataloging using AWS Glue.",
        "Delivered interactive financial metrics and cost-optimization dashboards in Amazon QuickSight.",
        "Configured secure VPC networking, IAM least-privilege roles, and S3 lifecycle encryption.",
        "Implemented automated cloud cost anomaly detection and financial alerting.",
      ],
      tags: ["AWS Lambda", "AWS Glue", "QuickSight", "RDS", "Amazon S3", "VPC", "FinOps"],
      imgSrc: `${import.meta.env.BASE_URL}cloudfin-insights.jpg`,
      github: "https://github.com/harshaljadhav-git",
    },
    {
      title: "Zomato Clone App",
      subtitle: "Automated CI/CD Delivery & Telemetry Pipeline",
      badge: "DevOps • CI/CD Pipeline",
      description:
        "End-to-end CI/CD pipeline deploying a full-stack Zomato food delivery clone on AWS using Docker, Jenkins, SonarQube, Prometheus, and Grafana.",
      architecture:
        "Architected a robust automated deployment lifecycle triggering from GitHub commits: Jenkins executes containerized builds and unit testing, runs SonarQube static analysis, containerizes application images via Docker, deploys workloads to AWS infrastructure, and continuously monitors runtime health via Prometheus exporters and Grafana dashboards.",
      highlights: [
        "Built declarative Jenkins multi-stage pipeline for automated build, test, and container packaging.",
        "Containerized frontend and backend services using optimized multi-stage Docker builds.",
        "Configured Prometheus metric scrapers and custom Grafana alerting dashboards for server metrics and uptime.",
        "Integrated SonarQube SAST code quality gates preventing regressions in delivery pipelines.",
        "Deployed and load balanced production workloads on AWS EC2 with reverse-proxy configurations.",
      ],
      tags: ["Jenkins", "Docker", "AWS", "Prometheus", "Grafana", "SonarQube", "CI/CD"],
      imgSrc: `${import.meta.env.BASE_URL}zomato-deployment.jpg`,
      github: "https://github.com/harshaljadhav-git",
    },
    {
      title: "StreamVibe",
      badge: "Full-Stack • Video Platform",
      description:
        "A full-stack video streaming platform. Features refreshing theme & video management capabilities.",
      tags: ["Node.js", "Vite.js", "PostgreSQL", "Docker", "AWS"],
      imgSrc: `${import.meta.env.BASE_URL}StreamVibe.png`,
      github: "https://github.com/harshaljadhav-git",
    },
    {
      title: "AI Business Automation Platform",
      subtitle: "Full-Stack AI-Powered Enterprise Automation",
      badge: "MLOps • Agentic AI • Full-Stack",
      description:
        "An end-to-end AI-driven business automation platform featuring real-time KPI dashboards, AI-controlled campaign management, inventory intelligence, and market analytics — built with React, Express, PostgreSQL, and automated CI/CD.",
      architecture:
        "Full-stack application with a React/Vite SPA frontend using Shadcn UI, TanStack React Query, and a domain-driven state store with event bus. The Express/Node.js backend provides RESTful APIs with RBAC middleware, Drizzle ORM over PostgreSQL, and Vite HMR integration. Shared TypeScript schemas ensure type safety across the stack.",
      sections: [
        {
          title: "Backend Core — Express / Node.js",
          icon: "fas fa-server",
          items: [
            "RESTful API layer with routes for Campaigns, Inventory, Market Analytics, and AI Controls.",
            "Authentication & session management with Role-Based Access Control (RBAC) middleware.",
            "Drizzle ORM with shared TypeScript schema definitions over PostgreSQL.",
            "In-memory and mock store fallbacks for resilient development and testing.",
          ],
        },
        {
          title: "Frontend SPA — React / Vite",
          icon: "fas fa-desktop",
          items: [
            "Client-side routing with Wouter and domain state management via custom store and event bus.",
            "TanStack React Query for server-state synchronization and caching.",
            "Dashboard with real-time KPIs, AI Control page for engine triggers, and Campaign/Inventory management.",
            "Shadcn UI component system with Command Palette, App Sidebar, Inspector Drawer, and KPI Strips.",
          ],
        },
        {
          title: "Quality Assurance & DevOps",
          icon: "fas fa-cogs",
          items: [
            "CI/CD pipeline via GitHub Actions workflow for automated build, test, and deployment.",
            "Comprehensive test automation with Vitest covering client domain, server API, and schema validation.",
            "SonarQube static code analysis integration for continuous code quality enforcement.",
          ],
        },
      ],
      tags: [
        "React",
        "TypeScript",
        "Express",
        "Node.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Vite",
        "Shadcn UI",
        "GitHub Actions",
        "Vitest",
        "SonarQube",
        "RBAC",
      ],
      engineeringFocus: [
        "Agentic AI",
        "Full-Stack Development",
        "Domain-Driven Design",
        "CI/CD Automation",
        "Role-Based Access Control",
        "Real-Time Dashboards",
        "Test Automation",
      ],
      imgSrc: `${import.meta.env.BASE_URL}ai-business-automation.jpg`,
      github: "https://github.com/harshaljadhav-git/ai-business-automation.git",
    },
  ];

  return (
    <section
      id="Projects"
      className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <AnimateOnScroll key={project.title} delay={index * 0.1}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl cursor-pointer group border border-gray-200 dark:border-gray-700 h-full transition-all duration-300"
              onClick={() => openProjectModal(project)}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-4 sm:p-6 h-full flex flex-col">
                <div className="flex-grow">
                  {project.badge && (
                    <span className="inline-block px-2.5 py-0.5 mb-2.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {project.badge}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-right">
                    <span className="text-black dark:text-white text-sm font-medium group-hover:underline inline-flex items-center">
                      View Details
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

// Skills Page
const Skills = () => {
  const skills = [
    { name: "AWS", icon: <FaAws color="#FF9900" /> },
    { name: "Azure", icon: <FaMicrosoft color="#0078D4" /> },
    { name: "GCP", icon: <SiGoogle color="#4285F4" /> },
    { name: "MySQL", icon: <FaDatabase color="#4479A1" /> },
    { name: "PostgreSQL", icon: <FaDatabase color="#336791" /> },
    { name: "Git", icon: <SiGit color="#F05032" /> },
    { name: "GitLab", icon: <SiGitlab color="#FCA121" /> },
    { name: "Github Actions", icon: <SiGithubactions color="#2088FF" /> },
    { name: "Azure DevOps", icon: <FaMicrosoft color="#0078D4" /> },
    { name: "Prometheus", icon: <SiPrometheus color="#E6522C" /> },
    { name: "Grafana", icon: <SiGrafana color="#F46800" /> },
    { name: "Java", icon: <FaJava color="#007396" /> },
    { name: "Shell Scripting", icon: <FaTerminal color="#4EAA25" /> },
    { name: "Docker", icon: <FaDocker color="#2496ED" /> },
    { name: "Kubernetes", icon: <SiKubernetes color="#326CE5" /> },
    { name: "Jenkins", icon: <SiJenkins color="#D24939" /> },
    { name: "Terraform", icon: <SiTerraform color="#623CE4" /> },
    { name: "Ansible", icon: <FaRobot color="#000000" /> },
    { name: "Apache", icon: <FaFeatherAlt color="#CA2136" /> },
    { name: "NGINX", icon: <FaServer color="#009639" /> },
    { name: "MLflow", icon: <FaBrain color="#0194E2" /> },
    { name: "Kubeflow", icon: <FaDharmachakra color="#326CE5" /> },
    { name: "Apache Airflow", icon: <FaLayerGroup color="#017CEE" /> },
    { name: "DVC", icon: <FaDatabase color="#13ADC7" /> },
  ];
  return (
    <section
      id="Skills"
      className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
        Skills & Tools
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 lg:gap-8">
        {skills.map((skill, index) => (
          <AnimateOnScroll key={skill.name} delay={index * 0.05}>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-gray-500/20 hover:scale-105 transition-all duration-300 h-full min-h-[80px] sm:min-h-[100px]">
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                {skill.icon}
              </span>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-center">
                {skill.name}
              </h3>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

// Experience Page
const Experience = () => {
  const experiences = [
    {
      role: "Cloud & DevOps Engineer",
      company: "Biztransights Solutions LLP",
      duration: "Feb 2026 - Present",
      description: `Building secure AWS and Azure infrastructure with Terraform, automating CI/CD delivery through Azure DevOps, and strengthening cloud environments with DevSecOps, monitoring, and infrastructure automation.`,
      logo: `${import.meta.env.BASE_URL}biztransights.png`,
    },
    {
      role: "DevOps Engineer",
      company: "Kylient Software Solutions Pvt Ltd",
      duration: "Jan 2025 - Feb 2026",
      description: `Designing and implementing battle-tested CI/CD pipelines.
Container orchestration with Docker and Kubernetes.
Infrastructure automation and optimization.`,
      logo: `${import.meta.env.BASE_URL}kylient.jpg`,
    },
    {
      role: "Cloud Engineer Intern",
      company: "Variant.ai",
      duration: "July 2024 - Jan 2025",
      description: `Architected scalable VPC environments on AWS.
Implemented security best practices and automation.
Cloud infrastructure monitoring and optimization.`,
      logo: `${import.meta.env.BASE_URL}variant.jpg`,
    },
    {
      role: "Software Engineer Intern",
      company: "Infocepts",
      duration: "Jan 2024 - July 2024",
      description: `Built robust backend systems with Java.
SQL Server integration and optimization.
Full-stack development and API design.`,
      logo: `${import.meta.env.BASE_URL}infocepts.jpg`,
    },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="Experience"
      className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 lg:mb-16">
        Professional Experience
      </h2>
      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* The animated vertical line */}
        <motion.div
          className="absolute left-3 sm:left-4 md:left-1/2 top-0 h-full w-0.5 bg-black dark:bg-white origin-top"
          style={{ scaleY }}
        />
        {experiences.map((exp, index) => (
          <AnimateOnScroll key={index} delay={index * 0.2}>
            <div className="relative pl-10 sm:pl-12 md:pl-0 mb-8 sm:mb-10 lg:mb-12">
              {/* Dot on the timeline */}
              <div className="absolute left-3 sm:left-4 md:left-1/2 top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white -translate-x-1/2"></div>
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0
                    ? "md:ml-auto md:pl-6 lg:pl-8"
                    : "md:mr-auto md:pr-6 lg:pr-8"
                }`}
              >
                <div
                  className={`bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg flex gap-3 sm:gap-4 items-start`}
                >
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-contain flex-shrink-0"
                  />
                  <div className="text-left">
                    <p className="font-semibold mb-1 text-black dark:text-white text-sm sm:text-base">
                      {exp.duration}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                      {exp.company}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

// Certifications Page
const Certifications = () => {
  const certs = [
    {
      name: "FinOps Certified Engineer",
      issuer: "The Linux Foundation",
      icon: "fas fa-chart-pie",
    },
    {
      name: "Oracle Cloud Infrastructure Architect Associate",
      issuer: "Oracle",
      icon: "fas fa-database",
    },
    {
      name: "AWS Solutions Architect – Associate",
      issuer: "ExcelR",
      icon: "fab fa-aws",
    },
    {
      name: "Microsoft Certified: Azure Administrator Associate",
      issuer: "Microsoft",
      icon: "fab fa-microsoft",
    },
    {
      name: "B.Tech in Computer Science and Engineering",
      issuer: "S B Jain Institute of Technology Management and Research",
      icon: "fas fa-graduation-cap",
    },
  ];
  return (
    <section
      id="Certifications"
      className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
        Certifications & Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {certs.map((cert, index) => (
          <AnimateOnScroll
            key={cert.name}
            delay={index * 0.15}
            className="h-full"
          >
            <div className="flex items-start p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-gray-500/20 transition-shadow duration-300 h-full">
              <i
                className={`${cert.icon} text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white mr-3 sm:mr-4 lg:mr-6 mt-1 flex-shrink-0`}
              ></i>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {cert.issuer}
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

// Contact Page
const Contact = () => (
  <section
    id="Contact"
    className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
      Get In Touch
    </h2>
    <AnimateOnScroll className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
      <form>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            placeholder="Your message..."
          ></textarea>
        </div>
        <motion.button
          type="submit"
          className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3 text-center dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-gray-800"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </form>
      <div className="text-center mt-6 sm:mt-8">
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">
          Or connect with me on:
        </p>
        <div className="flex justify-center space-x-4 sm:space-x-6 text-xl sm:text-2xl">
          <motion.a
            href="https://github.com/harshaljadhav-git"
            className="hover:text-gray-500 transition-colors"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fab fa-github"></i>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/harshal-jadhav-75b8371b0/"
            className="hover:text-gray-500 transition-colors"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fab fa-linkedin"></i>
          </motion.a>
          <motion.a
            href="mailto:harshalj257@gmail.com"
            className="hover:text-gray-500 transition-colors"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fas fa-envelope"></i>
          </motion.a>
        </div>
      </div>
    </AnimateOnScroll>
  </section>
);

// Project Modal
const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full mx-auto overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.imgSrc}
          alt={project.title}
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {project.badge && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {project.badge}
              </span>
            )}
            {project.subtitle && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                • {project.subtitle}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-black dark:text-white">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {project.architecture && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed">
              {project.architecture}
            </p>
          )}

          {project.operationalContext && (
            <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5 text-base flex-shrink-0">
                <i className="fas fa-shield-alt"></i>
              </span>
              <div>
                <strong className="font-semibold block mb-0.5 text-blue-900 dark:text-blue-100">
                  Air-Gapped / Isolated Production Environment:
                </strong>
                <span>{project.operationalContext}</span>
              </div>
            </div>
          )}

          {project.sections && project.sections.length > 0 ? (
            <div className="space-y-4 sm:space-y-5 mb-5 sm:mb-6">
              {project.sections.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-gray-50 dark:bg-gray-900/60 p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-base sm:text-lg font-bold mb-3 text-black dark:text-white flex items-center gap-2.5">
                    {section.icon && (
                      <span className="text-emerald-500 dark:text-emerald-400 text-sm">
                        <i className={section.icon}></i>
                      </span>
                    )}
                    <span>{section.title}</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0 text-xs">
                          <i className="fas fa-check-circle"></i>
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            project.highlights &&
            project.highlights.length > 0 && (
              <div className="mb-5 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold mb-3 text-black dark:text-white flex items-center gap-2">
                  <span>Engineering Highlights</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0 text-xs">
                        <i className="fas fa-check-circle"></i>
                      </span>
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {project.detailedDescription && !project.highlights && !project.sections && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {project.detailedDescription}
            </p>
          )}

          {project.engineeringFocus && project.engineeringFocus.length > 0 && (
            <div className="mb-5 sm:mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
                Engineering Focus
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.engineeringFocus.map((focus) => (
                  <span
                    key={focus}
                    className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-5 sm:mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-medium px-5 py-2.5 rounded-lg inline-flex items-center justify-center text-sm transition-colors duration-200"
              >
                <i className="fab fa-github mr-2"></i>View on GitHub
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-5 py-2.5 rounded-lg inline-flex items-center justify-center text-sm transition-colors duration-200"
              >
                <i className="fas fa-external-link-alt mr-2"></i>Live Demo
              </a>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 text-xl sm:text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
        >
          <i className="fas fa-times"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-800 py-4 sm:py-6">
    <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
      <p className="text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Harshal Jadhav. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default App;
