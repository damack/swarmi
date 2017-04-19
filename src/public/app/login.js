function readUriParameter(uri, paramName) {
    var value, matches;
    matches = uri.match(new RegExp(paramName + "=([^&]+)"));
    if (matches && matches.length > 1) {
        value = decodeURIComponent(matches[1]);
    }
    return value;
}
var href = location.href;
var token = readUriParameter(href, "access_token");

if (token) {
    var user = {
        token: token,
        expires_at: (new Date().getTime()) + ((3600 - 10 * 1) * 1000)
    };

    sessionStorage.setItem('user', JSON.stringify(user));
    location.href = "/#!/dashboard";
} else if (!sessionStorage.getItem('user') || JSON.parse(sessionStorage.getItem('user')).expires_at < (new Date().getTime())) {
    sessionStorage.clear();
    location.href = "/auth/github";
}
