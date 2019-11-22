const posts = [];

const rootEl = document.getElementById('root');
const formEl = document.createElement('form');
formEl.className = 'form-inline mb-2 justify-content-center';

formEl.innerHTML = `
    <div class="form-group">
        <input class="form-control" data-type="link">
    </div>
    <select class="custom-select" data-type="type">
        <option> Обычный текст </option>
        <option> Изображение   </option>
        <option> Аудио         </option>
        <option> Видео         </option>
    </select>
    <button class="btn btn-primary" data-type="btn">Ok</button>
`;
const linkEl = formEl.querySelector('[data-type=link]');
const typeEl = formEl.querySelector('[data-type=type]');
const btnEl  = formEl.querySelector('[data-type=btn]');

btnEl.addEventListener('click', ev => {
    ev.preventDefault();
    const value = linkEl.value;
    const type  = typeEl.value;
    posts.push({
        value,
        type,
        likes: 0,
    });
    linkEl.value = '';
    typeEl.value = 'Обычный текст';
    linkEl.focus();
    addPost(postsEl, posts);
})

rootEl.appendChild(formEl);

const postsEl = document.createElement('div');
rootEl.appendChild(postsEl);

function addPost(containerEl, items) {
    for (const item of [...containerEl.children]) {
        containerEl.removeChild(item)
    }
    items.sort((a, b) => b.likes - a.likes)
    for (const item of items) {
        const postEl = document.createElement('div');
        postEl.className = 'card mb-2';
        if (item.type === 'Обычный текст') {
            postEl.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">${item.value}</p>
                        <button data-action="like" class="btn btn-primary">♡ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'Изображение') {
            postEl.innerHTML = `
                <div class="card">
                    <img src="${item.value}" class="card-img-top" width="200" height="200">
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary">♡ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'Видео') {
            postEl.innerHTML = `
                <div class="card">
                    <div class="card-img-top embed-responsive embed-responsive-16by9">
                        <video src="${item.value}" controls=""></video>
                    </div>
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary">♡ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        } else if (item.type === 'Аудио') {
            postEl.innerHTML = `
                <div class = "card">
                <div class = "card-img-topcard-img-top embed-responsive embed-responsive-16by9">
                    <audio src = "${item.value}"  class = "embed-responsive-item" controls>
                </div>
                    <div class="card-body">
                        <button data-action="like" class="btn btn-primary">♡ ${item.likes}</button>
                        <button data-action="dislike" class="btn btn-primary">👎</button>
                    </div>
                </div>
           `;
        }
        postEl.addEventListener('click', ev => {
            if (ev.target.dataset.action === 'like') {
                item.likes++;
            } else if (ev.target.dataset.action === 'dislike') {
                item.likes--;
            } 
            addPost(containerEl, items);
        })
        containerEl.appendChild(postEl);
    }
}



   
 
    


 

        
           
   
 
    
        