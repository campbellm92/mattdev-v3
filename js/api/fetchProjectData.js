export async function fetchProjectData() {
  const response = await fetch("/data/projects.json", {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Project data not found");
  }

  const data = await response.json();

  return data;
}
