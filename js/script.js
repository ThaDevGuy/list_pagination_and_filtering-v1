/*jshint esversion: 6 */ 
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***************
Global Variables
****************/
const page = document.querySelector('.page');
const studentList = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('.page-header');
const studentName = document.querySelectorAll('.student-details h3');
let studentFound = [];//array to hold indexes of found student from search

//Functions
//hides and shows required number of student per page
const showPage = (list, pageNumber) => {
    //hide all items and any error message available
    for(let i = 0; i < studentList.length; i++){
        studentList[i].style.display = 'none';
    }
    if(document.querySelector('.error')){
        page.removeChild(document.querySelector('.error'));
    }
    //check if list is not empty and then show page dependent on list
    if(list.length > 0) {
        const numOfPages = Math.ceil(list.length/10);
        let studentPerPage = 10;
        //check for difference in studentPerPage on last page when 10 isn't evenly divisible
        if((list.length % 10 > 0) && (pageNumber === numOfPages)){
            studentPerPage = list.length % 10;
        }
        const startIndex = (pageNumber === 1) ? 0 : (pageNumber - 1) * 10;
        const endIndex = startIndex + studentPerPage;
        if(studentFound.length > 0){
            //using indexes of student found to display them from studentList
            for(let i = startIndex; i < endIndex; i++){
                studentList[list[i]].style.display = '';
            }
        }
        else {
            for(let i = startIndex; i < endIndex; i++){
                list[i].style.display = '';
            }
        }
    }
    //if empty then show noResultMessage
    else {
        //create and append error message to page
        const noResultMessage = (() => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error';
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Oops! Not Found!!';
            errorMessage.style.fontSize = '1.5em';
            errorMessage.style.textAlign = 'center';
            errorMessage.style.color = '#B25900';
            errorDiv.appendChild(errorMessage);
            page.appendChild(errorDiv);
        })();
    }
};

const appendPageLinks = (list) => {
    let pageNumber = 0;
    //remove pagination if any exist
    if(document.querySelector('.pagination')){
        page.removeChild(document.querySelector('.pagination'));
    }
    //implement pagination if list is not empty
    if(list.length > 0) {
        //create and Append pageLinks
        const createAppendPageLinks = (() => {
            const paginationDiv = document.createElement('div');
            paginationDiv.className = 'pagination';
            const paginationUl = document.createElement('ul');
            for(let i = 0; i < Math.ceil(list.length/10); i++){
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = i + 1;
                const li = document.createElement('li');
                li.appendChild(a);
                paginationUl.appendChild(li);
            }
            paginationUl.children[0].children[0].className = 'active';//add active class default to page 1
            paginationDiv.appendChild(paginationUl);
            page.appendChild(paginationDiv);
        })();
        //checks for Page number and returns it
        const checkPageNumber = () => {
            let pageNumber = 0;
            const pageLinks = document.querySelectorAll('.pagination a');
            for(let i = 0; i < Math.ceil(list.length/10); i++){
                if(pageLinks[i].className === 'active'){
                    pageNumber = parseInt(pageLinks[i].textContent);
                    break;
                }
            }
            return pageNumber;
        };
        //show page dependent on list and pageNumber
        showPage(list, checkPageNumber());

        //show page for any pagelink clicked
        document.querySelector('.pagination').addEventListener('click', (event) => {
            if(event.target.tagName === "A"){
                const pageLinks = document.querySelectorAll('.pagination a');
                //remove active class for all
                for(let i = 0; i < Math.ceil(list.length/10); i++){
                    pageLinks[i].className = '';
                }
                //add active class to clicked number
                event.target.className  = 'active';
                //showpage dependent on click
                showPage(list, checkPageNumber());
            }
        });

    }
    else {
        showPage(list, pageNumber);
    }
};

//create and append search bar and call
const createSearchBar = (() => {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search for students...';
    searchDiv.appendChild(searchInput);
    pageHeader.appendChild(searchDiv);
})();

const searchInput = document.querySelector('.search-input');

appendPageLinks(studentList);

//event listener for search mechanism
searchInput.addEventListener('keyup', (event) => {
    studentFound = [];
    const searchString = searchInput.value.toLowerCase();
    if(searchString !== ''){
        for(let i = 0; i < studentList.length; i++){
            if(studentName[i].textContent.toLowerCase().includes(searchString)) {
                studentFound.push(i);
            }
        }
    }
   if(searchInput.value.length > 0){
        appendPageLinks(studentFound);
    }
    else {
        appendPageLinks(studentList);
    }
});





