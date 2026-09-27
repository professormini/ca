//1.  Scroll to top

function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

//2.  search from content table
function contentSearch() {
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
