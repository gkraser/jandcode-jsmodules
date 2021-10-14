//todo как то это все упростить...
function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./unittest/', true, /\.test.js$/));
