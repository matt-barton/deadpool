function uploadFile(){prepareResultsDisplay();var e=$("input#resultsFile")[0].files[0],t=new FormData;t.append("resultsFile",e),$.ajax({url:"/api/searchFile",type:"POST",contentType:!1,cache:!1,processData:!1,data:t,success:displayResults,error:errorHandler,complete:requestComplete})}function requestComplete(){$("img#loading").hide()}function displayResults(e){$("div#uploadResults").prepend('<div id="resultsLength">'+e.length+" Striders found</div>"),$("table#resultsTable").append("<thead><tr><th>Result</th><th>Matched with</th></tr></thead>"),e.forEach(function(e,t){$("table#resultsTable").append("<tbody><tr"+(t%2?' class="alt"':"")+"><td>"+e.result+"</td><td>"+e.matched+"</td></tr></tbody>")})}function errorHandler(e){$("div#uploadResults").append('<div class="error">Error: '+e.responseText+"</div>")}function prepareResultsDisplay(){$("div#uploadResults").append('<img id="loading" src="/images/loading.gif">'),$("table#resultsTable").empty(),$("div#uploadResults div.error").remove(),$("div#uploadResults div#resultsLength").remove()}function uploadText(){prepareResultsDisplay(),$.ajax({url:"/api/searchText",type:"POST",data:{text:$("textarea#resultsText").val()},success:displayResults,error:errorHandler,complete:requestComplete})}$(document).ready(function(){$("input#goUpload").click(uploadFile)}),$(document).ready(function(){$("input#searchText").click(uploadText)});