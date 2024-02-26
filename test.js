const msg = {
    isCommandExist: true,
    message: '.test'
}
const command = msg.message.slice(1)
switch (command) {
    case 'test':
        console.log('oke')
        break
    case 'ping':
        console.log('ping')
        break
    default:
        msg.isCommandExist = false
}
if (msg.isCommandExist) {
    //deletemessage
}