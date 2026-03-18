import { fetchProjectData } from "./api/fetchProjectData.js";

async function renderProjectCardsData() {
  const projectCardsTemplate = document.getElementById("project-card-template");
  const projectCardWrapper = document.querySelector(".project-cards-wrapper");
  const projectsData = await fetchProjectData();

  projectsData.projects.forEach((project) => {
    const cardClone = projectCardsTemplate.content.cloneNode(true);

    cardClone.querySelector(".project-card-title").textContent = project.title;

    // inject project status span elements
    if (project.status.length > 0) {
      const elementBefore = cardClone.querySelector(".project-card-title");

      const statusContainer = document.createElement("div");
      statusContainer.classList.add("project-status");

      project.status.forEach((status) => {
        const span = document.createElement("span");
        span.textContent = status;
        statusContainer.appendChild(span);
      });

      elementBefore.after(statusContainer);
    }

    const linksContainer = cardClone.querySelector(".project-card-links");
    if (project.links?.live) {
      const liveLink = document.createElement("a");
      liveLink.href = project.links.live;
      liveLink.textContent = "Live";
      liveLink.target = "_blank";
      liveLink.rel = "noopener";
      linksContainer.appendChild(liveLink);
    }
    if (project.links?.preview) {
      const previewLink = document.createElement("a");
      previewLink.href = project.links.preview;
      previewLink.textContent = "Live preview";
      previewLink.target = "_blank";
      previewLink.rel = "noopener";
      linksContainer.appendChild(previewLink);
    }
    if (project.links?.repo) {
      const repoLink = document.createElement("a");
      repoLink.href = project.links.repo;
      repoLink.textContent = "GitHub";
      repoLink.target = "_blank";
      repoLink.rel = "noopener";
      linksContainer.appendChild(repoLink);
    }
    cardClone.querySelector(".read-more-link").href =
      `/project.html?id=${project.id}`;

    projectCardWrapper.appendChild(cardClone);
  });
}
renderProjectCardsData();
