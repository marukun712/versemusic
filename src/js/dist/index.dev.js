"use strict";

var ytiframe = 'youtubearea';
var targetWindow = document.getElementById(ytiframe).contentWindow;

var ag2ytControl = function ag2ytControl(action) {
  var arg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  targetWindow.postMessage('{"event":"command", "func":"' + action + '", "args":' + arg + '}', '*');
};

var apikey = 'AIzaSyASFbBIOoXju0Oz_xfprimUWUAx4FuiogI';
var listid = 'PLrK9Rz9aEzJpim9LtKWn4PnjHbevgPFH6';
var pagetoken = '';
var results = [];
var xhr = new XMLHttpRequest();

function generate_api_url(token) {
  var url = 'https://www.googleapis.com/youtube/v3/playlistItems';
  url += '?part=snippet';
  url += '&maxResults=50';

  if (pagetoken !== '') {
    url += '&pageToken=' + token;
  }

  url += '&playlistId=' + listid;
  url += '&key=' + apikey;
  return url;
}

var url = generate_api_url(pagetoken);
get_api_data();

function get_api_data() {
  xhr.open("GET", url);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      pagetoken = data.nextPageToken;

      for (var i = 0; i < 5; i++) {
        results.push({
          "title": data.items[i].snippet.title,
          "id": data.items[i].snippet.resourceId.videoId
        });
      }

      if (pagetoken !== undefined) {
        get_api_data();
      } else {
        console.log(results);
      }
    }
  };

  function getdata() {
    for (var i = 0; i < results.length; i++) {
      var id = results[i].id;
      var title = results[i].title;
      var image = "https://img.youtube.com/vi/".concat(id, "/mqdefault.jpg");
      console.log(id, title, image);
      var card = document.getElementById("cardzone");
      card.insertAdjacentHTML("beforeend", "<div class=\"bg-gray-900 shadow-lg rounded p-2\" style=\"height: 70%; width: 50%;\"><div class=\"group relative\"><img class=\"w-full md:w-100 block rounded\" src=\"".concat(image, "\" alt=\"\" /> <div class=\"absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly\"> <button class=\"hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition\" onclick=\"getId(this)\" id=\"").concat(i, "\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" fill=\"currentColor\" class=\"bi bi-play-circle-fill\" viewBox=\"0 0 16 16\"><path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z\" /></svg> </button></div></div><div class=\"p-5\"><h1 class=\"text-white text-lg\">").concat(title, "</h1></div></div> <h1>\u3000\u3000</h1>"));
    }
  }

  setTimeout(getdata, 1000);
}

getId = function getId(el) {
  console.log(el.id);
  var area = document.getElementById('youtubearea');
  var targetid = results[el.id].id;
  var targettitle = results[el.id].title;
  var targetimage = "https://img.youtube.com/vi/".concat(targetid, "/mqdefault.jpg");
  console.log(targetid, targettitle, targetimage);
  area.setAttribute('src', "https://www.youtube.com/embed/".concat(targetid, "?enablejsapi=1"));
  var img = document.getElementById('cimage');
  var title = document.getElementById('ctitle');
  img.setAttribute('src', "".concat(targetimage));
  title.innerHTML = targettitle;
};

function playpause(lol) {
  if (lol.value == "play") {
    lol.value = "pause";
    ag2ytControl('pauseVideo');
  } else {
    lol.value = "play";
    ag2ytControl('playVideo');
  }
}

var elem = document.getElementById('range');
var target = document.getElementById('value');

var rangeValue = function rangeValue(elem, target) {
  return function (evt) {
    ag2ytControl('setVolume', "[".concat(elem.value, "]"));
  };
};

elem.addEventListener('input', rangeValue(elem, target));
document.getElementById('ytseek').addEventListener('click', function (event) {
  //(secondsパラメータ : 指定の秒数の位置へ移動, allowSeekAheadパラメータ : 未バッファの位置の場合に新しいリクエストを行うか)
  ag2ytControl('seekTo', '[60,true]');
});

function OnOff(lol) {
  var img = document.getElementById('muteimg');

  if (lol.value == "mute") {
    lol.value = "unmute";
    ag2ytControl('unMute');
    img.setAttribute('src', '../img/unmute.png');
  } else {
    lol.value = "mute";
    ag2ytControl('mute');
    img.setAttribute('src', '../img/mute.png');
  }
}