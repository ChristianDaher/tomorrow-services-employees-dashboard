const search = document.querySelector('.searchBar');

search.addEventListener('keyup', filter);
select.addEventListener('click', filter);

function filter() {
    let filter = search.value.toLowerCase().trim();
    filter = isNaN(Number(filter)) ? filter : Number(filter);
    let filterRegex = new RegExp('(^|[ -])' + filter);
    // let filterRegex = new RegExp(filter);


    let rows = tableBody.getElementsByTagName('tr');
    let index = select.selectedIndex;
    for (i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let containsFilter = false;
        if (index == 0 || index == 1) {
            for (j = 0; j < cells.length; j++) {
                if (filterRegex.exec(cells[j].textContent.toLowerCase().trim()) != null) {
                    containsFilter = true;
                    break;
                }
                else containsFilter = false;
            }   
        }
        else {
            let cell = rows[i].getElementsByTagName('td')[index];
            filterRegex.exec(cell.textContent.toLowerCase().trim()) != null ? containsFilter = true : containsFilter = false;
        }
        if (search.value.trim().length == 0) containsFilter = true;
        containsFilter ? rows[i].style.display = '' : rows[i].style.display = 'none';
    }
}

function sortTableByColumn(column, asc = true) {
    const direction = asc ? 1 : -1;
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const sortedRows = rows.sort((a, b) => {
        let aText = a.querySelector(`td:nth-child(${column + 1})`).textContent.toLowerCase();
        let bText = b.querySelector(`td:nth-child(${column + 1})`).textContent.toLowerCase();
        if (column == 3) {
            aText = Number(a.querySelector(`td:nth-child(${column + 1})`).textContent);
            bText = Number(b.querySelector(`td:nth-child(${column + 1})`).textContent);
        }
        return aText > bText ? 1 * direction : -1 * direction;
    })
    deleteTable();
    tableBody.append(...sortedRows);
    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc);
}

tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        if (!header.classList.contains('th-sort-asc') && !header.classList.contains('th-sort-desc')) counter = 0;
        else if (header.classList.contains('th-sort-asc')) { counter = 1; }
        else if (header.classList.contains('th-sort-desc')) { counter = 2 }
        const headerIndex = Array.prototype.indexOf.call(header.parentElement.children, header);
        const currentIsAscending = header.classList.contains('th-sort-asc');
        counter++;
        if (counter % 3 !== 0) sortTableByColumn(headerIndex, !currentIsAscending);
        else {
            table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
            deleteTable();
            tableBody.append(...initialRows);
            counter = 0
        }
    });
});