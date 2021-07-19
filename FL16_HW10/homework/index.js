function isEditorRole(role) {
    return role === 'sport' || role === 'info' || role === 'politics' || role === 'general'
}

const numberofArticles = 5;
const timeout = 60000;


class BaseMagazineState {
    constructor(magazine) {
        this.magazine = magazine
    }

}

class ReadyForPushNotification extends BaseMagazineState {

    approveBy(user) {
        if (user.role === 'manager') {
            console.log(`Hello ${user.name}. You can't approve. We don't have enough of publications.`)
        } else {
            console.log('you do not have permissions to do it')
        }
    }

    addArticleBy(user, article) {
        if (isEditorRole(user.role)) {
            this.magazine.addArticle(user.role, article)
            if (this.magazine.getArticlesAmount() === numberofArticles) {
                this.magazine.state = new ReadyForApprove(this.magazine)
            }
        } else {
            console.log(`Hello ${user.name}, you do not have permissions to do it`)
        }
    }
    publishBy(user) {
        console.log(`Hello ${user.name}. You can't publish. We are creating publications now.`)
    }

}

class ReadyForApprove extends BaseMagazineState {
    approveBy(user) {
        if (user.role === 'manager') {
            console.log(`Hello ${user.name} You've approved the changes`)
            this.magazine.state = new ReadyForPublish(this.magazine)
        } else {
            console.log('you do not have permissions to do it')
        }
    }
    addArticleBy(user, article) {
        if (isEditorRole(user.role)) {
            this.magazine.listOfArticles.push(article)
        } else {
            console.log(`Hello ${user.name}, you do not have permissions to do it`)
        }
    }
    publishBy(user) {
        console.log(`Hello ${user.name}. You can't publish. We don't have a manager's approval.`)
    }
}

class ReadyForPublish extends BaseMagazineState {
    approveBy(user) {
        console.log(`Hello ${user.name} Publications have been already approved by you.`)
    }
    addArticleBy(user) {
        console.log(`Hello ${user.name}. You can't add article after article list has been approved.`)
    }
    publishBy(user) {
        console.log(`Hello ${user.name} You've recently published publications.`)
        this.magazine.state = new PublishInProgress(this.magazine)

        this.magazine.notify()

        console.log('transfered to PubInProgress')
        setTimeout(() => {
            this.magazine.resetState()
        }, timeout)
    }

}

class PublishInProgress extends BaseMagazineState {
    approveBy(user) {
        console.log(`Hello ${user.name}. While we are publishing we can't do any actions`)
    }
    addArticleBy(user) {
        console.log(`Hello ${user.name}. While we are publishing we can't do any actions`)
    }
    publishBy(user) {
        console.log(`Hello ${user.name}. While we are publishing we can't do any actions.`)
    }
}


class MagazineEmployee {
    constructor(name, role, magazine) {
        this.name = name,
            this.role = role,
            this.magazine = magazine
    }

    addArticle(article) {
        this.magazine.addArticleBy(this, article)
    }
    approve() {
        this.magazine.approveBy(this)
    }
    publish() {
        this.magazine.publishBy(this)
    }

}

class Follower {
    constructor(name) {
        this.name = name
    }

    subscribeTo(magazine, topic) {
        magazine.subscribe(this, topic)
    }

    unsubscribeTo(magazine, topic) {
        magazine.unsubscribe(this, topic)
    }

    onUpdate(data) {
        console.log(`something about ${data.topic} ${this.name}`)
    }

}

class Magazine {
    constructor() {
        this.resetState()
        this.staff = [];
        this.listOfArticles = [];
        this.subscriptions = [];
    }

    resetState() {
        this.state = new ReadyForPushNotification(this);
    }

    addArticleBy(user, article) {
        this.state.addArticleBy(user, article)
    }

    approveBy(user) {
        this.state.approveBy(user)
    }

    publishBy(user) {
        this.state.publishBy(user)
    }

    getArticlesAmount() {
        return this.listOfArticles.length;
    }

    addArticle(topic, article) {
        this.listOfArticles.push({ topic: topic, article: article })
    }

    notify() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            const subscription = this.subscriptions[i];

            for (let j = 0; j < this.listOfArticles.length; j++) {
                const articleTopic = this.listOfArticles[j].topic;
                if (subscription.topic === articleTopic) {
                    subscription.user.onUpdate(this.listOfArticles[j])
                }
            }
        }
    }

    subscribe(user, topic) {
        this.subscriptions.push({ user: user, topic: topic })
    }

    unsubscribe(user, topic) {
        this.subscriptions = this.subscriptions.filter(subs => subs.user !== user || subs.topic !== topic)
    }

}