async function getAllUserFunction() {
    try {
        const res = await fetch(`http://localhost:3010/users`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function postUserFunction(test) {
    try {
        const res = await fetch(`http://localhost:3010/users`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: test,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function putUserFunction(test, id) {
    try {
        const res = await fetch(`http://localhost:3010/users/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: test,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function deleteUserFunction(id) {
    try {
        const res = await fetch(`http://localhost:3010/users/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBlogFunction() {
    try {
        const res = await fetch(`http://localhost:3010/blogs`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function postBlogFunction(test) {
    try {
        const res = await fetch(`http://localhost:3010/blogs`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: test,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function putBlogFunction(blog, id) {
    const response = await fetch(`http://localhost:3010/blogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: blog
    });

    if (!response.ok) {
        const error = await response.text();
        console.error('PUT error:', error);
        throw new Error(`Hiba a PUT kérésben: ${response.status}`);
    }
}

async function deleteBlogFunction(id) {
    try {
        const res = await fetch(`http://localhost:3010/blogs/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

let blogs = [];
let users = [];
let selectedBlogId;
const tartalom = document.getElementById("tartalom");
listBlogs();

function addUser(){
    tartalom.innerHTML = "<label for='userName'>Felhasználónév:</label> <input type='text' id='userName'>";
    tartalom.innerHTML+= "<button id='submit' onclick='saveUser()'>felhasználó mentése</button>";
    tartalom.innerHTML+= "<p id='message'></p>";
}

async function saveUser() {
    if(document.getElementById("message").innerHTML != ""){
        document.getElementById("message").innerHTML = "";
    }

    const userName = document.getElementById("userName").value.trim();
    users = await getAllUserFunction();
    if(userName != undefined && userName.length > 0){
        for(let i = 0; i < users.length; i++)
        {
            if(userName.trim() == users[i].name)
            {
                document.getElementById("message").innerHTML = "ilyen felhasználónév már létezik!";
                return
            }
        }

        let test = {
            "name": `${userName}`
        }

        await postUserFunction(JSON.stringify(test));

        tartalom.innerHTML = "";
    }
    else {
        document.getElementById("message").innerHTML = "Adjon meg felhasználónevet!";
    }
}

async function updateUser(){
    users = await getAllUserFunction();
    if(users.length != 0){
        tartalom.innerHTML = "<label for='user'>Válassz felhasználót:</label> <select name='user' id='user'>";

        const menu= document.getElementById("user");
        for(let i = 0; i<users.length; i++ ){
            menu.innerHTML +=`<option value='${users[i].id}'>${users[i].name}</option>`;
        }

        tartalom.innerHTML += "</select>";
        tartalom.innerHTML += "<label for='newUserName'>Új felhasználónév:</label> <input type='text' id='newUserName'>";
        tartalom.innerHTML += "<button id='submit' onclick='saveUpdatedUser()'>felhasználó mentése</button>";
        tartalom.innerHTML+= "<p id='message'></p>";
    }
    else{
        tartalom.innerHTML = "<p id='message'> Nincs felhasználó!</p>";
    }
}

async function saveUpdatedUser() {
    if(document.getElementById("message").innerHTML != ""){
        document.getElementById("message").innerHTML = "";
    }

    const userName = document.getElementById("newUserName").value.trim();
    users = await getAllUserFunction();
    if(userName != undefined && userName.length > 0){
        for(let i = 0; i < users.length; i++){
            if(userName.trim() == users[i].name){
                document.getElementById("message").innerHTML += "ilyen felhasználónév már létezik!";
                return
            }
        }

        const listOfSelects = document.getElementsByTagName("option");
        let id;
        for(let i = 0; i <listOfSelects.length; i++){
            if(listOfSelects[i].selected){
                id = listOfSelects[i].value;
            }
        }

        let test = {
            "name": `${userName}`
        }

        await putUserFunction(JSON.stringify(test), id);

        tartalom.innerHTML = "";
    }
    else {
        document.getElementById("message").innerHTML += "Adjon meg felhasználónevet és válasszon módosítandó felhasználót";
    }
}

async function deleteUser(){
    users = await getAllUserFunction();

    if(users.length != 0){
        tartalom.innerHTML = "<label for='user'>Válassz felhasználót törléshez:</label> <select name='user' id='user'>";

        const menu= document.getElementById("user");
        for(let i = 0; i<users.length; i++ ){
            menu.innerHTML +=`<option value='${users[i].id}'>${users[i].name}</option>`;
        }

        tartalom.innerHTML += "</select>";
        tartalom.innerHTML += "<button id='submit' onclick='deleteSelectedUser()'>felhasználó törlése</button>";
    }
    else{
        tartalom.innerHTML = "<p id='message'> Nincs felhasználó!</p>";
    }
}

async function deleteSelectedUser() {
    users = await getAllUserFunction();
    blogs = await getAllBlogFunction();

    const listOfSelects = document.getElementsByTagName("option");
    let id;
    for(let i = 0; i <listOfSelects.length; i++){
        if(listOfSelects[i].selected){
            id = listOfSelects[i].value;
        }
    }

    await deleteUserFunction(id);

    tartalom.innerHTML = "";
}

async function addBlog(){
    users = await getAllUserFunction();
    if(users.length != 0){
        tartalom.innerHTML = "<label for='user'>Válassz felhasználót:</label> <select name='user' id='user'>";

        const menu= document.getElementById("user");
        for(let i = 0; i<users.length; i++ ){
            menu.innerHTML +=`<option value='${users[i].id}'>${users[i].name}</option>`;
        }

        tartalom.innerHTML += "</select>";
        tartalom.innerHTML += "<label for='title'>Cím:</label> <input type='text' id='title'>";
        tartalom.innerHTML += "<label for='category'>Kategória:</label> <input type='text' id='category'>";
        tartalom.innerHTML += "<label for='content'>Tartalom:</label> <input type='text' id='content'>";
        tartalom.innerHTML+= "<button id='submit' onclick='saveBlog()'>blog mentése</button>";
        tartalom.innerHTML+= "<p id='message'></p>";
    }
    else{
        tartalom.innerHTML = "<p id='message'> Nincs felhasználó!</p>";
    }
}

async function saveBlog() {
    if(document.getElementById("message").innerHTML != ""){
        document.getElementById("message").innerHTML = "";
    }

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const content = document.getElementById("content").value.trim();

    users = await getAllUserFunction();
    if(title != undefined && title.length > 0&& category != undefined && category.length > 0 && content != undefined && content.length > 0){
        const listOfSelects = document.getElementsByTagName("option");
        let userId;
        for(let i = 0; i <listOfSelects.length; i++){
            if(listOfSelects[i].selected){
                userId = listOfSelects[i].value;
            }
        }

        const d = new Date();
        const dateString = `${d.getFullYear()}.${d.getMonth()}.${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        let test = {
            "userId": userId,
            "title": `${title}`,
            "category": `${category}`,
            "content": `${content}`,
            "creationDate": `${dateString}`,
            "lastModifiedDate": `${dateString}`

        };

        await postBlogFunction(JSON.stringify(test));

        tartalom.innerHTML = "";
    }
    else {
        document.getElementById("message").innerHTML = "Adjon meg minden adatot!";
    }
}

async function listBlogs() {
    tartalom.innerHTML = "";

    users =await getAllUserFunction();
    blogs =await getAllBlogFunction();

    if(blogs.length == 0){
        tartalom.innerHTML = "<p id='message'> Nincs blog!</p>";
        return
    }

    for (let i = 0; i < blogs.length; i++) {
        let selectedUser = users.find(user => user.id == blogs[i].userId);

        const blogDiv = document.createElement("div");
        blogDiv.classList.add("lista");

        blogDiv.innerHTML = `
            <p>Felhasználó: ${selectedUser.name}</p>
            <p>Cím: ${blogs[i].title}</p>
            <p>Kategória: ${blogs[i].category}</p>
            <p>Tartalma: ${blogs[i].content}</p>
            <p>Készítve: ${blogs[i].creationDate}</p>
            <p>Utoljára módosítva: ${blogs[i].lastModifiedDate}</p>
            <button class="modify" onclick='updateBlog()' value="${blogs[i].id}">Modósítás</button>
            <button class="deleteButton" value="${blogs[i].id}">Törlés</button>
        `;

        tartalom.appendChild(blogDiv);
    }

    const modifyButtons = document.getElementsByClassName('modify');
    const deleteButtons = document.getElementsByClassName('deleteButton');

    for(let i = 0; i< modifyButtons.length; i++){
        modifyButtons[i].addEventListener("click", (event) => { selectedBlogId = event.target.value });
    }

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", async (event) => {
            selectedBlogId = event.target.value;
            const confirmed = confirm("Biztosan törölni szeretnéd ezt a blogot?");
            if (confirmed) {
                await deleteBlog();
            }
        });
    }
}

async function updateBlog() {
    const modal = document.getElementById("modal");
    const titleInput = document.getElementById("title");
    const categoryInput = document.getElementById("category");
    const contentInput = document.getElementById("content");

    blogs = await getAllBlogFunction();
    const blog = blogs.find(b => b.id == selectedBlogId);

    titleInput.value = blog.title;
    categoryInput.value = blog.category;
    contentInput.value = blog.content;

    modal.classList.remove("hidden");

    document.getElementById("closeModal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    document.getElementById("submit").addEventListener("click", saveUpdatedBlog);
}

async function saveUpdatedBlog() {
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !category || !content) {
        document.getElementById("message").innerText = "Adjon meg minden adatot";
        return;
    }

    const blogs = await getAllBlogFunction();
    const blog = blogs.find(b => b.id == selectedBlogId);
    
    const updated = {
        userId: blog.userId,
        title,
        category,
        content,
        creationDate: blog.creationDate,
        lastModifiedDate: new Date().toLocaleString('hu-HU')
    };

    await putBlogFunction(JSON.stringify(updated), blog.id);
    await listBlogs();
    modal.classList.add("hidden");
}

async function deleteBlog() {
    await deleteBlogFunction(selectedBlogId);

    tartalom.innerHTML = "";
    
    await listBlogs();
}