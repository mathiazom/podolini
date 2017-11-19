function init(){
  loadPods();
  document.getElementById('play_button').addEventListener("click",function(){
    var podIndex = Math.floor(Math.random() * podArray.length);
    playPod(podArray[podIndex]);
  })
}

function playPod(pod){
  document.getElementById('podcast_audio').src = pod.enclosure.link;
  document.getElementById('current_playing_pod').innerHTML = "Spiller nå " + pod.title;
  document.getElementById('current_playing_pod').style.display = "block";
}

let podArray = new Array();

function loadPods(){
  var url= 'http://podkast.nrk.no/program/radioresepsjonen.rss';
  $.ajax({
    type: 'GET',
    url: "https://morning-earth-19323.herokuapp.com/?feedURL=" + url,
    dataType: 'json',
    success: function(data) {
      console.log(data);
      for(item of data.items){
        var podLink = item.enclosures[0].url;
        var podIndex = data.items.indexOf(item);
        podArray[podIndex] = item;

        var podRow = document.createElement("tr");
        podRow.className = "podlist_row";
        podRow.addEventListener("click",function(){
          playPod(podArray[podIndex]);
        })

        var podTitle = document.createElement("td");
        podTitle.className = "podlist_item"
        podTitle.innerHTML = item.title;

        var podDate = document.createElement("td");
        podDate.className = "podlist_item"
        podDate.innerHTML = new Date(item.created);

        var podDuration = document.createElement("td");
        podDuration.className = "podlist_item"
        podDuration.innerHTML = item.enclosures[0].length;

        podRow.appendChild(podTitle);
        podRow.appendChild(podDate);
        podRow.appendChild(podDuration);

        document.getElementById('podlist_table').appendChild(podRow);
      }
    }
  });
}

/*
function positionMainDiv(){
  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  var main_div = document.getElementById('main_div');

  var topOffset = ((height/2)-(main_div.clientHeight))+ "px";

  main_div.style.marginTop = topOffset;
}
*/
init();
