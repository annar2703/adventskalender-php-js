setTimeout(() => {
  createDoorsOnContent();
  document.querySelector("body").addEventListener("click", () => {
    overlay.style.display = "none";
  });
  document.querySelector("#day").addEventListener("click", (event) => {
    event.stopPropagation(); // Verhindert das Propagieren des Events zum Body
  });
}, 0);

function createDoorsOnContent() {
  let parent = document.querySelector("#content");

  parent.innerHTML = "";
  for (let i = 1; i <= 24; i++) {
    const div = document.createElement("div"); // Create a new div
    div.id = `content_${i}`; // Set the id attribute
    div.className = "door";
    let html = `<div> 
    <h2 id="doorNum">${i}</h2>
    </div>`;
    div.onclick = function () {
      loadDoors(`${i}`);
    };
    div.innerHTML = `${html}`; // Add text content to the div
    parent.appendChild(div); // Append the div to the parent
  }
}

function loadDoors(id) {
  fetch(`./api/doors.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // optional logging

      if (data.code == 200) {
        let html = `<h1 id="uebereschrift">${data.doors[0].header}</h1>`;
        if (data.doors[0].img1 !== "a") {
          html += `<div id="bilderInDoor"><p><img class="imgclass" alt='door${id}' src='./img/${data.doors[0].img1}'></p>`;
        }
        if (data.doors[0].img2 !== "a") {
          html += `<p><img class="imgclass" alt='door${id}' src='./img/${data.doors[0].img2}'></p>`;
        }

        let like = localStorage.getItem("liked" + id);

        html += `<p>${data.doors[0].blogEntry}</p></div>
                 <a id="linki" href="${data.doors[0].links}">Mehr</a>
                 <div id="likeDay${id}" onclick="likeDay(${id})">🤍</div>`;

        document.querySelector("#day").innerHTML = html;

        setTimeout(() => {
          showLike(id);
        });
      } else {
        document.querySelector("#day").innerHTML =
          "<h2>Dieser Post ist noch nicht veröffentlicht.</h2>";
      }

      document.querySelector("#overlay").style.display = "flex";
    })
    .catch((error) => {
      console.log(error);
    });
}

function showLike(id) {
  let like = localStorage.getItem("liked" + id)
  if (like == "true") {
    document.querySelector(`#likeDay${id}`).innerHTML = "❤️";
  } else {
    document.querySelector(`#likeDay${id}`).innerHTML = "🤍";
  }
}

function likeDay(id) {
  console.log(id);
  if (localStorage.getItem("liked" + id) == "true") {
    localStorage.setItem("liked" + id, "false");
  } else {
    localStorage.setItem("liked" + id, "true");
  }
  showLike(id);
}

function home() {
  let parent = document.querySelector("#content");
  parent.innerHTML = "<img alt='olaf' src='./img/olaf.jpg'>";
}

function showLikedDays() {
  let html = "";
  document.querySelector("#content").innerHTML = "";
  for (let i = 1; i <= 24; i++) {
    let item = localStorage.getItem("liked" + i);
    if (item == "true") {
      html += `<h1 onclick="loadDoors(${i})" id="uebereschrift">❤️ Tag${i}</h1>`;
    }
  }

  document.querySelector("#content").innerHTML = html;
}
