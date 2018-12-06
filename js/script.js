/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables
const studentList = document.querySelectorAll('.student-item');
const page = document.querySelector('.page');



//showPage()-:shows up to 10items on page 
//depending on list and page number;

const showPage = (list, pageNumber) => {
    const numOfPages = Math.ceil(list.length/10);
    const studentPerPage = (pageNumber === numOfPages) ? list.length % 10 : 10;
    const startIndex = (pageNumber === 1) ? 0 : (pageNumber - 1) * 10;
    const endIndex = startIndex + studentPerPage;
    //first hide all items
    for(let i = 0; i < list.length; i++){
        list[i].style.display = 'none';
    }
    //And show only items dependent on page number;
    for(let i = startIndex; i < endIndex; i++){
        list[i].style.display = '';
    }
}



const appendPageLinks = (list) => {
    showPage(studentList, 1);
    //create pagination and append
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
    paginationUl.children[0].children[0].className = 'active';
    paginationDiv.appendChild(paginationUl);
    page.appendChild(paginationDiv);
    paginationDiv.addEventListener('click', (event) => {
        if(event.target.tagName === "A"){
            //remove active class for any
            for(let i = 0; i < Math.ceil(list.length/10); i++){
                paginationUl.children[i].children[0].className = '';
            }
            //add active class to clicked number
            event.target.className  = 'active';
        }
    });

}

appendPageLinks(studentList);