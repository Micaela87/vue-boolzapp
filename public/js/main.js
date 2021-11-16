const myApp = new Vue({
    el: '#app',
    data: {
       newMsg: '',
       searchParams: '',
       active: false,
       showMenu: false,
        user: {
            name: 'Anna',
            avatar: '_io',
            visible: true
        },
        contacts: [
            {
               "name": "Michele",
               "avatar": "_1",
               "visible": true,
               "inSearch": true,
               "messages": [
                  {
                     "date": "10/01/2020 15:30:55",
                     "text": "Hai portato a spasso il cane?",
                     "status": "sent"
                  },
                  {
                     "date": "10/01/2020 15:50:00",
                     "text": "Ricordati di dargli da mangiare",
                     "status": "sent"
                  },
                  {
                     "date": "10/01/2020 16:15:22",
                     "text": "Tutto fatto!",
                     "status": "received"
                  }
               ]
            },
            {
               "name": "Fabio",
               "avatar": "_2",
               "visible": false,
               "inSearch": true,
               "messages": [
                  {
                     "date": "20/03/2020 16:30:00",
                     "text": "Ciao come stai?",
                     "status": "sent"
                  },
                  {
                     "date": "20/03/2020 16:30:55",
                     "text": "Bene grazie! Stasera ci vediamo?",
                     "status": "received"
                  },
                  {
                     "date": "20/03/2020 16:35:00",
                     "text": "Mi piacerebbe ma devo andare a fare la spesa.",
                     "status": "sent"
                  }
               ]
            },
            {
               "name": "Samuele",
               "avatar": "_3",
               "visible": false,
               "inSearch": true,
               "messages": [
                  {
                     "date": "28/03/2020 10:10:40",
                     "text": "La Marianna va in campagna",
                     "status": "received"
                  },
                  {
                     "date": "28/03/2020 10:20:10",
                     "text": "Sicuro di non aver sbagliato chat?",
                     "status": "sent"
                  },
                  {
                     "date": "28/03/2020 16:15:22",
                     "text": "Ah scusa!",
                     "status": "received"
                  }
               ]
            },
            {
               "name": "Ilario",
               "avatar": "_4",
               "visible": false,
               "inSearch": true,
               "messages": [
                  {
                     "date": "10/01/2020 15:30:55",
                     "text": "Lo sai che ha aperto una nuova pizzeria?",
                     "status": "sent"
                  },
                  {
                     "date": "10/01/2020 15:50:00",
                     "text": "Si, ma preferirei andare al cinema",
                     "status": "received"
                  }
               ]
            }
         ]
    },
    methods: {
        showConversation(index) {
            console.log(index);
            this.contacts[index].visible = true;
            for (let i = 0; i < this.contacts.length; i++) {
               if (i !== index) {
                  this.contacts[i].visible = false;
               }
            }
        },
        sendMsg() {
            let date = dayjs().format('D/M/YYYY' + ' ' + 'HH:mm:ss');
           let newObj = {
            "date": `${date}`,
            "text": "",
            "status": "sent"
           }
           for (let i = 0; i < this.contacts.length; i++) {
              if (this.contacts[i].visible) {
                  newObj.text = this.newMsg;
                  this.contacts[i].messages.push(newObj);
                  newMsg = '';
                  this.automaticResponse(i);
              }
           }
           console.log(newObj);
        },
        automaticResponse(index) {
           setTimeout(function() {
               let date = dayjs().format('D/M/YYYY' + ' ' + 'HH:mm:ss');
               let newObj = {
                     "date": `${date}`,
                     "text": "Ok",
                     "status": "received"
               }
               myApp.contacts[index].messages.push(newObj);
               console.log('msg automatico', newObj);
           }, 1000)
        },
        contactListDisappears() {
           this.contacts.forEach((contact) => contact.inSearch = false);
        },
        showContactsInSearch() {
           let contactsInSearch = this.contacts.filter((contact) => {
               let name = contact.name.toLowerCase();
               if (name.includes(this.searchParams.toLowerCase())) {
                  contact.inSearch = true;
                  return contact;
               } else {
                  contact.inSearch = false;
               }
           });
           console.log(contactsInSearch);
        },
        showLatestAccess(index) {
           let latestAccess = '';
           this.contacts[index].messages.forEach((message) => {
              if (message.status === 'received') {
                  latestAccess = message.date;
              }
           });
           return latestAccess;
        },
        getLatestMsg(index) {
           let latestMsg = '';
           this.contacts[index].messages.forEach((message) => {
              if (message.status === 'received') {
                  latestMsg = message.text;
              }
           });
           let arr = latestMsg.split('');
           if (arr.length > 15) {
              for (let i = arr.length -1; i > 15; i--) {
                 arr.splice(i);
              }
           }
           let formattedMsg = arr.join('');
           if (formattedMsg.length < latestMsg.length) {
               return `${formattedMsg}...`;
           } else {
              return latestMsg;
           }
        },
        removeMsg(index1, index2) {
           this.contacts[index1].messages.splice(index2, 1);
            console.log(index1, index2);
        }
    }
});