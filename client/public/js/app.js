function buildHomepage(){function e(e){$usernameArea.empty(),(e.username?a:n)(e.username)}function a(e){$usernameArea.append('<span class="username-heading">Username:</span><span class="username">'+e+"</span>")}function n(){$usernameArea.append('<span class="username-heading">Username:</span><div class="input-group"><input type="text" class="form-control" placeholder="Enter username ..." id="username" /><span class="input-group-btn"><button class="btn btn-default" id="submit-username" type="button">Go!</button></span></div>'),$("button#submit-username").click(s)}function s(){$usernameArea.removeClass("has-error"),$("div#username-alert").remove();var a={username:$("input#username").val()};a.username&&$.ajax({url:"/api/user/username",type:"POST",data:a,success:function(){e(a)},error:function(e){409===e.status&&($usernameArea.addClass("has-error"),$usernameArea.prepend('<div id="username-alert" class="alert alert-danger">The username is not available.</div>'))}})}$usernameArea=$("div#username"),function(e){$.ajax({url:"/api/user",type:"GET",success:e})}(e)}