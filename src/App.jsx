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
  SiOracle,
  SiGit,
  SiGithubactions,
  SiGitlab,
} from "react-icons/si";
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
              src="https://portfolio-harshal.s3.ap-south-1.amazonaws.com/IMG_20250528_112932.jpg"
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
                href="https://portfolio-harshal.s3.ap-south-1.amazonaws.com/Harshal+Jadhav+Resume.pdf"
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
const About = () => (
  <section
    id="About"
    className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
      About Me
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto">
      <AnimateOnScroll>
        <div className="text-justify">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm a Computer Science Engineer with a strong focus on DevOps, Cloud
            Infrastructure, and Automation. From backend engineering to
            designing production-ready CI/CD pipelines, I thrive at the
            intersection of code, cloud, and containers.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            I craft the design of battle-tested CI/CD pipelines using Jenkins,
            Docker, and Kubernetes—bringing infrastructure to life with
            precision and resilience.
          </p>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.2}>
        <div className="relative">
          {/* </motion.div> */}
          <motion.div
            className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 glassmorphism p-3 sm:p-4 lg:p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                10+
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                Projects Deployed
              </div>
            </div>
          </motion.div>
          <img
            src="/public/photo-1451187580459-43490279c0fa.avif"
            alt="A view of Earth from space at night, showing city lights."
            className="rounded-lg shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </AnimateOnScroll>
    </div>
  </section>
);

// Projects Page
const Projects = ({ openProjectModal }) => {
  const projects = [
    {
      title: "CMI-Construction-CRM",
      description:
        "Automated build, test, and deployment for a Node.js application.",
      tags: ["Node.js", "Jenkins", "Docker", "Kubernetes"],
      imgSrc: "/CMI.png",
    },
    {
      title: "Cloudfin Insights",
      description:
        "Serverless financial data pipeline using Lambda, RDS, Glue & QuickSight for real-time analytics.",
      tags: ["QuickSight", "AWS", "VPC", "S3", "Glue"],
      imgSrc: "/Clodfin.png",
    },
    {
      title: "Zomato Clone App",
      description:
        "CI/CD Pipeline to deploy a ZOMATO Clone App using a variety of modern DevOps tools and services.",
      tags: ["Jenkins", "Docker", "AWS", "Grafana", "Prometheus"],
      imgSrc: "/Zomato.png",
    },
    {
      title: "StreamVibe",
      description:
        "A full-stack video streaming platform. Features refreshing theme & video management capabilities.",
      tags: ["Node.js", "Vite.js", "PostgreSQL", "Docker", "AWS"],
      imgSrc: "/StreamVibe.png",
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
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
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
    { name: "Oracle Cloud", icon: <SiOracle color="#4285F4" /> },
    { name: "MySQL", icon: <FaDatabase color="#4479A1" /> },
    { name: "PostgreSQL", icon: <FaDatabase color="#336791" /> },
    { name: "Git", icon: <SiGit color="#F05032" /> },
    { name: "GitLab", icon: <SiGitlab color="#FCA121" /> },
    { name: "Github Actions", icon: <SiGithubactions color="#2088FF" /> },
    { name: "Prometheus", icon: <SiPrometheus color="#E6522C" /> },
    { name: "Grafana", icon: <SiGrafana color="#F46800" /> },
    { name: "Python", icon: <SiPython color="#3776AB" /> },
    { name: "Java", icon: <FaJava color="#007396" /> },
    { name: "Shell Scripting", icon: <FaTerminal color="#4EAA25" /> },
    { name: "Docker", icon: <FaDocker color="#2496ED" /> },
    { name: "Kubernetes", icon: <SiKubernetes color="#326CE5" /> },
    { name: "Jenkins", icon: <SiJenkins color="#D24939" /> },
    { name: "Terraform", icon: <SiTerraform color="#623CE4" /> },
    { name: "Ansible", icon: <FaRobot color="#000000" /> },
    { name: "Apache", icon: <FaFeatherAlt color="#CA2136" /> },
    { name: "NGINX", icon: <FaServer color="#009639" /> },
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
      role: "DevOps Engineer",
      company: "Kylient Software Solutions Pvt Ltd",
      duration: "April 2025 - Present",
      description: `Designing and implementing battle-tested CI/CD pipelines.
Container orchestration with Docker and Kubernetes.
Infrastructure automation and optimization.`,
      logo: "/kylient.jpg",
    },
    {
      role: "Cloud Engineer Intern",
      company: "Variant.ai",
      duration: "July 2024 - Jan 2025",
      description: `Architected scalable VPC environments on AWS.
Implemented security best practices and automation.
Cloud infrastructure monitoring and optimization.`,
      logo: "/variant.jpg",
    },
    {
      role: "Software Engineer Intern",
      company: "Infocepts",
      duration: "Jan 2024 - July 2024",
      description: `Built robust backend systems with Java.
SQL Server integration and optimization.
Full-stack development and API design.`,
      logo: "/infocepts.jpg",
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
      name: "Spring Boot 3, Spring 6 & Hibernate",
      issuer: "Udemy",
      icon: "fas fa-leaf",
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            {project.description} This is a more detailed explanation of the
            project, outlining the challenges faced, the solutions implemented,
            and the overall impact on the system's efficiency and reliability.
          </p>
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium flex items-center justify-center sm:justify-start text-sm sm:text-base"
            >
              <i className="fab fa-github mr-2"></i>View on GitHub
            </a>
            <a
              href="https://testcmi-nest.kylient.com/login"
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium flex items-center justify-center sm:justify-start text-sm sm:text-base"
            >
              <i className="fas fa-external-link-alt mr-2"></i>Live Demo
            </a>
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
