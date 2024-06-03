$("#add").click(()=>{
  $(".taskText").attr("contentEditable","false");
  $(".taskText").css("backgroundColor","transparent")
  $(".newTask").removeClass("invisible");
  $(".newTask").addClass("visible");
  $(".newTask .taskText").css("backgroundColor","aliceblue");
  $(".newTask .taskText").attr("contentEditable","true");
})
$(".editButton").click((event) => {
    $(".taskText").attr("contentEditable","false");
    $(".taskText").css("backgroundColor","transparent");
    var task = "#task" + event.target["id"].slice(4);
    $(task).attr("contentEditable","true");
    $(task).css({"textDecoration":"none","backgroundColor":"aliceblue"});
    var checkbox = "#checkbox" + event.target["id"].slice(4);
    $(checkbox).removeAttr("checked","false");
});
$(".deleteButton").click((event) =>{
  var deleteTask = "#taskBox" + event.target["id"].slice(6);
  $(deleteTask).remove();
})
$("input").click((event)=>{
  var task = "#task" + event.target["id"].slice(8);
  if(event.target["checked"]){
  $(task).css("textDecoration","line-through");
    var league = $("#coinFormula").val();
  var coins = parseFloat($("#coins").val());
  var expWidth = parseFloat(($("#exp").attr("style")).slice(6,8));
  var chnageCoins = coins + league*5;
  var changeExpWidth = expWidth + Math.floor(5/league);
  $("#coins").val(chnageCoins);
  $("#exp").val(changeExpWidth);
  $("#exp").attr("style",`width:${changeExpWidth}%`);
  }
  else{
    $(task).css("textDecoration","none");

  var coinFormula = parseFloat($("#coinFormula").val());
  var expWidthFormula = parseFloat($("#expWidthFormula").val());
  var coins = parseFloat($("#coins").val());
  var expWidth = parseFloat(($("#exp").attr("style")).slice(6,8));
  var chnageCoins = coins - coinFormula;
  var changeExpWidth = expWidth - expWidthFormula;
  $("#coins").val(chnageCoins.toFixed(2));
  $("#exp").val(changeExpWidth.toFixed(2));
  $("#exp").attr("style",`width:${changeExpWidth}%`);
  }
})
$("#closeEdit").click(() => {
  $(".edit").removeClass("visible");
  $(".edit").addClass("invisible");
});
