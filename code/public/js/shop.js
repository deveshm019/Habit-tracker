$(".group").click((event)=>{
    const group = event.target.href[event.target.href.length-1];
    switch (group) {
        case "1":
            $(".group a").attr("id","");
            $(".swords a").attr("id","currentNav");
            break;
            case "2":
                $(".group a").attr("id","");
            $(".shields a").attr("id","currentNav");
                break;
                case "3":
                    $(".group a").attr("id","");
                    $(".armours a").attr("id","currentNav");
            break;
            case "4":
                $(".group a").attr("id","");
                $(".helmets a").attr("id","currentNav");
            break;
        default:
            $(".group a").attr("id","");
            $(".coins a").attr("id","currentNav");
            break;
    }
});
$(".buy").click((event)=>{
    const price = event.target["id"];
    const coins = $("#coins").val() - price;
    if(coins<0){
        alert("Insufficient coins!");
    }
});
$(".buyCoins").click((event)=>{
    const price = event.target["id"];
    const gems = $("#gems").val() - price;
    if(gems<0){
        alert("Insufficient gems!");
    }
});
