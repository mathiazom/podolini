
var pods = new Array();

window.onload = function(){

  document.getElementById('splash_text').innerHTML =
    getRandomArrayItem(bjarteNavn) + ", " +
    getRandomArrayItem(toreNavn) + " og " +
    getRandomArrayItem(steinarNavn)

  loadPods();

  document.getElementById('random_play_button').addEventListener("click",function(){
    playPod(getRandomArrayItem(pods));
  })

}

function playPod(pod){

  document.getElementById('podcast_audio').src = pod.enclosures[0].url;

  document.getElementById('current_playing_pod').innerHTML = pod.title;
  document.getElementById('current_playing_div').style.display = "block";

  $('html, body').animate({scrollTop: 0}, 200);

}

function loadPods(){
  let url= 'http://podkast.nrk.no/program/radioresepsjonen.rss';
  $.ajax({
    type: 'GET',
    url: "https://morning-earth-19323.herokuapp.com/?feedURL=" + url,
    dataType: 'json',
    success: handlePodsData
  });
}

function handlePodsData(data){

  pods = data.items;

  let podsTable = document.getElementById('podlist_table');

  for(pod of pods){

    podsTable.appendChild(createPodRow(pod));

  }

  setClassDisplay("post_pods_load", "block");
  setClassDisplay("pre_pods_load", "none");

}

function createPodRow(pod){

  let podRow = document.createElement("tr");
  podRow.className = "podlist_row";
  podRow.addEventListener("click",function(){
    playPod(pod);
  })

  let podData = document.createElement("td");
  podData.className = "podlist_item";

  let podTitle = document.createElement("p");
  podTitle.className = "podlist_title";
  podTitle.innerHTML = pod.title;
  podData.appendChild(podTitle);

  let podDescription = document.createElement("p");
  podDescription.className = "podlist_description";
  podDescription.innerHTML = pod.description;
  podData.appendChild(podDescription);

  podRow.appendChild(podData);

  return podRow;

}


function getRandomArrayItem(array){
  return array[Math.floor(Math.random() * array.length)];
}

function setClassDisplay(className, display){
  let elements = document.getElementsByClassName(className);
  for(el of elements){
    el.style.display = display;
  }
}
