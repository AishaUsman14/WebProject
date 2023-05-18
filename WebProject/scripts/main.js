const userslist = "Users";
const connecteduser = "Connected-user";

function getuser(username, password) {
    let st = localStorage.getItem(userslist);
    if(st == null){
        return null;
    }
    var users = JSON.parse(st);
    for (let i = 0; i < users.length; i++) {
        if (users[i][0] == username && users[i][1] == password) {
            return users[i];
        }
    }

    return null;
}

function adduser(username, password, email, surname, firstname) {
    let st = localStorage.getItem(userslist);
    var studentid = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    var user = [username, password, email, surname, firstname, "ESTA-" + studentid];
    console.log(user);

    if (st == null) {
        var users = [];
        users.push(user);
        localStorage.setItem(userslist, JSON.stringify(users));
    }
    else {
        var users = JSON.parse(st);
        users.push(user);
        localStorage.setItem(userslist, JSON.stringify(users));
    }
    return true;
}

function connectuser(user){
    localStorage.setItem(connecteduser, JSON.stringify(user));
    console.log("connected" + user)
}

function getconnecteduser(){
    var ls = localStorage.getItem(connecteduser);
    if(ls == null){
        return null;
    }
    return JSON.parse(ls);
}

function disconnectuser(){
    localStorage.setItem(connecteduser, JSON.stringify(null));
}