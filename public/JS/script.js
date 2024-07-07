// document.addEventListener('DOMContentLoaded',function(){
//     const allButtons = document.querySelectorAll('.searchBtn');
//     const searchBar = document.querySelector('.searchBar');
//     const searchInput = document.getElementById('searchInput');
//     const searchClose = document.getElementById('searchClose');

//     for(var i = 0; i< allButtons.length;i++){
//         allButtons[i].addEventListener('click',function(){
//             searchBar.style.visibility = 'visible';
//             searchBar.classList.add('open');
//             this.setAttribute('aria-expanded', 'true');
//             searchInput.focus();
//         });
//     }
//     searchClose.addEventListener('click',function(){
//         searchBar.style.visibility = 'hidden';
//         searchBar.classList.remove('open');
//         this.setAttribute('aria-expanded', 'false');
        
//     });
// });
document.addEventListener('DOMContentLoaded', function () {
    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    // Log the elements to check if they are found
    console.log(allButtons, searchBar, searchInput, searchClose);

    if (searchBar && searchInput && searchClose) {
        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i]) {
                allButtons[i].addEventListener('click', function () {
                    searchBar.style.visibility = 'visible';
                    searchBar.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                    searchInput.focus();
                });
            } else {
                console.error('Button not found:', i);
            }
        }
        searchClose.addEventListener('click', function () {
            searchBar.style.visibility = 'hidden';
            searchBar.classList.remove('open');
            this.setAttribute('aria-expanded', 'false');
        });
    } else {
        console.error('One or more elements are not found:', {
            searchBar,
            searchInput,
            searchClose,
        });
    }
});
