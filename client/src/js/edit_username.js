//$(document).ready(function () { });

function buildHomepage () {
  $usernameArea = $('div#username');

  getUser(buildUsername);

  function getUser (cb) {
    $.ajax({
      url: '/api/user',
      type: 'GET',
      success: cb
    });
  }

  function buildUsername (user) {
    $usernameArea.empty();
    (user.username ? buildDisplay : buildEdit)(user.username);
  }

  function buildDisplay (username) {
    $usernameArea.append('<span class="username-heading">Username:</span><span class="username">' + username + '</span>');
  }

  function buildEdit () {
    $usernameArea.append('<span class="username-heading">Username:</span><div class="input-group"><input type="text" class="form-control" placeholder="Enter username ..." id="username" /><span class="input-group-btn"><button class="btn btn-default" id="submit-username" type="button">Go!</button></span></div>');
    $('button#submit-username').click(submitUsername)
  }

  function submitUsername () {
    $usernameArea.removeClass('has-error');
    $('div#username-alert').remove();
    var data = {
      username: $('input#username').val()
    };
    if (!data.username) return;

    $.ajax({
      url: '/api/user/username',
      type: 'POST',
      data: data,
      success: function () { buildUsername(data); },
      error: function (err) {
        if (err.status === 409) {
          $usernameArea.addClass('has-error');
          $usernameArea.prepend('<div id="username-alert" class="alert alert-danger">The username is not available.</div>');
        }
      }
    });
  }
}

