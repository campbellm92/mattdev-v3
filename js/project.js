import { fetchProjectData } from "./api/fetchProjectData.js";

async function loadProjectPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    console.error("No project id in URL");
    window.location.href = "/";
    return;
  }

  const projectsData = await fetchProjectData();
  const project = projectsData.projects.find((p) => p.id === id);

  if (!project) {
    console.error("Project not found:", id);
    window.location.href = "/";
    return;
  }

  // render the data
  // title
  document.querySelector(".project-detail-title").textContent = project.title;

  // technologies
  const technologiesWrapper = document.querySelector(
    ".project-detail-technologies",
  );
  const technologies = project.technologies;
  technologies.forEach((tech) => {
    const element = document.createElement("span");
    element.innerText = tech;
    technologiesWrapper.append(element);
  });

  // description
  document.querySelector(".project-detail-description").textContent =
    project.description;

  // project highlights
  const highlightsList = document.querySelector(
    ".project-detail-highlights-list",
  );
  const highlights = project.highlights;
  highlights.forEach((highlight) => {
    const element = document.createElement("li");
    element.innerText = highlight;
    highlightsList.append(element);
  });

  // project links
  const linksWrapper = document.querySelector(".project-detail-links");

  if (project.links.repo) {
    const repoLink = document.createElement("a");
    repoLink.href = project.links.repo;
    repoLink.textContent = "GitHub";
    repoLink.target = "_blank";
    repoLink.rel = "noopener";
    linksWrapper.appendChild(repoLink);
  }

  if (project.links.live) {
    const liveLink = document.createElement("a");
    liveLink.href = project.links.live;
    liveLink.textContent = "Live";
    liveLink.target = "_blank";
    liveLink.rel = "noopener";
    linksWrapper.appendChild(liveLink);
  }

  // project images
  const projectImagesWrapper = document.querySelector(".project-images");
  const sectionLeft = document.querySelector(".section-left");
  const sectionRight = document.querySelector(".section-right");

  if (!project.images) {
    sectionLeft.style.width = "100%";
    sectionLeft.style.height = "100vh";
    sectionRight.style.display = "none";
  } else {
    sectionRight.style.display = "block";
    project.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = project.title;
      img.loading = "lazy";

      projectImagesWrapper.appendChild(img);
    });
  }
}
loadProjectPage();
