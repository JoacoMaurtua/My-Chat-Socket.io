const express = require('express');

const app = express();

const PORT = 8000;






app.listen(PORT,()=>{
  console.log(`1:Server running in PORT ${PORT}`)
})