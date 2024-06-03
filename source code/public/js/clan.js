$("#joinClanButton").click(()=>{
    $(".joinClan").removeClass("invisible");
    $(".joinClan").addClass("visible");
})
$("#closeJoinClanPopup").click(()=>{
    $(".joinClan").removeClass("visible");
    $(".joinClan").addClass("invisible");
})
$("#createClanButton").click(()=>{
    $(".createClan").removeClass("invisible");
    $(".createClan").addClass("visible");
})
$("#closeCreateClanPopup").click(()=>{
    $(".createClan").removeClass("visible");
    $(".createClan").addClass("invisible");
})
$("#clanHomePage").click(()=>{

    $("#clanHomePage").addClass("active");
    $("#clanChat").removeClass("active");
    $("#recruitMembers").removeClass("active");

    $(".clanHomePage").removeClass("invisible");
    $(".clanHomePage").addClass("visible");
    $(".clanChat").removeClass("visible");
    $(".clanChat").addClass("invisible");
    $(".recruitMembers").removeClass("visible");
    $(".recruitMembers").addClass("invisible");
})
$("#clanChat").click(()=>{

    $("#clanHomePage").removeClass("active");
    $("#clanChat").addClass("active");
    $("#recruitMembers").removeClass("active");

    $(".clanHomePage").removeClass("visible");
    $(".clanHomePage").addClass("invisible");
    $(".clanChat").removeClass("invisible");
    $(".clanChat").addClass("visible");
    $(".recruitMembers").removeClass("visible");
    $(".recruitMembers").addClass("invisible");
})
$("#recruitMembers").click(()=>{

    $("#clanHomePage").removeClass("active");
    $("#clanChat").removeClass("active");
    $("#recruitMembers").addClass("active");

    $(".clanHomePage").removeClass("visible");
    $(".clanHomePage").addClass("invisible");
    $(".clanChat").removeClass("visible");
    $(".clanChat").addClass("invisible");
    $(".recruitMembers").removeClass("invisible");
    $(".recruitMembers").addClass("visible");
})
$("#globalPlayersPage").click(()=>{
    $("#globalPlayersPage").addClass("active");
    $("#existingPlayerPage").removeClass("active");

    $(".globalPlayers").removeClass("invisible");
    $(".globalPlayers").addClass("visible");
    $(".existingPlayer").removeClass("visible");
    $(".existingPlayer").addClass("invisible");
})
$("#existingPlayerPage").click(()=>{

    $("#globalPlayersPage").removeClass("active");
    $("#existingPlayerPage").addClass("active");

    $(".globalPlayers").removeClass("visible");
    $(".globalPlayers").addClass("invisible");
    $(".existingPlayer").removeClass("invisible");
    $(".existingPlayer").addClass("visible");
})
