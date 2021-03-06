const api_url2 = "https://click29.herokuapp.com/play";
;

function loadData(records = []) {
	var table_data = "";
	final = records[records.length-1].score
	for(let i=0; i < records.length & i<10; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].time}</td>`;
		table_data += `<td>${records[i].score}</td>`;
		table_data += `<td>${records[i].date}</td>`;
		table_data += `<td>`;
		table_data += `<button class="btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += '</td>'
		table_data += `</tr>`;
		
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}


function deleteData(id) {
	user_input = prompt("Enter Password to delete..");
	if(user_input == 'hsp' ) {
		fetch(api_url2, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}




function postData(val) {
	var name = document.getElementById("name").value;
	var time = document.getElementById("time").value;
	var score = val;

	var d = new Date();
	text = d.toDateString(); 
	
	data = {name: name, time:time, score: score ,date:text};
	
	fetch(api_url2, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	

function getData() {
	fetch(api_url2)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}