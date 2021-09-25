const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();
const expressFileUpload = require('express-fileupload');

class Server {

    //Initializations
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.mainPath = ''
        this.settings();
        this.middlewares();
        this.staticFiles();
        this.routes();

    }

    //Settings
    settings() {

        this.app.set('port', this.port);
        this.app.set('views', path.join(__dirname, '../views'));
        //Handlebars
        this.app.engine(
            ".hbs", exphbs({
                defaultLayout: "main",
                layoutsDir: path.join(this.app.get('views'), 'layouts'),
                partialsDir: path.join(this.app.get('views'), 'partials'),
                extname: '.hbs'
            })
        );
        this.app.set("view engine", ".hbs")

        //File Upload
        this.app.use(expressFileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            abortOnLimit: true,
            responseOnLimit: 'El peso del archivo que intentas subir supera el limite permitido'

        }));
    }

    //Middlewares
    middlewares() {
        // const bodyParser = require('body-parser');
        // this.app.use(express.urlencoded({ extended: false }));
        // this.app.use(bodyParser.json());
        this.app.use(express.json());
    }

    //Static Files
    staticFiles() {
        this.app.use(express.static(path.join(__dirname, '../public')));
        // this.app.use(express.static(path.join(__dirname, '../public/assets')));

        //BS
        this.app.use("/bootstrap", express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
    }

    //Routes
    routes() {
        this.app.use(this.mainPath, require('../routes/cursos.routes'));
    }

    //Start
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });

    }
}


module.exports = Server;