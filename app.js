console.log('worked');

let nextId = 1;
const rootEl = document.getElementById('root');
const formEl = document.createElement('form');
formEl.className = 'form-inline mb-2';
formEl.innerHTML = `
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
const linkEl = formEl.querySelector('[data-id=link]');
const typeEl = formEl.querySelector('[data-id=type]');

formEl.addEventListener('submit', ev => {
    ev.preventDefault();
    const value = linkEl.value;
    const type = typeEl.value; 

    const post = {
        id:nextId++,
        value,
        type,
        likes: 0,       
    } 
    addPost(postsEl, post);
    linkEl.value = '';
    typeEl.value = 'regular';
    linkEl.focus();
    
});
rootEl.appendChild(formEl);

const postsEl = document.createElement('div');
rootEl.appendChild(postsEl);

function addPost(containerEl, item) {
        const postEl = document.createElement('div');
        postEl.className = 'card mb-2';
        if (item.type === 'regular') {
            postEl.innerHTML = `
                <div class="card-body">
                    <div class="card-text">${item.value}</div>
                    <button class="btn" data-id="likes">♡ ${item.likes}</button>
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>   
                </div>
            `;
        } else if (item.type === 'image') {
            postEl.innerHTML = `
                <img src="${item.value}" class="card-img-top" width="200" height="200">
                <div class="card-body">
                    <button class="btn" data-id="likes"> ♡ ${item.likes}</button>                    
                    <button class="btn btn-primary" data-action="like">like</button>
                    <button class="btn btn-danger" data-action="dislike">dislike</button>
                </div>
            `;
        } else if(item.type ==='video'){
            postEl.innerHTML = `
                <div class = "card">
                <div class = "card-img-topcard-img-top embed-responsive embed-responsive-16by9">
                <video src = "${item.value}" class = "embed-responsive-item" controls>
                </div>
                <div class = "card-body">
                <button class="btn" data-id="likes"> ♡ ${item.likes}</button>
                <button class="btn btn-primary" data-action="like">like</button>
                <button class="btn btn-danger" data-action="dislike">dislike</button>
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
            <button class="btn" data-id="likes">♡ ${item.likes}</button>
            <button class="btn btn-primary" data-action="like">like</button>
            <button class="btn btn-danger" data-action="dislike">dislike</button>
            </div>
            </div>
            `;
        };
        postEl.item=item;
        postEl.querySelector('[data-action=like]').addEventListener('click', ev =>{
            item.likes++;
            syncPost(postEl);
        });
        postEl.querySelector('[data-action=dislike]').addEventListener('click',ev =>{
            item.likes--;
            syncPost(postEl);
        });
        containerEl.appendChild(postEl);
    }

    function syncPost(itemEl){
        itemEl.querySelector('[data-id=likes]').textContent = itemEl.item.likes;
        const parentEl = itemEl.parentElement;
        const childrenEl = Array.from(parentEl.children);
        childrenEl.sort((a,b) =>{
            return -(a.item.likes - b.item.likes);
        });
        const itemIndex = childrenEl.indexOf(itemEl);
        if(itemIndex === 0){
            parentEl.insertBefore(itemEl,parentEl.firstElementChild);
            return;
        }
        parentEl.insertBefore(itemEl,childrenEl[itemIndex+1]);
    }
        
          

        
           
   
 
    
        