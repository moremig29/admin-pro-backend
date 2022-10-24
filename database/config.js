const mongoose = require('mongoose');

const dbConn = async () => {

  try {
    
    await mongoose.connect( process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log( 'DB Online' );

  } catch (error) {

    console.log( error );
    throw new Error( 'Error al inicializar la DB' );
    
  }

  //mongodb+srv://moremig29:*N.k4*jek$-*7M_@cluster0.ylcnq9w.mongodb.net/hospitaldb

  //mongodb+srv://moremig29:*N.k4*jek$-*7M_@cluster0.ylcnq9w.mongodb.net/?retryWrites=true&w=majority

}

module.exports= {
  dbConn
}