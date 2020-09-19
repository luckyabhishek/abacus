const pdfKitEngine = require('pdfmake/src/pdfKitEngine');

const J1GettingStartedConstraints = {
    positiveNumbers : {
        0 : [0, 1, 2, 3, 4],
        1 : [0, 1, 2, 3],
        2 : [0, 1, 2],
        3 : [0, 1],
        4 : [0]
    },
    negativeNumbers : {
        0 : [0],
        1 : [0, 1],
        2 : [0, 1, 2],
        3 : [0, 1, 2, 3],
        4 : [0, 1, 2, 3, 4]
    },
    validNumbers : [0, 1, 2, 3, 4],
    text : 'Getting Started',
    file : './Sheets/J1GS'
};

const J1Introduce5Constraints = {
    positiveNumbers : {
        0 : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        1 : [0, 1, 2, 3, 5, 6, 7, 8],
        2 : [0, 1, 2, 5, 6, 7],
        3 : [0, 1, 5, 6],
        4 : [0, 5],
        5 : [0, 1, 2, 3, 4],
        6 : [0, 1, 2, 3],
        7 : [0, 1, 2],
        8 : [0, 1],
        9 : [0]
    },
    negativeNumbers : {
        0 : [0],
        1 : [0, 1],
        2 : [0, 1, 2],
        3 : [0, 1, 2, 3],
        4 : [0, 1, 2, 3, 4],
        5 : [5],
        6 : [0, 1, 5, 6],
        7 : [0, 1, 2, 5, 6, 7],
        8 : [0, 1, 2, 3, 5, 6, 7, 8],
        9 : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    validNumbers : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    text : 'Little one knows 5 now',
    file : './Sheets/J1I5'
};

const J2SmallFriends = {
    positiveNumbers : {
        0 : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        1 : [0, 1, 2, 3, 4, 5, 6, 7, 8],
        2 : [0, 1, 2, 3, 4, 5, 6, 7],
        3 : [0, 1, 2, 3, 4, 5, 6],
        4 : [0, 1, 2, 3, 4, 5],
        5 : [0, 1, 2, 3, 4],
        6 : [0, 1, 2, 3],
        7 : [0, 1, 2],
        8 : [0, 1],
        9 : [0]
    },
    negativeNumbers : {
        0 : [0],
        1 : [0, 1],
        2 : [0, 1, 2],
        3 : [0, 1, 2, 3],
        4 : [0, 1, 2, 3, 4],
        5 : [0, 1, 2, 3, 4, 5],
        6 : [0, 1, 2, 3, 4, 5, 6],
        7 : [0, 1, 2, 3, 4, 5, 6, 7],
        8 : [0, 1, 2, 3, 4, 5, 6, 7, 8],
        9 : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    validNumbers : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    text : 'Small Friends Are Okay to Have',
    file : './Sheets/J2SF'
};


const randomBool = function(){
    return Math.random() >= 0.5;
};

const randomNumber = function(){
    return Math.floor(Math.random() * 10);
};

const genNum = function(digits, constraint, operator, sum){
    var num = 0;
    for(var i=0; i < digits; i++){
        var x;
        while(true){
            x = Math.floor(Math.random() * 10);
            if(!operator){
                if(constraint.validNumbers.includes(x))
                    break;
            }
            if(operator === '+'){
                if(constraint.positiveNumbers[sum % 10].includes(x)){                    sum = Math.floor(sum/10);
                    break;
                }
            }
            if(operator === '-'){
                if(constraint.negativeNumbers[sum % 10].includes(x)){
                    sum = Math.floor(sum/10);
                    break;
                }
            }
        }
        num = num + x * Math.pow(10, i);
    }
    return num;
};

const generateSum = function(digits, levels, constraint){
    let sum = 0;
    let sumString = '';
    let sumArray = [];
    while(sum === 0){
        sum = genNum(digits, constraint);
    }
    sumArray = sumArray.concat(sum);
    sumString = sum;
    for(var i=0 ; i < levels -1; i++){
        var nextOp = (randomBool() ? '+' : '-');
        var nextNum = 0, count = 0;
        while(nextNum === 0 && count <= 5){
            nextNum = genNum(digits, constraint, nextOp, sum);
            count++;
        }
        if(nextNum === 0){
            // flip the next Op
            nextOp === '+' ? nextOp = '-' : nextOp = '+';
            count = 0;
            while(nextNum == 0 && count < 5){
                nextNum = genNum(digits, constraint, nextOp, sum);
                count++;
            }
        }
        sumString = `${sumString} ${nextOp} ${nextNum}`;
        sumArray = sumArray.concat(nextOp);
        sumArray = sumArray.concat(nextNum);
        nextOp === '+' ? sum = sum + nextNum : sum = sum - nextNum;
    }
    sumArray = sumArray.concat(sum);
    return sumArray;
};

const makeId =  function (length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const makePdf = function(allSums, totalRowSpace, totalColumnSpace, constraint, id, fileName, numDigits, printAnswers){
    var sumCount = 0;
    var pdf = {content: [], styles :{
        rightAlign: {
          alignment: 'right'
        },
        centerAlign: {
          alignment: 'center'
        },
        blueColor: {
          color: '#0645AD'
        },
        headBackGround: {
          background: '#D3D3D3'
        }
      }};
    // Line 1
    pdf.content.push({
        columns: [
          {
            text: `Date : ${new Date().toISOString().split('T')[0]}`
          },
          {
            text: `Code : ${id}`,
            style: 'rightAlign'
          }
        ],
    });
    // Line 2
    pdf.content.push(`Concept : ${constraint.text}`);
    // Line 3
    pdf.content.push({
        text: `For AnswerSheet send ${id} to +916360668362 via whatsapp`,
        link: `https://wa.me/+916360668362?text=${id}`,
        style: 'blueColor'
    });
    // blank line
    pdf.content.push(' ');

    for(var rowCount = 0; rowCount < totalRowSpace * 2; rowCount++){
        if(rowCount % 2 === 0){
            // First Row
            var row = {
                table : {
                    body : [[],[],[]]
                }
            };
            for(var columnCount = 0; columnCount < totalColumnSpace * 2; columnCount++){
                if(columnCount % 2 === 0){
                    // push the header
                    row.table.body[0].push({text: `${sumCount + 1}`,  style: ['centerAlign'], fillColor: '#D3D3D3'});
                    // push the sum
                    var sumTable = {table : {
                        body: []
                    }, layout: 'noBorders'};
                    var sum = allSums[sumCount++];
                    var sign = ''; var num = 0;
                    for(var j =0; j < sum.length; j++){
                        if(j%2 !== 0){
                            sign = sum[j];
                        }
                        if(j%2 == 0){
                            num = sum [j];
                            //push the sign and number
                            var r = [];
                            r.push(sign);
                            var pos = numDigits - 1;
                            var zeroOver = false;
                            for(k = pos; k >= 0; k --){
                                var n = ~~(num/Math.pow(10,k))- ~~(num/Math.pow(10,k+1))*10;
                                if(! zeroOver && n == 0){
                                    r.push(' ');
                                }else{
                                    zeroOver = true;
                                    r.push(~~(num/Math.pow(10,k))- ~~(num/Math.pow(10,k+1))*10);
                                }
                            }
                            sumTable.table.body.push(r);
                        }
                    }
                    row.table.body[1].push(sumTable);
                    // push the result
                    if(printAnswers){
                        var num = sum[sum.length - 1];
                        var r = {table: {body : [[{text: '', "border": [
                            false,
                            false,
                            false,
                            false
                          ]}]], layout: 'noBorders'}};
                        var pos = numDigits - 1;
                        var zeroOver = false;
                        for(k = pos; k >= 0; k --){
                            var n = ~~(num/Math.pow(10,k))- ~~(num/Math.pow(10,k+1))*10;
                            if(! zeroOver && n == 0){
                                r.table.body[0].push({text: ' ', "border": [
                                    false,
                                    false,
                                    false,
                                    false
                                  ]});
                            }else{
                                zeroOver = true;
                                r.table.body[0].push({ text: ~~(num/Math.pow(10,k))- ~~(num/Math.pow(10,k+1))*10,
                                    "border": [
                                        false,
                                        false,
                                        false,
                                        false
                                      ]});
                            }
                        }
                        row.table.body[2].push(r);
                    }else{
                        row.table.body[2].push({text: ''});
                    }
                }else{
                    row.table.body[0].push({text: ' ', border: [false, false, false, false]})
                    row.table.body[1].push({text: ' ', border: [false, false, false, false]})
                    row.table.body[2].push({text: ' ', border: [false, false, false, false]})
                }
            }
            pdf.content.push(row);
        }else{
            pdf.content.push(' ');
        }
    }
    var fonts = {
        Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
    };
    var PdfPrinter = require('pdfmake/src/printer');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');
    var pdfDoc = printer.createPdfKitDocument(pdf);

    pdfDoc.pipe(fs.createWriteStream(`${fileName}`));
    pdfDoc.end();
};
const genPdf = function(numDigits, numLevels, id, constraint){
    const availableColumnSpace = 30;
    const availableRowSpace = 30;

    const totalColumnSpace = Math.floor(availableColumnSpace/(numDigits + 1.5));
    const totalRowSpace = Math.floor(availableRowSpace/(numLevels + 2));
    var allSums = [];
    var sumCount = totalColumnSpace * totalRowSpace; // TODO : Count should be derived based on numDigits and numLevels
    for(var i=0; i < sumCount; i++)
        allSums = allSums.concat([generateSum(numDigits, numLevels, constraint)]);

    makePdf(allSums, totalRowSpace, totalColumnSpace, constraint, id, `${constraint.file}${numDigits}.${numLevels}.pdf`, numDigits, false);
    makePdf(allSums, totalRowSpace, totalColumnSpace, constraint, id, `./Answers/${id}.answers.pdf`, numDigits, true);
}



// J1GettingStartedConstraints
// J1Introduce5Constraints
// J2SmallFriends
for(var d = 2; d<= 3; d++){
    for(l = 3; l <= 4; l++){
        var id = makeId(3);
        genPdf(d, l, id, J2SmallFriends);
        id = makeId(3);
        genPdf(d, l, id, J1GettingStartedConstraints);
        id = makeId(3);
        genPdf(d, l, id, J1Introduce5Constraints);
    }
}
