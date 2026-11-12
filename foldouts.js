document.querySelectorAll(".paper-content, .work").forEach((paper, paperIndex) => {
  const controls = document.createElement("div");
  controls.className = "paper-controls";

  const disclosures = paper.querySelectorAll(":scope > details");
  paper.insertBefore(controls, paper.querySelector(":scope > .actions") || disclosures[0]);

  disclosures.forEach((details, index) => {
    const label = details.querySelector("summary");
    const button = document.createElement("button");
    const panel = document.createElement("div");

    panel.className = "foldout";
    panel.id = `paper-${paperIndex + 1}-foldout-${index + 1}`;
    panel.hidden = true;
    label.remove();
    panel.append(...details.childNodes);
    details.replaceWith(panel);

    button.type = "button";
    button.textContent = label.textContent === "Abstract summary" ? "Abstract" : label.textContent;
    button.setAttribute("aria-controls", panel.id);
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      button.setAttribute("aria-expanded", String(!panel.hidden));
    });
    controls.append(button);
  });

  const links = paper.querySelector(":scope > .actions");
  if (links) controls.append(links);
});

const figureLink = document.querySelector(".paper-figure");
const figurePreview = document.querySelector("#figure-preview");

if (figureLink && typeof figurePreview?.showModal === "function") {
  figureLink.setAttribute("aria-haspopup", "dialog");
  figureLink.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    figurePreview.showModal();
  });
  figurePreview.addEventListener("close", () => figureLink.focus());
}
