const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn.js');

const Autor = require('./models/Autor.js');
const Livro = require('./models/Livro.js');

const livroRoutes = require('./routes/livroRoutes.js');

const LivroController = require('./controller/LivroController.js');

app.engine('handlebars', exphbs.engine({
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
);

app.use(flash());

app.use(express.static('public/assets'));

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }

    next();
});

app.use('/livros', livroRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

conn
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));