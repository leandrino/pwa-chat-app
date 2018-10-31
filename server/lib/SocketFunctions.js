const diff = require('lodash/fp/difference');

module.exports = class {
    constructor(){
        this.users = [];
        this.id = 1;
        this.tempUserList = []
        this.cleaner = setInterval(() => {
            
            let ids = this.users.map((user) => {
                return user.id
            })
            let tempIds = this.tempUserList.map((user) => {
                return user.id
            })
            console.log('diff(ids, tempIds)', diff(ids, tempIds))

            let idsNeedsRemoved = diff(ids, tempIds);
            if(idsNeedsRemoved.length){
                console.log('idsNeedsRemoved', idsNeedsRemoved)
    
                let indexesNeedsRemoved = idsNeedsRemoved.map((id) => {
                        return this.users.findIndex(user => {
                            return user.id === id 
                        })
                })
    
                console.log('indexesNeedsRemoved',indexesNeedsRemoved);
                indexesNeedsRemoved.map(index => {
                    this.users.splice(index, 1);
                })
            }
            let idsToAdd = diff(tempIds, ids);
            if(idsToAdd.length){
                
                this.tempUserList.map(user => {
                    if(idsToAdd.includes(user.id)){
                        this.users.push(user)
                    }
                })
            }
            this.tempUserList = []
        }, 4000);

        
        this.addUser = this.addUser.bind(this);
        this.userListCleanup = this.userListCleanup.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    addUser(join){
        if(join.id){
            this.users = this.users.filter(( user ) => {
                return user.id !== join.id;
            })

            this.users.push({room: join.room, id: join.id, username: join.username})
            let userList = this.users.filter(( user ) => {
                return user.room == join.room
            }) 
            join.userList = userList
            return join
            
        } else {
            this.users.push({room: join.room, id: this.id, username: join.username})
            let userList = this.users.filter((user)=>{
                return user.room == join.room
            })
            join.id = this.id 
            join.userList = userList
            this.id ++;
            return join
        }
    }


    userListCleanup(checkingInUser){

        let userList = this.users.filter((user)=>{
            return user.room == checkingInUser.room
        })
        console.log('checkingInUser',checkingInUser)
        let alreadyInList = this.tempUserList.findIndex((user) => {
            return user.id === checkingInUser.id
        })
        console.log('checkingInUser',alreadyInList)
        console.log('checkingInUser',alreadyInList !== -1)
        if(alreadyInList === -1){
            this.tempUserList.push(checkingInUser)
            return userList
        }else{
            return userList
        }
    }

    removeUser(left){
        const myUsers = this.users.filter(user => {
            return user.id !== left.id
        })
        this.users = myUsers
        let userList = this.users.filter((user)=>{
            return user.room === left.room
        })
        left.userList = userList
        return left
    }
    sendMessage(message){
        message.timestamp = new Date();
        return message
    }
}