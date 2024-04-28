$("#equipped").click(()=>{

    $("#equipped").addClass("active");
    $("#storage").removeClass("active");
    $("#quests").removeClass("active");

    $(".contentEquipped").removeClass("invisible");
    $(".contentEquipped").addClass("visible");
    $(".contentStorage").removeClass("visible");
    $(".contentStorage").addClass("invisible");
    $(".contentQuests").removeClass("visible");
    $(".contentQuests").addClass("invisible");
})
$(".changeTo").click(()=>{

    $("#equipped").removeClass("active");
    $("#storage").addClass("active");
    $("#quests").removeClass("active");

    $(".contentEquipped").removeClass("visible");
    $(".contentEquipped").addClass("invisible");
    $(".contentStorage").removeClass("invisible");
    $(".contentStorage").addClass("visible");
    $(".contentQuests").removeClass("visible");
    $(".contentQuests").addClass("invisible");
})
$("#storage").click(()=>{

    $("#equipped").removeClass("active");
    $("#storage").addClass("active");
    $("#quests").removeClass("active");

    $(".contentEquipped").removeClass("visible");
    $(".contentEquipped").addClass("invisible");
    $(".contentStorage").removeClass("invisible");
    $(".contentStorage").addClass("visible");
    $(".contentQuests").removeClass("visible");
    $(".contentQuests").addClass("invisible");
})
$("#quests").click(()=>{

    $("#equipped").removeClass("active");
    $("#storage").removeClass("active");
    $("#quests").addClass("active");

    $(".contentEquipped").removeClass("visible");
    $(".contentEquipped").addClass("invisible");
    $(".contentStorage").removeClass("visible");
    $(".contentStorage").addClass("invisible");
    $(".contentQuests").removeClass("invisible");
    $(".contentQuests").addClass("visible");
})