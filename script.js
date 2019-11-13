//navbar js
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");
var page = 0
var pageno = 0
navbarToggler.addEventListener("click", navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

//getting data for detailed search
const id = document.getElementById("root");
async function get(value, ty, year, page) {
  var url = 'http://www.omdbapi.com/?apikey=bd29b313';
  var data;
  //console.log(value)
  //console.log(ty)
  //console.log(year)
  if (ty) {
    url += "&type="
    url += ty
  }
  if (year) {
    url += "&year="
    url += year
  }
  if (page) {
    var pageno = page
    url += "&page="
    url += pageno
  }
  if (value) {
    url += "&s="
    url += value
  }


  //console.log(url)
  const response = await fetch(url);
  data = await response.json();
  var d = "<section class=\"container\">"
  if (data.Response == "True") {

    //console.log(data)
    for (n in data.Search) {
      d += "<span class=\"image\" onclick=\"tit(data.Search[n].title)\"><a style=\"display:inline; all: unset\" href=\"showmovie.html?title=" + data.Search[n].Title + "&type=" + data.Search[n].type + "&year=" + data.Search[n].Year + "\"><div class=\"title\"><p>" + data.Search[n].Title + "</p></div>";
      if (data.Search[n].Poster != "N/A") {
        d += "<img src=" + data.Search[n].Poster + "/></a></span>";
      } else {

        d += "<img src=\"images/imagenotfound.svg\"/></a></span>";
      }
    }

    if (data.totalResults > 10) {
     // console.log(data.totalResults / 10)
      pageno++
      if (pageno < data.totalResults / 10) {
        d += "<br><a href=\"filter.html?title=" + value + "&page=" + pageno + "\">Next</a>"
      }

    }
    d += "</section>"

    document.getElementById("values").innerHTML = d;
  } else {
    if (data.Error == "Something went wrong.") {
      var err = ""
      //console.log(data.Error)
      err += "<center><h2>"
      err += "Enter the Search term and hit search"
      err += "<h2></center>"
    } else {
      var err = ""
      err += "<center><h2>"
      err += data.Error
      err += "<h2></center>"
    }


    document.getElementById("values").innerHTML = err
  }
}



//getting data for quick search

async function qget(value) {
  if (value.length > 1) {
    url = "http://www.omdbapi.com/?apikey=bd29b313&s="
    //console.log(url + value)
    const response = await fetch(url + value);
    data = await response.json();
    var d = "<section class=\"container\">"

    //console.log(data)
    if (data.Response == "True") {

      for (n in data.Search) {
        d += "<span class=\"image\"><a style=\"display:inline; all: unset\" href=\"showmovie.html?title=" + data.Search[n].Title + "&type=" + data.Search[n].type + "&year=" + data.Search[n].Year + "\"><div class=\"title\"><p>" + data.Search[n].Title + "</p></div>";
        if (data.Search[n].Poster != "N/A") {
          d += "<img src=" + data.Search[n].Poster + "/></a></span>";
        } else {

          d += "<img src=\"images/imagenotfound.svg\"/></a></span>";
        }
      }

      if (data.totalResults > 10) {
       // console.log(data.totalResults / 10)
        page++
        if (page < data.totalResults / 10) {
          d += "<br><a href=\"index.html?title=" + value + "&page=" + page + "\"><button style=\"width:50vw;\">Next</button></a>"
        }

      }
      d += "</section>"

      document.getElementById("values").innerHTML = d;
    } else {
      if (data.Error == "Something went wrong.") {
        var err = ""
       // console.log(data.Error)
        err += "<center><h2>"
        err += "Enter the Search term and hit search"
        err += "<h2></center>"
      } else {
        var err = ""
        err += "<center><h2>"
        err += data.Error
        err += "<h2></center>"
      }

      document.getElementById("values").innerHTML = err
    }
  }
}