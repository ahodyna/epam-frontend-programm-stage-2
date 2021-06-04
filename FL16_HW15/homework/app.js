const root = document.getElementById('root');

let tweetsArr = [

]

document.getElementById('navigationButtons').addEventListener('click', () => {
    document.getElementById('tweetItems').style.display = 'none';
    document.getElementById('modifyItem').style.display = 'block';
    document.getElementById('modifyItemHeader').innerText = 'Add Tweet'
})

document.getElementById('saveModifiedItem').addEventListener('click', () => {
    let tweet = document.getElementById('modifyItemInput').value;

    if (tweetsArr.length === 0) {
        tweetsArr.push({
            id: 0,
            text: tweet,
            like: false,
        })
        document.getElementById('modifyItemInput').value = ''
    } else if (tweetsArr.length >= 1) {
        for (let i = 0; i < tweetsArr.length; i++) {
            if (tweetsArr[i].text === tweet) {
                alert('error')
                document.getElementById('modifyItemInput').value = ''
            } else {
                let id = tweetsArr[i].id + 1;
                let like = false;

                tweetsArr.push({
                    id: id,
                    text: tweet,
                    like: like,
                })
            }
        }

    }

    console.log(tweetsArr)
})