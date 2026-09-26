//1.  Scroll to top

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 2.  Table collaps

function toggleTable(headerElement) {
    const currentContainer = headerElement.parentElement;
    const isAlreadyActive = currentContainer.classList.contains('active');
    
    const allContainers = document.querySelectorAll('.table-container');
    allContainers.forEach(container => {
        container.classList.remove('active');
        container.querySelector('.icon').textContent = '▼';
    });
    
    if (!isAlreadyActive) {
        currentContainer.classList.add('active');
        headerElement.querySelector('.icon').textContent = '▲';
    }
};

//3.  search from content table
function ContentSearch() {
    var input = document.getElementById("contentInput");
    var filter = input.value.toUpperCase();
    var tables = document.querySelectorAll(".searchable-table");
    
    for (var k = 0; k < tables.length; k++) {
        var tr = tables[k].getElementsByTagName("tr");
        var visibleRowCount = 0;
        
        for (var i = 1; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td");
            var matchFound = false;
            
            for (var j = 0; j < td.length; j++) {
                if (td[j]) {
                    var txtValue = td[j].textContent || td[j].innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        matchFound = true;
                        break;
                    }
                }
            }
            
            if (matchFound) {
                tr[i].style.display = "";
                visibleRowCount++;
            } else {
                tr[i].style.display = "none";
            }
        }
        
        var tableWrapper = tables[k].closest(".table-wrapper");
        
        if (visibleRowCount > 0) {
            if (tableWrapper) {
                tableWrapper.style.display = "";
            } else {
                tables[k].style.display = "";
            }
        } else {
            if (tableWrapper) {
                tableWrapper.style.display = "none";
            } else {
                tables[k].style.display = "none";
            }
        }
    }
};


//4.  Search and Filter

document.getElementById('searchInput').addEventListener('keyup', function () {
    const filter = this.value.trim().toLowerCase();
    
    const tables = document.querySelectorAll('.searchable-table');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        let hasVisibleRow = false;
        rows.forEach(row => {
            removeHighlights(row);
            const rowText = row.textContent.toLowerCase();
            
            if (filter === '') {
                row.style.display = '';
                hasVisibleRow = true;
            } else if (rowText.includes(filter)) {
                row.style.display = '';
                applyHighlight(row, filter);
                hasVisibleRow = true;
            } else {
                row.style.display = 'none';
            }
        });
        
        if (hasVisibleRow) {
            table.style.display = '';
        } else {
            table.style.display = 'none';
        }
    });
    
    const contents = document.querySelectorAll('.searchable-content');
    contents.forEach(container => {
        removeHighlights(container);
        
        const containerText = container.textContent.toLowerCase();
        
        if (filter === '') {
            container.style.display = '';
        } else if (containerText.includes(filter)) {
            container.style.display = '';
            applyHighlight(container, filter);
        } else {
            container.style.display = 'none';
        }
    });
});

function removeHighlights(element) {
    element.querySelectorAll('.highlight').forEach(highlightedEl => {
        const parent = highlightedEl.parentNode;
        parent.replaceChild(document.createTextNode(highlightedEl.textContent), highlightedEl);
        parent.normalize();
    });
}

function applyHighlight(element, textToHighlight) {
    const innerHTML = element.innerHTML;
    const regex = new RegExp(`(${textToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    
    element.innerHTML = innerHTML.replace(/(<[^>]*>)|([^<]+)/g, function(match, isTag, textNode) {
        if (isTag) return isTag;
        return textNode.replace(regex, '<mark class="highlight">$1</mark>');
    });
}

//5. Questions and Answers render
function question() {
    const questionContainer = document.getElementById('question');
    
    questionData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'qa-card';
        
        card.innerHTML = `
        <div class="question"><span class="q-no">${index + 1}.</span> ${item.question}</div>
        <div class="answer" id="answer-${index}">
        <strong class="a-no">উত্তর:</strong> ${item.answer}
        </div>
        `;
        
        questionContainer.appendChild(card);
    });
}

question();

//7. 







