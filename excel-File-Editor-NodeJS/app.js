const express = require("express");
const ejs = require("ejs");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
const xlsx = require("xlsx");
const path = require("path");
var newFile;
var blob;

app.get("/", function(req, res){
    res.render("home");
})
app.post("/", function(req, res){
    var file = req.body.file;
    var newSheet = convertToNewData(file);
    var newWb = xlsx.utils.book_new();
    newWb.SheetNames.push("Sheet1");
    newWb.Sheets["Sheet1"] = newSheet;
    console.log(newWb);

    xlsx.writeFile(newWb, path.resolve(__dirname + "/files"+"/result.xlsx"));
    res.redirect("/download");
})
app.get("/download", function(req, res){
    const file = __dirname+"/files/result.xlsx";
    res.download(file);
})
app.listen(3000, function(){
    console.log("Server has started and running..");
})

function convertToNewData(file){
    const wb = xlsx.readFile(file, {cellDates: true});
    var ws = wb.Sheets[wb.SheetNames[0]];
    var data = xlsx.utils.sheet_to_json(ws);

    var newData = []
    var sortArray = [];
    var dataSchema = {
        ProductLine: String,
        Territory: String,
        Shipped_Units: 0,
        Net_Shipped_Units: 0,
        Net_Sales: 0
    }
    data.forEach((record) => {
        var Data = {};
        if(record["YEAR_ID"] === 2004){
            if(record["STATUS"] === "Shipped"){
                var x = isPresent(sortArray, [record["PRODUCTLINE"], record["TERRITORY"]]);        
                if(x === -1){
                    Data.ProductLine = record["PRODUCTLINE"];;
                    Data.Territory = record["TERRITORY"];
                    Data.Shipped_Units = 1;
                    Data.Net_Shipped_Units=record["QUANTITYORDERED"];
                    Data.Net_Sales = record["SALES"];
                    sortArray.push([record["PRODUCTLINE"], record["TERRITORY"]]);
                    newData.push(Data);
                }
                else{
                    var it = x;
                    newData[it].Net_Sales += record["SALES"];
                    newData[it].Net_Shipped_Units+= record["QUANTITYORDERED"];
                    newData[it].Shipped_Units += 1; 
                }
            }
        }   
    });
    var newSheet = xlsx.utils.json_to_sheet(newData);
    return newSheet;

}

function isPresent(sortArray, two_value){
    if(sortArray.length === 0){
        return -1;
    }
    else{
        for(var i=0; i<sortArray.length;i++){
            if(sortArray[i][0] === two_value[0] && sortArray[i][1]===two_value[1]){
                return i;
            }
        }
        return -1;
    }
}

function s2ab(s){
    var buf = new ArrayBuffer(s.length); //convert s to array buffer
    var view = new Uint8Array(buf); //create unitBarray as viewer
    for(var i=0;i<s.length;i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}