$(document).ready(function() {
  $("#searchBtn").click(function() {
    $("#searchDiv").hide("slow");
    $("#searchInputDiv").fadeIn();
    $("#searchInputDiv > input").val('');
  });

  $(".searchInput").keydown(function(event) {
    switch (event.which) {
      case 13:
        if (this.value === '') {
          $("#result").hide();
          $("#article-link a").attr('href', '#').hide();
          break;
        }
        let searchTxt = this.value;
        $("#result").show();
        doSearch(searchTxt);
        break;
      case 27:
        $("#searchDiv").show("slow");
        $("#searchInputDiv").fadeOut();
        $("#result").hide();
        $("#article-link a").attr('href', '#').hide();
        break;
    }
  });
});

function doSearch(searchTxt) {
  $.ajax( {
      url: 'https://en.wikipedia.org/w/api.php',
      data: { action: 'query', titles: searchTxt, prop: 'extracts', format: 'json' },
      dataType: 'jsonp',
      type: 'GET',
      success: function(data) {
         processResponse(data);
      }
  });
}

function processResponse(data) {
  let pages = data.query.pages;
  for (let page in pages) {
    let textToShow = pages[page].extract;
    $('#article-link a').hide();
    if (page == -1) {
      textToShow = 'No articles found';
    } else if (textToShow === '') {
      textToShow = 'The article is empty';
    } else {
      $('#article-link a').attr('href', `https://en.wikipedia.org/?curid=${page}`).show();
    }
    $('#article').html(`<div class="result-text">${textToShow}</div>`);
  }
}
