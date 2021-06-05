const root = document.getElementById('root');

let tweetsArr = []

function navigateTo(href) {
    window.location.href = href
}

document.querySelector('#navigationButtons button.addTweet').addEventListener('click', () => {
    navigateTo(`#/add`)
    document.getElementById('modifyItemInput').value = ''
})

// We are provided with half-done index.html file, and restriction to edit it in place. 
// So we have to fix missed html elements in code
const likedTweetsButtton = document.createElement('button')
likedTweetsButtton.id = 'likedTweetsButtton'
likedTweetsButtton.innerText = 'Go to liked'
likedTweetsButtton.style.display = 'none'
likedTweetsButtton.addEventListener('click', () => {
    navigateTo(`#/liked`)
})
document.getElementById('navigationButtons').appendChild(likedTweetsButtton)

// create missed liked list markup
const rootElement = document.getElementById('root')
const likedTweetsElement = document.createElement('div')
likedTweetsElement.id = 'likedTweets'
likedTweetsElement.style.display = 'none';

const likedTweetsHeader = document.createElement('h1')
likedTweetsHeader.innerText = 'Liked Tweets'
likedTweetsElement.appendChild(likedTweetsHeader)

const likedTweetsNavigationButtons = document.createElement('div')
likedTweetsElement.appendChild(likedTweetsNavigationButtons)

const mainScreenButton = document.createElement('button')
mainScreenButton.innerText = 'Back'
mainScreenButton.addEventListener('click', () => {
    navigateTo('#/')
})
likedTweetsNavigationButtons.appendChild(mainScreenButton)

const likedTweetsList = document.createElement('ul')
likedTweetsList.id = 'likedTweetsList'
likedTweetsElement.appendChild(likedTweetsList)

rootElement.appendChild(likedTweetsElement)



function hideAllPages() {
    document.getElementById('tweetItems').style.display = 'none';
    document.getElementById('likedTweets').style.display = 'none';
    document.getElementById('modifyItem').style.display = 'none';
    document.getElementById('modifyItem').style.display = 'none';
}

function renderEditPage(tweetId) {
    document.getElementById('modifyItem').setAttribute(dataTweetIdAttrName, tweetId)
    hideAllPages()
    document.getElementById('modifyItem').style.display = 'block';
    document.getElementById('modifyItemHeader').innerText = 'Edit Tweet'
}

function renderAddPage() {
    hideAllPages()
    document.getElementById('modifyItem').style.display = 'block';
    document.getElementById('modifyItemHeader').innerText = 'Add Tweet'
}

function generateId() {
    let numberId = 10000;
    return Math.ceil(Math.random() * numberId)
}

document.getElementById('cancelModification').addEventListener('click', () => {
    window.history.back();
})

const dataTweetIdAttrName = 'data-tweet-id'

document.getElementById('saveModifiedItem').addEventListener('click', () => {
    let tweetText = document.getElementById('modifyItemInput').value;

    let tweetId = document.getElementById('modifyItem').getAttribute(dataTweetIdAttrName)

    let valid = true
    for (let i = 0; i < tweetsArr.length; i++) {
        if (tweetsArr[i].text === tweetText && tweetsArr[i].id !== tweetId) {
            valid = false
        }
    }

    if (!valid) {

        let alertMessageText = document.getElementById('alertMessageText');
        alertMessageText.innerText = 'Error!You can not tweet about that';
        let alertMessageDiv = document.getElementById('alertMessage');
        alertMessageText.className = 'error'
        alertMessageDiv.style.display = 'block'
        let timeSetTimeout = 3000;
        setTimeout(() => {
            document.getElementById('alertMessage').style.display = 'none'

        }, timeSetTimeout)
    } else {
        if (tweetId !== null) {
            for (let i = 0; i < tweetsArr.length; i++) {
                if (tweetsArr[i].id + '' === tweetId + '') {
                    tweetsArr[i].text = tweetText
                }
            }
        } else {
            tweetsArr.push({
                id: generateId(),
                text: tweetText,
                liked: false
            })
        }

        document.getElementById('modifyItem').removeAttribute(dataTweetIdAttrName)
        navigateTo(`#/`)
    }
})

function prepareTweetsItem(tweetData, refreshParentListCallback) {
    const listItem = document.createElement('li')

    const itemSpan = document.createElement('span')
    itemSpan.innerText = tweetData.text
    itemSpan.setAttribute(dataTweetIdAttrName, tweetData.id)
    listItem.appendChild(itemSpan)
    itemSpan.addEventListener('click', () => {
        navigateTo(`#/edit:${tweetData.id}`)
    })
    if (tweetData.liked) {
        itemSpan.classList.add('liked');
    }

    let divBtn = document.createElement('div');
    divBtn.className = 'btn-style';
    listItem.appendChild(divBtn)


    const likeButton = document.createElement('button')
    likeButton.innerText = 'like'
    likeButton.addEventListener('click', () => {
        tweetsArr.filter(tw => tw.id === tweetData.id)
            .forEach((tw) => {
                tw.liked = !tw.liked
            })
        refreshParentListCallback()
    })
    divBtn.appendChild(likeButton)

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'remove'
    deleteButton.addEventListener('click', () => {
        tweetsArr = tweetsArr.filter(tw => tw.id !== tweetData.id)
        refreshParentListCallback()
    })
    divBtn.appendChild(deleteButton)

    return listItem
}

function hasLikedTweets() {
    for (let i = 0; i < tweetsArr.length; i++) {
        if (tweetsArr[i].liked) {
            return true
        }
    }
    return false
}

function renderTweetList() {
    hideAllPages()
    document.getElementById('tweetItems').style.display = 'block';

    const likedTweetsButtton = document.getElementById('likedTweetsButtton')
    likedTweetsButtton.style.display = hasLikedTweets() ? 'block' : 'none'

    const list = document.getElementById('list')
    list.innerHTML = ''

    for (let i = 0; i < tweetsArr.length; i++) {
        const listItem = prepareTweetsItem(tweetsArr[i], () => renderTweetList())
        list.appendChild(listItem)
    }
}


function renderLikedPage() {

    hideAllPages()
    document.getElementById('likedTweets').style.display = 'block';

    const list = document.getElementById('likedTweetsList')
    list.innerHTML = ''

    for (let i = 0; i < tweetsArr.length; i++) {
        if (tweetsArr[i].liked) {
            let tweetsItem = prepareTweetsItem(tweetsArr[i], () => renderLikedPage())
            list.appendChild(tweetsItem)
        }
    }
}

window.addEventListener('hashchange', (e) => {
    const hashIndex = e.newURL.indexOf('#')
    const newHashValue = e.newURL.substring(hashIndex)

    const oldUrlHashIndex = e.oldURL.indexOf('#')
    e.oldURL.substring(oldUrlHashIndex)

    if (newHashValue === '#/') {
        renderTweetList()
    } else if (newHashValue.startsWith('#/edit')) {
        const tweetId = newHashValue.substring('#/edit:'.length)

        renderEditPage(tweetId)
    } else if (newHashValue.startsWith('#/add')) {
        renderAddPage()
    } else if (newHashValue.startsWith('#/liked')) {
        renderLikedPage()
    }
})