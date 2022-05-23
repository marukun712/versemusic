//定義
const ytiframe = 'youtubearea';
const targetWindow = document.getElementById(ytiframe).contentWindow;

const ytControl = function(action, arg = null) {
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

var url = generate_api_url(pagetoken)
get_api_data();

//読み込み時
function get_api_data() {
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);

            pagetoken = data.nextPageToken;
            for (var i = 0; i < data.items.length; i++) {
                results.push({
                    "title": data.items[i].snippet.title,
                    "id": data.items[i].snippet.resourceId.videoId
                });
            }
            if (pagetoken !== undefined) {
                get_api_data();
            } else { console.log(results) }

        }
    }

    function getdata() {
        var card = document.getElementById("cardzone");

        while (card.lastChild) {
            card.removeChild(card.lastChild);
        }
        for (var i = 0; i < 4; i++) {
            var id = results[i].id
            var title = results[i].title
            var image = `https://img.youtube.com/vi/${id}/mqdefault.jpg`

            card.insertAdjacentHTML("beforeend", `<div class="bg-gray-900 shadow-lg rounded p-2" id='maincard' style="height: 10%; width: 20%;"><div class="group relative"><img class="w-full md:w-100 block rounded" src="${image}" alt="" /> <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"> <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition" onclick="getId(this)" id="${i}"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" /></svg> </button></div></div><div class="p-5"><h1 class="text-white text-lg">${title}</h1></div></div> <h1>　　</h1>`);
        }

    }
    setTimeout(getdata, 1000)
}


function getalldata(lol) {
    if (lol.value == "off") {
        lol.value = "on";
        var card = document.getElementById("cardzone");

        while (card.lastChild) {
            card.removeChild(card.lastChild);
        }
        for (var i = 0; i < results.length; i++) {
            var id = results[i].id
            var title = results[i].title
            var image = `https://img.youtube.com/vi/${id}/mqdefault.jpg`

            card.insertAdjacentHTML("beforeend", `<div class="bg-gray-900 shadow-lg rounded p-2" id='maincard' style="height: 10%; width: 20%;"><div class="group relative"><img class="w-full md:w-100 block rounded" src="${image}" alt="" /> <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"> <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition" onclick="getId(this)" id="${i}"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" /></svg> </button></div></div><div class="p-5"><h1 class="text-white text-lg">${title}</h1></div></div> <h1>　　</h1>`);

        }
        document.getElementById('movietext').innerHTML = '閉じる'
    } else {
        lol.value = "off";
        var card = document.getElementById("cardzone");

        while (card.lastChild) {
            card.removeChild(card.lastChild);
        }
        for (var i = 0; i < 4; i++) {
            var id = results[i].id
            var title = results[i].title
            var image = `https://img.youtube.com/vi/${id}/mqdefault.jpg`

            card.insertAdjacentHTML("beforeend", `<div class="bg-gray-900 shadow-lg rounded p-2" id='maincard' style="height: 10%; width: 20%;"><div class="group relative"><img class="w-full md:w-100 block rounded" src="${image}" alt="" /> <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"> <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition" onclick="getId(this)" id="${i}"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" /></svg> </button></div></div><div class="p-5"><h1 class="text-white text-lg">${title}</h1></div></div> <h1>　　</h1>`);
        }
        document.getElementById('movietext').innerHTML = 'もっと見る'

    }

}

//再生開始時　
var time = document.getElementById('time')

function start() {
    bar = setInterval(() => {
        time.value++
    }, 1030);
}

getId = function(el) {

    var area = document.getElementById('youtubearea')
    var targetid = results[el.id].id
    var targettitle = results[el.id].title
    var targetimage = `https://img.youtube.com/vi/${targetid}/mqdefault.jpg`
    console.log(targetid, targettitle, targetimage)
    area.setAttribute('src', `https://www.youtube.com/embed/${targetid}?enablejsapi=1`)
    var img = document.getElementById('cimage')
    var title = document.getElementById('ctitle')
    img.setAttribute('src', `${targetimage}`)
    title.innerHTML = targettitle

    function play() {
        ytControl('unMute');
        ytControl('playVideo');
        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${targetid}&part=contentDetails&key=${apikey}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                times = data.items[0].contentDetails.duration

                var match = times.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

                match = match.slice(1).map(function(x) {
                    if (x != null) {
                        return x.replace(/\D/, '');
                    }
                });

                var hours = (parseInt(match[0]) || 0);
                var minutes = (parseInt(match[1]) || 0);
                var seconds = (parseInt(match[2]) || 0);
                result = hours * 3600 + minutes * 60 + seconds
                time.setAttribute('max', result)

            })

        time.value = 0
    }



    setTimeout(play, 1000)
    setTimeout(start, 1000)
    clearInterval(bar)

}


//ボタン類
function playpause(lol) {
    if (lol.value == "play") {
        lol.value = "pause";
        ytControl('pauseVideo');
        clearInterval(bar)
    } else {
        lol.value = "play";
        ytControl('playVideo');
        start();
    }
}

var elem = document.getElementById('range');
var target = document.getElementById('value');
var rangeValue = function(elem, target) {
    return function(evt) {
        ytControl('setVolume', `[${elem.value}]`);

    }
}
elem.addEventListener('input', rangeValue(elem, target));

var rangeValue = function(time) {
    return function(evt) {
        ytControl('seekTo', `[${time.value},true]`);
    }
}
time.addEventListener('input', rangeValue(time));

function loop(lol) {
    if (lol.value == "unloop") {
        lol.value = "loop";

        function loopstatus() {
            loops = setInterval(() => {
                if (time.value == result) {
                    ytControl('seekTo', `[0,true]`);
                    time.value = 0
                } else {}
            }, 1030);
        }
        loopstatus();

        document.getElementById('loopimg').setAttribute('src', '../img/loop.png')

    } else {
        lol.value = "unloop";
        clearInterval(loops)
        document.getElementById('loopimg').setAttribute('src', '../img/loopoff.png')
    }
}

function OnOff(lol) {
    var img = document.getElementById('muteimg')
    if (lol.value == "mute") {
        lol.value = "unmute";
        ytControl('unMute');
        img.setAttribute('src', '../img/unmute.png')
    } else {
        lol.value = "mute";
        ytControl('mute');
        img.setAttribute('src', '../img/mute.png')

    }
}

function search() {
    var value = document.getElementById('searcharea').value
}