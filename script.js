var form = document.getElementById('myForm');
form.addEventListener('submit', saveBookmarks);

function saveBookmarks(e) {
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }

    var bookmarker = {
        name : siteName,
        url : siteURL
    }
if(localStorage.getItem('bookmarkz') === null){
    var bkarray = [];
    bkarray.push(bookmarker);
    localStorage.setItem('bookmarkz',JSON.stringify(bkarray));
    console.log(bkarray);

}else{
    var bkarray =JSON.parse(localStorage.getItem('bookmarkz'));
    bkarray.push(bookmarker);
    localStorage.setItem('bookmarkz',JSON.stringify(bkarray));
    
}
   

    // re fetch
    fetchBookmarks();   

    //prevent from submitting
    e.preventDefault();
}

function fetchBookmarks() {
    var bkarray =JSON.parse(localStorage.getItem('bookmarkz'));
    var bookmarksResult = document.getElementById('bookmarksResult');
    bookmarksResult.innerHTML = '';

    for (let i = 0; i < bkarray.length; i++) {
        var name = bkarray[i].name;
        var url = bkarray[i].url;

        bookmarksResult.innerHTML += '<div class="well">' +
        '<h3>' + name + ' ' +
        '<a class="btn btn-primary" target="_blank" href="' + url + '"> Visit </a>' + ' ' +
        '<a onclick = "deleteBookmark(\''+url+'\' )" class="btn btn-danger" href="#"> Delete </a>'
        '</h3>' + 
        '</div>';
    }
}

function deleteBookmark(url) {
    var bkarray =JSON.parse(localStorage.getItem('bookmarkz'));
    for (let i = 0; i < bkarray.length; i++) {
        if(url == bkarray[i].url ){
            bkarray.splice(i,1);
         }
    
    }
    // re set back to localStorage
    localStorage.setItem('bookmarkz',JSON.stringify(bkarray));

    // re fetch
    fetchBookmarks();
}

