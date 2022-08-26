function fetchData() {
  return fetch("/data.json")
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      throw Error(err);
      console.log(err);
    });
}

function calculateIndicatorPosition() {
  const currentActiveElement = document.querySelectorAll("a.active")[0];
  const leftOffset = currentActiveElement.offsetLeft;
  const width = currentActiveElement.offsetWidth;

  indicator.style.left = `${leftOffset}px`;
  indicator.style.width = `${width}px`;
}

function setElementAndIndicatorState(element, initial = false) {
  const activeLink = document.querySelectorAll("a.active");

  // remove active class from all links
  activeLink.forEach((item) => {
    item.classList.remove("active");
  });

  // add active class to clicked link
  element.classList.add("active");

  calculateIndicatorPosition();

  // handle initial state
  if (initial) {
    element.parentElement.setAttribute("aria-selected", "true");
    indicator.style.display = "inline-block";
  }
}

async function createNavigationElements() {
  const navigation = document.getElementById("navigation-list");
  const { cities } = await fetchData();

  cities.forEach((item, index) => {
    const element = document.createElement("li");
    const elementLink = document.createElement("a");

    // add properties to element
    element.setAttribute("id", `navigation-item-${index}`);
    element.setAttribute("role", "tab");
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-selected", "false");
    elementLink.setAttribute("data-section", `${item.section}`);
    elementLink.setAttribute("data-timezone", `${item.timezone}`);
    elementLink.href = `#${item.section}`;
    elementLink.innerText = item.label;

    elementLink.addEventListener("click", (e) => {
      e.preventDefault();
      setElementAndIndicatorState(e.target);
    });

    // add element to element
    element.appendChild(elementLink);
    navigation.appendChild(element);
  });

  // set initial active state
  setInitialActiveState();
}

function setInitialActiveState() {
  const element = document.querySelector("#navigation-list li:first-child a");
  if (element) setElementAndIndicatorState(element, true);
}

const indicator = document.getElementById("navigation-indicator");

createNavigationElements();

window.addEventListener("resize", () => {
  calculateIndicatorPosition();
});
