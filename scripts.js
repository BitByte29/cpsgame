const api_url2 = "https://cpsgame-back.onrender.com/play";
function loadData(records = []) {
  var table_data = "";
  final = records[records.length - 1].score;
  for (let i = 0; (i < records.length) & (i < 10); i++) {
    table_data += `<tr>`;
    table_data += `<td>${records[i].name}</td>`;
    table_data += `<td>${records[i].time}</td>`;
    table_data += `<td>${records[i].score}</td>`;
    table_data += `<td>${records[i].date}</td>`;
    table_data += `<td>`;
    table_data += `<button class="btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
    table_data += "</td>";
    table_data += `</tr>`;
  }
  //console.log(table_data);
  document.getElementById("tbody").innerHTML = table_data;
}

function deleteData(id) {
  user_input = prompt("Enter Password to delete..");
  if (user_input == "hsp") {
    fetch(api_url2, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }
}

function postData(val) {
  var name = document.getElementById("name").value || "John";
  var time = document.getElementById("time").value;
  var score = val;

  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const year = d.getFullYear();
  const text = `${day}-${month}-${year}`;

  data = { name: name, time: time, score: score, date: text };

  fetch(api_url2, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {});
}

function getData() {
  fetch(api_url2)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("rankers").innerText = data.length;
      loadData(data);
    });
}

clicks = 0;
time2 = 1;
const btn = document.querySelector(".btn");
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function closeD() {
  var item = document.getElementById("lastDisplay");
  item.style.display = "none";
  location.reload();
}
function display(val) {
  var item = document.getElementById("lastDisplay");
  imgs = document.getElementById("dispimg");
  head = document.getElementById("disph");
  if (val >= 11) {
    imgs.src = "./imgs/cheetahM.jfif";
    head.innerHTML = `Your score is ${val} you are a Cheetah.`;
  } else if (val < 11 && val >= 8) {
    imgs.src = "./imgs/rabbit.jfif";
    head.innerHTML = `Your score is ${val} you are a Rabbit.`;
  } else if (val < 8 && val >= 6) {
    imgs.src = "./imgs/elephant.jfif";
    head.innerHTML = `Your score is ${val} you are an Elephant.`;
  } else {
    imgs.src = "./imgs/snail.jfif";
    head.innerHTML = `Your score is ${val} you are a Snail.`;
  }
  item.style.display = "flex";
}

function cps() {
  clicks += 1;
  time = document.getElementById("time").value;
  if (!time) {
    alert("Please enter Time to continue.");
    window.location.reload();
  }
  document.getElementById("clickarea").style.background = getRandomColor();

  if (time2 < time) {
    val = clicks / time2;
    val = val.toFixed(2);
    document.getElementById("score").innerHTML = val;
    document.getElementById("clickcount").innerHTML = clicks;
    document.getElementById("remt").innerHTML = parseInt(time - time2) + "s";
  } else {
    clearInterval(myInterval);
    display(val);
    postData(val);
  }
}
function timer() {
  time2 += 1;
  time = document.getElementById("time").value;
  if (time2 < time) {
    document.getElementById("remt").innerHTML =
      parseInt(time - time2 + 1) + "s";
  } else {
  }
}

function start() {
  myInterval = setInterval(timer, 1000);
  document.getElementById("start").style.display = "none";
  document.getElementById("clickarea").style.display = "block";
}
