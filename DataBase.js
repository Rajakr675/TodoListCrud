let knex=require("knex")({
    client:"mysql",
    connection:{
        user:"root",
        host:"localhost",
        database:"TodoCrud",    // The database has allready  been created. 
        password:"raja@123"
    }
})

// Here is create a Table for UserData from knex Query....!

knex.schema
  .createTable("UserData", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email");
    table.string("password");
    table.bigInteger('avatarId').unsigned().index().references('id').inTable('Avatar');     // This line create a relationship between the UserData table and the Avatar table, you can use 
  })
  .then(() => {
    console.log("UserData table created");
  })
  .catch((error) => {
    console.error("UserData table is allready exist...!:");
  });


// Here is create a Table for Avatar from knex Query....!

knex.schema.createTable('Avatar',(Table) => {
    Table.increments('id').primary();
    Table.string('filename');
    Table.string('path');
    
    
  }).then(() => {
    console.log('Images table created');
  }).catch(() => {
    console.error('Images table allready exist...!');
  });

module.exports=knex