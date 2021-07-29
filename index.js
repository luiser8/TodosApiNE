import express from 'express';
import dotenv from 'dotenv';
import body_parser from 'body-parser';
import compression from 'compression';
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import path from'path';
import './db.js';
import routerTodos from './routes/todos.js';

//Express inicializacion
var app = express();
app.use(compression());

app.use(morgan('combined'));
dotenv.config();

app.set('port', process.env.PORT || 9010);

// view engine setup
const __dirname = path.dirname('views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true 
}));
app.use(morgan('dev'));

//routes
app.use('/api/todos', routerTodos);
app.get('/', (req, res) => {
    res.render('index', { error: false, message:'API Todos' })
})

//catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//set port
app.listen(app.get('port'), () => {
    console.log(`Node port ${app.get('port')}`);
});