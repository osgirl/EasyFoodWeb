
//var reg = /^a/i;
var htmlstr1 = "/partials/fdddfdf.html"
var htmlstr2 = "<a href='http://www.baidu.com/'>"
var reg1 = /<a.+?href=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
var reg = /^\/partials\/?([a-z.html]+)/gim;

var arr = [];
var tem = [];
tem=reg.exec(htmlstr1);
var tem1 =reg1.exec(htmlstr2);
console.log(tem)

console.log(tem1);

console.log(tem[1]);


console.log(/^\/partials+$1/i.test("/partials/fdddfdf").$1);