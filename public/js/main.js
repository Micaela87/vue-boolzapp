const myApp = new Vue({
    el: '#app',
    data: {
         //  dynamic data
         newMsg: '',
         searchParams: '',
         // detects exact message user is hovering over
         currentlyHovering: '', 
         show: false,
         // detects exact arrow clicked to display dropdown menu
         currentlyClicking: '',
         menuShow: false,
         condition: false,
         // detects selected contact
         currentlySelected: 0,
         currentIndex: 0,
         // static data
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
               "visible": true,
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
               "visible": true,
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
               "visible": true,
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
      // methods
      methods: {
         // displays the conversation had with the selected contact
         showConversation(index) {
            this.currentlySelected = index;
            this.menuShow = false;
         },
         // adds a msg to the static data
         sendMsg() {
            let date = dayjs().format('D/M/YYYY' + ' ' + 'HH:mm:ss');
            let newObj = {
            "date": `${date}`,
            "text": "",
            "status": "sent"
            }
            
            if (this.newMsg.length !== 0) {
               newObj.text = this.newMsg;
               this.contacts[this.currentlySelected].messages.push(newObj);
               this.automaticResponse(this.currentlySelected);
               this.newMsg = '';
            }
         },
         // sends an automatic response
         automaticResponse(index) {
            setTimeout(function() {
               let date = dayjs().format('D/M/YYYY' + ' ' + 'HH:mm:ss');
               let newObj = {
                     "date": `${date}`,
                     "text": "Ok",
                     "status": "received"
               }
               myApp.contacts[index].messages.push(newObj);
            }, 1000);
            this.scrollHeight();
         },
         // hides all contacts when focus is on the searchbar
         contactListDisappears() {
            this.contacts.forEach((contact) => contact.visible = false);
         },
         // searches for the contacts according to searchParams
         showContactsInSearch() {
            let contactsInSearch = this.contacts.filter((contact) => {
               let name = contact.name.toLowerCase();
               if (name.includes(this.searchParams.toLowerCase())) {
                  contact.visible = true;
               } else {
                  contact.visible = false;
               }
            });
         },
         // displays latest access according to the last msg received from the selected contact
         showLatestAccess(index) {
            let latestAccess = '';
            this.contacts[index].messages.forEach((message) => {
               if (message.status === 'received') {
                  latestAccess = message.date;
               }
            });
            return latestAccess;
         },
         // displays the last msg sent from each contact
         getLatestMsg(index) {
            let latestMsg = '';
            this.contacts[index].messages.forEach((message) => {
               if (message.status === 'received') {
                  latestMsg = message.text;
               }
            });
            // shortens msg if too long
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
         // deletes msg
         removeMsg(index1, index2) {
            this.contacts[index1].messages.splice(index2, 1);
            this.menuShow = false;
         },
         // displays arrow when hovering over a msg
         showArrow(index) {
            this.currentlyHovering = index;
            this.show = true;
            this.currentIndex = Number(this.$refs.message[index].getAttribute('data-id'));
         },
         // hides arrow when the mouse leaves a msg
         hideArrow() {
            this.show = false;
         },
         // displays the dropdown menu when clicking on arrow
         showMenu(index) {
            this.currentlyClicking = index;
            if (this.currentIndex === this.currentlySelected) {
               this.condition = true;
            }
            if (this.menuShow) {
               this.menuShow = false;
            } else {
               this.menuShow = true;
            }
         },
         showAllContacts() {
            this.contacts.forEach((contact) => contact.visible = true);
         },
      }
});