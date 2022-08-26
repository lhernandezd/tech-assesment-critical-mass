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
    elementLink.href = `#${item.section}`;
    elementLink.innerText = item.label;

    // add element to element
    element.appendChild(elementLink);
    navigation.appendChild(element);
  });
}

createNavigationElements();
