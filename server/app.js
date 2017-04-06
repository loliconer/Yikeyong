const express = require( 'express' )
const http = require( 'http' )
const path = require( 'path' )
const logger = require( 'morgan' )
const debug = require( 'debug' )()
const compression = require( 'compression' )

const app = express()
app.use( compression() )

const staticOptions = {
    dotfiles: "ignore",
    etag: true,
    extensions: false,
    index: "index.html",
    lastModified: true,
    maxAge: 0,
    redirect: true,
    setHeaders () {
    }
}
app.use( '/public', express.static( path.join( __dirname, '../public' ), staticOptions ) )

app.get( '*', ( req, res, next ) => {
    let url = path.resolve( __dirname + '/../pages' + decodeURI( req.url ) + (/\.(html|jpg)$/.test( req.url ) ? '' : '/index.html') )
    res.sendFile( url, err => next( err ) )
} )

app.use( logger( 'dev', {
    skip: ( req, res ) => {
        return !req.route
    }
} ) )

/*app.use( ( req, res, next ) => {
    let err = new Error( 'Not found' )
    err.status = 404
    next( err )
} )*/

app.use( ( err, req, res, next ) => {
    if ( err.status === 404 ) {
        res.sendFile( path.resolve( __dirname + '/../404.html' ) )
        // res.status( 404 ).render( '404' )
    } else {
        res.render( 'error', {
            message: err.message,
            error: process.env.NODE_ENV === "development" ? err : {}
        } )
    }
} )

app.set( 'port', 80 )
const server = http.createServer( app )
server.listen( 80 )

server.on( 'listening', () => {
    let addr = server.address()
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
    debug( 'Listening on ' + bind )
} )
