async function fetchProjectData() {
  const response = await fetch("/data/projects.json", {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Project data not found");
  }

  const data = await response.json();
  console.log(data);

  return data;
}

async function renderProjectCardsData() {
  const projectCardsTemplate = document.getElementById("project-card-template");
  const projectCardWrapper = document.querySelector(".project-cards-wrapper");
  const projectsData = await fetchProjectData();

  projectsData.projects.forEach((project) => {
    const cardClone = projectCardsTemplate.content.cloneNode(true);

    cardClone.querySelector(".project-title").textContent = project.title;

    const linksContainer = cardClone.querySelector(".project-links");
    if (project.links?.repo) {
      const repoLink = document.createElement("a");
      repoLink.href = project.links.repo;
      repoLink.textContent = "GitHub";
      repoLink.target = "_blank";
      repoLink.rel = "noopener";
      linksContainer.appendChild(repoLink);
    }
    if (project.links?.live) {
      const liveLink = document.createElement("a");
      liveLink.href = project.links.live;
      liveLink.textContent = "Live";
      liveLink.target = "_blank";
      liveLink.rel = "noopener";
      linksContainer.appendChild(liveLink);
    }
    cardClone.querySelector(".read-more-link").href =
      `/project.html?id=${project.id}`;

    projectCardWrapper.appendChild(cardClone);
  });
}
renderProjectCardsData();
