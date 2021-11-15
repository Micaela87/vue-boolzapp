const myApp = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'Anna',
            avatar: './public/resources/img/avatar_io.jpg',
            visible: true
        },
        contacts: [ 
            { 
                name: 'Michele', 
                avatar: './public/resources/img/avatar_1.jpg', 
                visible: false,
                messages: [ 
                    { 
                        date: '10/01/2020 15:30:55', 
                        text: 'Hai portato a spasso il cane?', 
                        status: 'sent'
                    }, 
                    { 
                        date: '10/01/2020 15:50:00', 
                        text: 'Ricordati di dargli da mangiare', 
                        status: 'sent'
                    }, 
                    { 
                        date: '10/01/2020 16:15:22', 
                        text: 'Tutto fatto!', 
                        status: 'received'
                    }
                ], 
            },
            {   
                name:   'Fabio',   
                avatar:   './public/resources/img/avatar_2.jpg',   
                visible:   false,   
                messages:   [   
                    {   
                        date:   '20/03/2020   16:30:00',   
                        text:   'Ciao   come   stai?',   
                        status:   'sent'   
                    },   
                    {   
                        date:   '20/03/2020   16:30:55',   
                        text:   'Bene   grazie!   Stasera   ci   vediamo?',   
                        status:   'received'   
                    },   
                    {   
                        date:   '20/03/2020   16:35:00',   
                        text:   'Mi   piacerebbe   ma   devo   andare   a   fare   la   spesa.',   
                        status:   'sent'   
                    }   
                ],   
            }
        ]
    },
    methods: {
        showConversation(index) {
            console.log(index);
            this.contacts[index].visible = true;
        }
    }
});

// console.log(myApp.getLastReceivedMsg());