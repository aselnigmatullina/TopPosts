console.log('worked');

const rootEl = document.getElementById('root');

const posts = [];
const addFormEl = document.createElement('form');
addFormEl.className = 'form-inline mb-2';
addFormEl.innerHTML = `
    <div class="form-group">
        <input class="form-control" data-id="link">
    </div>
    <select class="custom-select" data-id="type">
        <option value="regular">Обычный</option>
        <option value="image">Изображение</option>
        <option value="audio">Аудио</option>
        <option value="video">Видео</option>
    </select>
    <button class="btn btn-primary">Ok</button>
`;
const linkEl = addFormEl.querySelector('[data-id=link]');
const typeEl = addFormEl.querySelector('[data-id=type]');

addFormEl.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const value = linkEl.value;
    const type = typeEl.value; 
    console.log(type);
    posts.push({
        value,
        type,
        likes: 0,
        favorite: false,
        selected: false,
    }); 
    console.log(posts);
    linkEl.value = '';
    typeEl.value = 'regular';
    rebuildList(postsEl, posts);
});
rootEl.appendChild(addFormEl);

const postsEl = document.createElement('div');
rootEl.appendChild(postsEl);

function rebuildList(containerEl, items) {
    containerEl.innerHTML = '';
    for (const item of items) {
        const postEl = document.createElement('div');
        postEl.className = 'card mb-2';
        if (item.type === 'regular') {
            postEl.innerHTML = `
                <div class="card-body">
                    <div class="card-text">${item.value}</div>
                    <button class="btn">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                    <button class="btn btn-danger" data-action="delete">delete</button>
                    <button class="btn btn-primary" data-action="toggle-favorite">Выбрать</button>    
                </div>
            `;
        } else if (item.type === 'image') {
            postEl.innerHTML = `
                <img src="${item.value}" class="card-img-top">
                <div class="card-body">
                    <button class="btn">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                    <button class="btn btn-danger" data-action="delete">delete</button>
                    <button class="btn btn-primary" data-action="toggle-favorite">Выбрать</button>
                </div>
            `;
        } else if(item.type ==='video'){
            postEl.innerHTML = `
                <div class = "card">
                <div class = "card-img-topcard-img-top embed-responsive embed-responsive-16by9">
                <video src = "${item.value}" class = "embed-responsive-item" controls>
                </div>
                <div class = "card-body">
                <button class="btn">♡ ${item.likes}</button>
                <button class="btn btn-primary" data-action="like">like</button>
                <button class="btn btn-danger" data-action="dislike">dislike</button>
                <button class="btn btn-danger" data-action="delete">delete</button>
                <button class="btn btn-primary" data-action="toggle-favorite">Выбрать</button>   
                </div>
                </div>
            `;
        } else if(item.type === 'audio'){
            postEl.innerHTML = `
            <div class = "card">
            <div class = "card-img-topcard-img-top embed-responsive embed-responsive-16by9">
                <audio src = "${item.value}"  class = "embed-responsive-item" controls>
            </div>
            <div class = "card-body"
            <button class="btn">♡ ${item.likes}</button>
            <button class="btn btn-primary" data-action="like">like</button>
            <button class="btn btn-danger" data-action="dislike">dislike</button>
            <button class="btn btn-danger" data-action="delete">delete</button>
            <button class="btn btn-primary" data-action="toggle-favorite">Выбрать</button>
            </div>
            </div>
            `;
        }

        postEl.addEventListener('click', function (ev) {
            if (ev.target.dataset.action === 'delete') {
                ev.currentTarget.parentElement.removeChild(ev.currentTarget);
                return;
            }

            if (ev.target.dataset.action === 'toggle-favorite') {
                ev.currentTarget.classList.toggle('message_favorite');
                return; 
            }
            if(ev.target.dataset.action ==='like'){      
                item.likes++;
                items.sort((a,b) => b.likes-a.likes)
                rebuildList(containerEl, items);
                }

            if(ev.target.dataset.action ==='dislike'){
                item.likes < 1 ? 0 : item.likes--;
                items.sort((a,b) => b.likes - a.likes)
                rebuildList(containerEl, items)
                }
            ev.currentTarget.classList.toggle('message_selected');
        });    
        containerEl.appendChild(postEl);              
    }
}
    
        