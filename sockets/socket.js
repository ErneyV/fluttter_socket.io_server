const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
// const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Slayer'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('antrhaxh'));
bands.addBand(new Band('Exodus'));
bands.addBand(new Band('Slipknot'));
console.log(bands);



io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'nuevo Mensaje del Administrador' })
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name)
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());

    });


    client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    // client.on('emitir-mensaje', (payload) => {
    //     // console.log(payload);

    //     //io.emit('nuevo-mensaje', payload) // emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload) // emite a todos menos al que lo emitio

    // });
});