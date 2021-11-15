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
                visible: true,
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
            }
        ]
    }
});

// console.log(myApp.getLastReceivedMsg());